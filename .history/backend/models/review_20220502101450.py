import datetime
from models import db

class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    
    user_id = db.Column(db.Integer, primary_key=True)
    
    venue_id = db.Column(db.Integer, db.ForeignKey('venue.id'), nullable=False)
    venue = db.relationship('Venue', backref=db.backref('reviews', lazy=True))
    
    review = db.Column(db.Text())
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.datetime.utcnow)
       
    def __init__(self, user_id, venue_id, review):
        self.user_id = user_id
        self.venue_id = venue_id
        self.review = review