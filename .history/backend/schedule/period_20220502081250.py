from models.venue import db, VenueInfo

def Job1():
    print('Job 1 executed') 
    
def Job2(venue_id, capacity):
    print("------")
    user = db.session.query(VenueInfo).filter_by(
    user.capacity += capacity
    db.session.commit()
    print(user.capacity)