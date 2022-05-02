from models.venue import db, VenueInfo
from app import app

def Job1():
    with app.app_context():
        print('Job 1 executed') 
    
def Job2():
    with app.app_context():

        print("------")
        user = db.session.query(VenueInfo).first()
    user.capacity += 1
    db.session.commit()
    print(user.capacity)