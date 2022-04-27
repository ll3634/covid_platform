# import datetime
# from models import db


# class Notification(db.Model):
#     id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    
#     from_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
#     to_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    
    
    
#     created_at = db.Column(db.DateTime, nullable=False, default=datetime.datetime.utcnow)
       
#     # def __init__(self, name, description, latitude, longitude, image_num):
#     #     self.name = name
#     #     self.description = description
#     #     self.latitude = latitude
#     #     self.longitude = longitude
#     #     self.image_num = image_num
        
        
