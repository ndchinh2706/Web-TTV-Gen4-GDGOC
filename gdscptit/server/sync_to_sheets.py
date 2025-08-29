#!/usr/bin/env python3

from app import create_app
from models import db, FormSubmission
from google_sheets_service import sheets_service
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def sync_all_submissions():
    app = create_app()
    
    with app.app_context():
        try:
            if not sheets_service.is_connected():
                logger.error("Google Sheets service not connected. Check your credentials and configuration.")
                return False
            submissions = FormSubmission.query.order_by(FormSubmission.id).all()         
            if not submissions:
                return True
            existing_ids = get_existing_sheet_ids()
            synced_count = 0
            failed_count = 0
            for submission in submissions:
                if submission.id in existing_ids:
                    logger.debug(f"Submission {submission.id} already exists")
                    continue
                sheets_data = {
                    'id': submission.id,
                    'information': {
                        'full_name': submission.full_name,
                        'gender': submission.gender,
                        'email': submission.email,
                        'dob': submission.dob.isoformat() if submission.dob else '',
                        'university': submission.university,
                        'majors': submission.majors,
                        'student_year': submission.student_year,
                        'applied_department': submission.applied_department
                    },
                    'answers': submission.answers
                }
                try:
                    success = sheets_service.append_submission(sheets_data)
                    if success:
                        synced_count += 1
                        logger.info(f"Synced submission {submission.id} ({submission.full_name})")
                    else:
                        failed_count += 1
                        logger.error(f"Failed to sync submission {submission.id}")
                except Exception as e:
                    failed_count += 1
                    logger.error(f"Error syncing submission {submission.id}: {str(e)}")
            
            logger.info(f"Sync completed: {synced_count} synced, {failed_count} failed")
            return failed_count == 0
            
        except Exception as e:
            logger.error(f"Sync process failed: {str(e)}")
            return False

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

if __name__ == '__main__':
    import sys
    success = sync_all_submissions()
    sys.exit(0 if success else 1)
