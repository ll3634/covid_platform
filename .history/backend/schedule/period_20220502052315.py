from models.venue import db, VenueInfo
from app 

def Job1():
    print('Job 1 executed') 
    
def Job2():
    print("------")
    user = db.session.query(VenueInfo).first()
    user.capacity += 1
    db.session.commit()
    print(user.capacity)