from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import json

db = SQLAlchemy()

class FormSubmission(db.Model):
    __tablename__ = 'form_submissions'
    
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(255), nullable=False)
    gender = db.Column(db.String(10), nullable=False)
    email = db.Column(db.String(255), nullable=False)
    facebook_link = db.Column(db.String(500), nullable=True)
    phone_number = db.Column(db.String(20), nullable=False, unique=True)
    student_code = db.Column(db.String(50), nullable=False, unique=True)
    dob = db.Column(db.Date, nullable=False)
    university = db.Column(db.String(255), nullable=False)
    majors = db.Column(db.String(255), nullable=False)
    student_year = db.Column(db.String(10), nullable=False)
    applied_department = db.Column(db.String(255), nullable=False)
    answers = db.Column(db.JSON, nullable=False)
    
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def __repr__(self):
        return f'<FormSubmission {self.full_name} - {self.email}>'
    
    def to_dict(self):
        formatted_created_at = None
        if self.created_at:
            formatted_created_at = self.created_at.strftime('%H:%M:%S %d/%m/%Y')
        
        return {
            'id': self.id,
            'information': {
                'full_name': self.full_name,
                'gender': self.gender,
                'email': self.email,
                'facebook_link': self.facebook_link,
                'phone_number': self.phone_number,
                'student_code': self.student_code,
                'dob': self.dob.isoformat() if self.dob else None,
                'university': self.university,
                'majors': self.majors,
                'student_year': self.student_year,
                'applied_department': self.applied_department
            },
            'answers': self.answers,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'formatted_created_at': formatted_created_at,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
