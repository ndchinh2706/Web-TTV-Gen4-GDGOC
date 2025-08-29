import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'postgresql://username:password@localhost:5432/gdgoc_gen4_db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    GOOGLE_CREDENTIALS_FILE = os.environ.get('GOOGLE_CREDENTIALS_FILE', 'credentials.json')
    GOOGLE_SPREADSHEET_ID = os.environ.get('GOOGLE_SPREADSHEET_ID')
    GOOGLE_WORKSHEET_NAME = os.environ.get('GOOGLE_WORKSHEET_NAME', 'RAW_ANSWERS')
