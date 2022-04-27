import datetime
from models import db


class Checkin(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    # user = db.relationship('User', backref=db.backref('users', lazy=True))
    
    venue_id = db.Column(db.Integer, db.ForeignKey('venue.id'), nullable=False)
    # venue = db.relationship('Venue', backref=db.backref('venues', lazy=True))
    
    info = db.Column(db.Text())
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.datetime.utcnow)
       
    def __init__(self, user_id, venue_id, info):
        self.user_id = user_id
        self.venue_id = venue_id
        self.info = info
        

class CheckinInfo(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    
    checkin_id = db.Column(db.Integer, db.ForeignKey('checkin.id'), nullable=False)
    # checkin = db.relationship('Checkin', backref=db.backref('checkins', lazy=True))
    
    temperature = db.Column(db.String(20))
    test = db.Column(db.String(20))
    contact = db.Column(db.String(20))
    personnel = db.Column(db.String(20))
    symptoms = db.Column(db.String(20))
    
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.datetime.utcnow)

    def __init__(self, checkin_id, temperature, test, contact, personnel, symptoms):
        self.checkin_id = checkin_id
        self.temperature = temperature
        self.test = test
        self.contact = contact
        self.personnel = personnel
        self.symptoms = symptoms