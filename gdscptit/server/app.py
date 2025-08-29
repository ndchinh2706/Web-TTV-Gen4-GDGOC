from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
from config import Config
from models import db, FormSubmission
from google_sheets_service import sheets_service
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    db.init_app(app)
    CORS(app)
    
    with app.app_context():
        db.create_all()
    
        
    @app.route('/submit-form', methods=['POST'])
    def submit_form():
        try:
            data = request.get_json()
            
            if not data:
                return jsonify({'error': 'No JSON data provided'}), 400
            
            if 'information' not in data or 'answers' not in data:
                return jsonify({'error': 'Missing required fields: information and answers'}), 400
            
            info = data['information']
            answers = data['answers']
            
            required_info_fields = ['full_name', 'gender', 'email', 'phone_number', 'student_code', 'dob', 'university', 'majors', 'student_year', 'applied_department']
            for field in required_info_fields:
                if field not in info:
                    return jsonify({'error': f'Missing required information field: {field}'}), 400
            
            try:
                dob = datetime.strptime(info['dob'], '%Y-%m-%d').date()
            except ValueError:
                return jsonify({'error': 'Use YYYY-MM-DD format.'}), 400
            
            existing_phone = FormSubmission.query.filter_by(phone_number=info['phone_number']).first()
            if existing_phone:
                logger.warning(f"Duplicate phone number attempted: {info['phone_number']} (existing ID: {existing_phone.id})")
                return jsonify({
                    'error': 'A submission with this phone number already exists',
                    'existing_submission_id': existing_phone.id
                }), 409
            
            existing_student_code = FormSubmission.query.filter_by(student_code=info['student_code']).first()
            if existing_student_code:
                logger.warning(f"Duplicate student code attempted: {info['student_code']} (existing ID: {existing_student_code.id})")
                return jsonify({
                    'error': 'A submission with this student code already exists',
                    'existing_submission_id': existing_student_code.id
                }), 409
            
            submission = FormSubmission(
                full_name=info['full_name'],
                gender=info['gender'],
                email=info['email'],
                facebook_link=info.get('facebook_link'),
                phone_number=info['phone_number'],
                student_code=info['student_code'],
                dob=dob,
                university=info['university'],
                majors=info['majors'],
                student_year=info['student_year'],
                applied_department=info['applied_department'],
                answers=answers
            )
            
            db.session.add(submission)
            db.session.commit()
            
            sheets_data = {
                'id': submission.id,
                'information': {
                    'full_name': info['full_name'],
                    'gender': info['gender'],
                    'email': info['email'],
                    'facebook_link': info.get('facebook_link', ''),
                    'phone_number': info['phone_number'],
                    'student_code': info['student_code'], 
                    'dob': info['dob'],
                    'university': info['university'],
                    'majors': info['majors'],
                    'student_year': info['student_year'],
                    'applied_department': info['applied_department']
                },
                'answers': answers,
                'created_at': submission.created_at
            }
            
            sheets_success = False
            try:
                sheets_success = sheets_service.append_submission(sheets_data)
                if sheets_success:
                    logger.info(f"Successfully synced submission {submission.id} to Google Sheets")
                else:
                    logger.warning(f"Failed to sync submission {submission.id} to Google Sheets")
            except Exception as e:
                logger.error(f"Error syncing to Google Sheets: {str(e)}")
            
            response_data = {
                'message': 'Form submitted successfully',
                'submission_id': submission.id,
            }
            
            return jsonify(response_data), 201
            
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': f'Internal server error: {str(e)}'}), 500
    
    @app.route('/sync-all', methods=['GET'])
    def sync_all_submissions():
        try:
            if not sheets_service.is_connected():
                return jsonify({
                    'error': 'Google Sheets service not connected. Check your credentials and configuration.',
                    'success': False
                }), 503
            
            submissions = FormSubmission.query.order_by(FormSubmission.id).all()
            
            if not submissions:
                return jsonify({
                    'message': 'No submissions found in database',
                    'success': True,
                    'total_submissions': 0,
                    'synced': 0,
                    'failed': 0,
                    'skipped': 0,
                    'results': []
                }), 200
            
            existing_ids = get_existing_sheet_ids()
            
            results = []
            synced_count = 0
            failed_count = 0
            skipped_count = 0
            
            for submission in submissions:
                result_entry = {
                    'id': submission.id,
                    'full_name': submission.full_name,
                    'email': submission.email,
                    'phone_number': submission.phone_number,
                    'student_code': submission.student_code,
                    'created_at': submission.created_at.isoformat() if submission.created_at else None
                }
                
                if submission.id in existing_ids:
                    result_entry['status'] = 'skipped'
                    result_entry['message'] = 'Already exists in Google Sheets'
                    results.append(result_entry)
                    skipped_count += 1
                    logger.debug(f"Submission {submission.id} already exists in Google Sheets, skipping")
                    continue
                
                sheets_data = {
                    'id': submission.id,
                    'information': {
                        'full_name': submission.full_name,
                        'gender': submission.gender,
                        'email': submission.email,
                        'facebook_link': submission.facebook_link or '',
                        'phone_number': submission.phone_number,
                        'student_code': submission.student_code,
                        'dob': submission.dob.isoformat() if submission.dob else '',
                        'university': submission.university,
                        'majors': submission.majors,
                        'student_year': submission.student_year,
                        'applied_department': submission.applied_department
                    },
                    'answers': submission.answers,
                    'created_at': submission.created_at
                }
                
                try:
                    success = sheets_service.append_submission(sheets_data)
                    if success:
                        result_entry['status'] = 'success'
                        result_entry['message'] = 'Successfully synced to Google Sheets'
                        synced_count += 1
                        logger.info(f"Synced submission {submission.id} ({submission.full_name})")
                    else:
                        result_entry['status'] = 'failed'
                        result_entry['message'] = 'Failed to sync to Google Sheets (unknown error)'
                        failed_count += 1
                        logger.error(f"Failed to sync submission {submission.id}")
                except Exception as e:
                    result_entry['status'] = 'failed'
                    result_entry['message'] = f'Error: {str(e)}'
                    failed_count += 1
                    logger.error(f"Error syncing submission {submission.id}: {str(e)}")
                
                results.append(result_entry)
            
            summary = {
                'message': f'Sync completed: {synced_count} synced, {failed_count} failed, {skipped_count} skipped',
                'success': failed_count == 0,
                'total_submissions': len(submissions),
                'synced': synced_count,
                'failed': failed_count,
                'skipped': skipped_count,
                'existing_in_sheets': len(existing_ids),
                'results': results
            }
            
            logger.info(f"Sync completed: {synced_count} synced, {failed_count} failed, {skipped_count} skipped")
            
            return jsonify(summary), 200
            
        except Exception as e:
            logger.error(f"Sync process failed: {str(e)}")
            return jsonify({
                'error': f'Sync process failed: {str(e)}',
                'success': False
            }), 500
    
    def get_existing_sheet_ids():
        try:
            if not sheets_service.is_connected():
                return set()
            
            all_values = sheets_service.worksheet.get_all_values()
            
            if len(all_values) <= 1:
                return set()
            
            existing_ids = set()
            for row in all_values[1:]:
                if row and row[0]:
                    try:
                        existing_ids.add(int(row[0]))
                    except ValueError:
                        continue
            
            return existing_ids
            
        except Exception as e:
            logger.error(f"Error getting existing sheet IDs: {str(e)}")
            return set()

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, host='0.0.0.0', port=5000)
