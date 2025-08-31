import os
import gspread
from google.oauth2.service_account import Credentials
import logging
from typing import Optional, List
import pytz
from datetime import datetime

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class GoogleSheetsService:
    def __init__(self):
        self.client = None
        self.spreadsheet = None
        self.worksheet = None
        self._initialize_client()
    
    def _get_gmt_plus_7_time(self, dt=None):
        """Convert datetime to GMT+7 timezone following timezonene.py pattern"""
        gmt_plus_7 = pytz.timezone('Asia/Bangkok')
        
        if dt is None:
            now_utc = datetime.now(pytz.utc)
            return now_utc.astimezone(gmt_plus_7)
        
        if isinstance(dt, str):
            dt = datetime.fromisoformat(dt.replace('Z', '+00:00'))
            if dt.tzinfo is None:
                dt = pytz.utc.localize(dt)
            return dt.astimezone(gmt_plus_7)
        else:
            if dt.tzinfo is None:
                return gmt_plus_7.localize(dt)
            else:
                return dt.astimezone(gmt_plus_7)
    
    def _initialize_client(self):
        try:
            scope = [
                'https://www.googleapis.com/auth/spreadsheets',
                'https://www.googleapis.com/auth/drive'
            ]
            
            creds_file = os.environ.get('GOOGLE_CREDENTIALS_FILE', 'credentials.json')
            
            if not os.path.exists(creds_file):
                logger.error(f"Google credentials file not found: {creds_file}")
                return
            
            credentials = Credentials.from_service_account_file(creds_file, scopes=scope)
            
            self.client = gspread.authorize(credentials)
            
            spreadsheet_id = os.environ.get('GOOGLE_SPREADSHEET_ID')
            if not spreadsheet_id:
                logger.error("GOOGLE_SPREADSHEET_ID environment variable not set")
                return
                
            self.spreadsheet = self.client.open_by_key(spreadsheet_id)
            
            worksheet_name = os.environ.get('GOOGLE_WORKSHEET_NAME', 'RAW_ANSWERS')
            try:
                self.worksheet = self.spreadsheet.worksheet(worksheet_name)
            except gspread.WorksheetNotFound:
                logger.error(f"Worksheet '{worksheet_name}' not found")
                return
                
            logger.info("Google Sheets client initialized successfully")
            
        except Exception as e:
            logger.error(f"Failed to initialize Google Sheets client: {str(e)}")
            self.client = None
    
    def is_connected(self) -> bool:
        return self.client is not None and self.worksheet is not None
    
    def append_submission(self, submission_data: dict) -> bool:
       
        if not self.is_connected():
            logger.error("Google Sheets client not connected")
            return False
        try:
            info = submission_data.get('information', {})
            answers = submission_data.get('answers', [])
            created_at = submission_data.get('created_at')
            
            formatted_timestamp = ''
            if created_at:
                dt_gmt7 = self._get_gmt_plus_7_time(created_at)
                formatted_timestamp = dt_gmt7.strftime('%d/%m/%Y %H:%M:%S')
            
            padded_answers = answers + [''] * (11 - len(answers))
            padded_answers = padded_answers[:11]
            
            row_data = [
                submission_data.get('id', ''),
                info.get('full_name', ''),
                info.get('email', ''),
                info.get('facebook_link', ''),
                info.get('phone_number', ''),
                info.get('student_code', ''),
                info.get('university', ''),
                info.get('student_year', ''),
                info.get('gender', ''),
                info.get('dob', ''),
                info.get('majors', ''),
                info.get('applied_department', ''),
                *padded_answers,
                formatted_timestamp
            ]
            
            self.worksheet.append_row(row_data)
            
            logger.info(f"Successfully appended submission ID {submission_data.get('id')}")
            return True
            
        except Exception as e:
            logger.error(f"Failed to append submission: {str(e)}")
            return False
    
    def get_next_row_number(self) -> int:
        try:
            if not self.is_connected():
                return 1
            
            all_values = self.worksheet.get_all_values()
            return len(all_values) + 1
            
        except Exception as e:
            logger.error(f"Failed to get next row number: {str(e)}")
            return 1
    
    def test_connection(self) -> dict:
        if not self.is_connected():
            return {
                'success': False,
                'message': 'Not connected to Google Sheets'
            }
        
        try:
            headers = self.worksheet.row_values(1)
            return {
                'success': True,
                'message': 'Connected successfully',
                'headers': headers,
                'next_row': self.get_next_row_number()
            }
        except Exception as e:
            return {
                'success': False,
                'message': f'Connection test failed: {str(e)}'
            }
sheets_service = GoogleSheetsService()
