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
    
    OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY')
    OPENAI_BASE_URL = os.environ.get('OPENAI_BASE_URL', 'https://api.openai.com/v1')
    OPENAI_MODEL = os.environ.get('OPENAI_MODEL', 'gpt-3.5-turbo')
    
    KNOWLEDGE_BASE_PATH = os.environ.get('KNOWLEDGE_BASE_PATH', 'text/knowledge_base.txt')
    EMBEDDING_MODEL = os.environ.get('EMBEDDING_MODEL', 'sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2')
    MAX_CHUNKS_FOR_CONTEXT = int(os.environ.get('MAX_CHUNKS_FOR_CONTEXT', '3'))
    SIMILARITY_THRESHOLD = float(os.environ.get('SIMILARITY_THRESHOLD', '0.3'))
    
    SYNC_API_KEY = os.environ.get('SYNC_API_KEY', 'default_sync_key')