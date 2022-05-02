from models.venue import db, VenueInfo

def Job1():
    print('Job 1 executed') 
    
def Job2(capacity):
    print("------")
    user = db.session.query(VenueInfo).first()
    user.capacity += 1
    db.session.commit()
    print(user.capacity)