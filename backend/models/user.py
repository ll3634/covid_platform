import datetime
from sqlalchemy import Column, Integer, String, Enum, DateTime, ForeignKey
from models import db


user_role = db.Table('user_role', 
                    Column('user_id', Integer, ForeignKey('user.id', name = 'user_id_fk')), 
                    Column('role_id', Integer, ForeignKey('role.id', name = 'role_id_fk')))


class BaseModel(db.Model):
    __abstract__ = True
    id = Column(Integer, primary_key = True, autoincrement = True)
    name = Column(String(20), unique = True, nullable = False)
        

class Role(BaseModel):
    __tablename__ = 'role'
    
    
class Authority(BaseModel):
    __tablename__ = 'authority'
    

class User(db.Model):
    id = db.Column(db.Integer, primary_key = True, autoincrement = True)
    phone = db.Column(db.String(20), unique = True, nullable = False)
    auth_key = db.Column(db.String(128), nullable = False)
    nickname = db.Column(db.String(20))
    photo = db.Column(db.String(128))
    roles = db.relationship('Role', secondary = user_role, backref = db.backref('users', lazy = 'dynamic'))
    
    def __init__(self, phone, auth_key = '111111', nickname = 'user', photo = 'default.png'):
        self.phone = phone
        self.auth_key = auth_key
        self.nickname = nickname
        self.photo = photo
        

class UserLocation(db.Model):
    id = db.Column(db.Integer, primary_key = True, autoincrement = True)
    
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable = False)
    latitude = db.Column(db.Numeric)
    longitude = db.Column(db.Numeric)
    
    def __init__(self, user_id, latitude = 0, longitude = 0):
        self.user_id = user_id
        self.latitude = latitude
        self.longitude = longitude