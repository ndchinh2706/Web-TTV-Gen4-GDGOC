#!/usr/bin/env python3

from app import create_app
from models import db

def init_database():
    app = create_app()
    
    with app.app_context():
        #db.drop_all()
    
        db.create_all()

if __name__ == '__main__':
    init_database()
