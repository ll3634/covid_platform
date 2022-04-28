import sys, os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app import app
from utils import crypt
from models.user import db, User, Role, user_role
from models.venue import Venue, Category, VenueInfo
from models.checkin import Checkin

from datetime import time


def add_user(phone, password, nickname, photo = 0):
    user = User(phone = phone, auth_key = crypt.pwd(password), nickname = nickname, photo = photo)
    db.session.add(user)
    db.session.commit()
    print('Add user succeed: ', user.id, user.phone, user.nickname)

    
def add_role():
    administrator = Role(name = 'Administrator')
    operator = Role(name = 'Operator')
    customer = Role(name = 'Customer')
    db.session.add_all((administrator, operator, customer))
    db.session.commit()
    print('Add role succeed: ', administrator.id, operator.id, customer.id)
    

def add_user_role(user_id, role_name):
    user = User.query.get(user_id)
    role = Role.query.filter_by(name = role_name).one()
    # print(user.id, role.name)
    user.roles.append(role)
    db.session.commit()
    print('Add user_role succeed: ', user.roles)
    
def add_venue(name, description, longitude, latitude):
    venue = Venue(name = name, description = description, longitude = longitude, latitude = latitude, image_num = 5)
    db.session.add(venue)
    db.session.commit()
    print('Add venue succeed: ', venue.id, venue.name, venue.longitude, venue.latitude)
    
def add_category():
    restaurant = Category(name = 'restaurant')
    bar = Category(name = 'bar')
    gym = Category(name = 'gym')
    hospital = Category(name = 'hospital')
    hotel = Category(name = 'hotel')
    grocery = Category(name = 'grocery')
    mall = Category(name = 'mall')
    park = Category(name = 'park')
    library = Category(name = 'library')
    school = Category(name = 'school')
    theatre = Category(name = 'theatre')
    museum = Category(name = 'museum')
    pharmacy = Category(name = 'pharmacy')
    bank = Category(name = 'bank')
    db.session.add_all((restaurant, bar, gym, hospital, hotel, grocery, mall, park, library, school, theatre, museum, pharmacy, bank))
    db.session.commit()
    print('Add category succeed: ', restaurant.id, bar.id, gym.id, hospital.id, hotel.id, grocery.id, mall.id, park.id, library.id, school.id, theatre.id, museum.id, pharmacy.id, bank.id)
 
    
def add_venue_category(venue_id, category_name):
    venue = Venue.query.get(venue_id)
    category = Category.query.filter_by(name = category_name).one()
    # print(user.id, role.name)
    venue.categories.append(category)
    db.session.commit()
    print('Add venue_category succeed: ', venue.categories)  
    
def add_venue_info(venue_id, capacity, start_hour, end_hour):
    venue_info = VenueInfo(venue_id, capacity, start_hour, end_hour)
    db.session.add(venue_info)
    db.session.commit()
    print('Add venue succeed: ', venue_info.id, venue_info.venue_id, venue_info.capacity, venue_info.start_hour, venue_info.end_hour)
    
def add_checkin(user_id, venue_id):
    # user = User.query.get(user_id)
    # venue = Venue.query.get(venue_id)
    checkin = Checkin(user_id = user_id, venue_id = venue_id, info = '')
    db.session.add(checkin)
    db.session.commit()
    print('Add checkin succeed: ', checkin.id, checkin.user_id, checkin.venue_id)


if __name__ == '__main__':
    app.app_context().push()
    add_user('18888888888', '123123', 'admin')
    add_user('18999994499', '123123', 'aaa')
    add_user('18999229999', '123123', 'bbb')
    add_user('18999911999', '123123', 'ccc')
    add_user('18999239999', '123123', 'eee')
    add_role()
    add_user_role(1, 'Administrator')
    add_user_role(2, 'Operator')
    add_user_role(2, 'Customer')
    
    add_venue('NYU Stern School of Business', 'The New York University Leonard N. Stern School of Business (commonly referred to as NYU Stern, The Stern School of Business, or simply Stern) is the business school of New York University, a private research university based in New York City. Founded in 1900, Stern is one of the oldest and most prestigious business schools in the world. It is located on Gould Plaza next to the Courant Institute of Mathematical Sciences and the economics department of the College of Arts and Sciences.', '-73.99098', '40.735981')
    add_venue('NYU School of Law', 'New York University School of Law (NYU Law) is the law school of New York University, a private research university in New York City. Established in 1835, it is the oldest law school in New York City and the oldest surviving law school in New York State. Located in Greenwich Village in Lower Manhattan, NYU Law offers J.D., LL.M., and J.S.D. degrees in law.', '-73.999499', '40.730537')
    add_venue('Washington Square Park', 'Washington Square Park is a 9.75-acre (39,500 m2) public park in the Greenwich Village neighborhood of Lower Manhattan, New York City. One of the best known of New York Citys public parks, it is an icon as well as a meeting place and center for cultural activity. It is operated by the New York City Department of Parks and Recreation (NYC Parks).', '-73.997332', '40.730823')
    add_venue('Parsons School of Design', 'Parsons School of Design, known colloquially as Parsons, is a private art and design college located in the Greenwich Village neighborhood of Lower Manhattan in New York City. It is one of the five colleges of The New School. Parsons is consistently ranked one of the best art and design schools in the United States, together with MIT and the Rhode Island School of Design (RISD).', '-73.9945938', '40.7353')
    add_venue('NYU Tandon School of Engineering', 'The New York University Tandon School of Engineering (commonly referred to as Tandon) is the engineering and applied sciences school of New York University. Tandon is the second oldest private engineering and technology school in the United States. The school dates back to 1854 when its predecessor institutions, the University of the City of New York School of Civil Engineering and Architecture and the Brooklyn Collegiate and Polytechnic Institute, were founded. The school was renamed in 2015 in honor of NYU Trustees Chandrika and Ranjan Tandon following their donation of $100 million to the school.', '-73.9865', '40.6944')
    add_category()
    add_venue_category(1, 'school')
    add_venue_category(1, 'library') 
    add_venue_category(2, 'school')
    add_venue_category(3, 'park')
    add_venue_category(4, 'school')
    add_venue_category(5, 'school')
    
    add_venue_info(1, 10, time(11, 2, 32), time(12, 2, 32))
    add_venue_info(2, 20, time(10, 2, 32), time(23, 25, 32))

    
    # test = VenueInfo.query.filter_by(venue_id = 1).all()
    # print(test[0].capacity)
    
    # add_checkin(1, 1)
    # add_checkin(1, 2)
    