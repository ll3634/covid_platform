import datetime
from models import db


venue_category = db.Table('venue_category',
                    db.Column('venue_id', db.Integer, db.ForeignKey('venue.id', name = 'venue_id_fk')), 
                    db.Column('category_id', db.Integer, db.ForeignKey('category.id', name = 'category_id_fk')))


class Venue(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text())
    categories = db.relationship('Category', secondary=venue_category, backref=db.backref('venues', lazy='dynamic'))
    latitude = db.Column(db.Numeric)
    longitude = db.Column(db.Numeric)
    image_num = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.datetime.utcnow)
    
    # def __repr__(self):
    #     return f"Venue: {self.name}"
       
    def __init__(self, name, description, latitude, longitude, image_num):
        self.name = name
        self.description = description
        self.latitude = latitude
        self.longitude = longitude
        self.image_num = image_num
        
        
class VenueInfo(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    
    venue_id = db.Column(db.Integer, db.ForeignKey('venue.id'), nullable=False)
    venue = db.relationship('Venue', backref=db.backref('venues', lazy='dynamic'))
    
    capacity = db.Column(db.Integer)
    start_hour = db.Column(db.Time)
    end_hour = db.Column(db.Time)
    
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.datetime.utcnow)
    
    def __init__(self, venue_id, capacity, start_hour, end_hour):
        self.venue_id = venue_id
        self.capacity = capacity
        self.start_hour = start_hour
        self.end_hour = end_hour
  
        
class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(100), nullable=False)
    
    def __init__(self, name):
        self.name = name
        