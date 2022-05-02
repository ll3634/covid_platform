import sys, os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from flask_restful import Api, Resource
from flask import Blueprint, jsonify, request
from models.review import db, Review
from schemas.review import review_schema, reviews_schema


blue = Blueprint('review', __name__)
api = Api(blue)

class ReviewsResource(Resource):
    # @login_required
    def get(self):
        reviews = Review.query.all()
        results = reviews_schema.dump(reviews)
        return jsonify(results)


##'user_id', 'venue_id', 'review'
class ReviewResource(Resource):
    def get(self, id):
        review = Review.query.get(id)
        result = review_schema.jsonify(review)
        return result
    # def put(self, id):
    #     review = Review.query.get(id)
    #     user_id = request.json['name']
    #     description = request.json['description']  
    #     venue.name = name
    #     venue.description = description
    #     db.session.commit()
    #     result = venue_schema.jsonify(venue)
    #     return result
    def post(self):
        
        name = request.json['name']
        description = request.json['description']  
        latitude = request.json['latitude']
        longitude = request.json['longitude']
        image_num = request.json['image_num']
        
        capacity = request.json['capacity']
        start = request.json['start']
        end = request.json['end']
        
        venue = Venue(name, description, latitude, longitude, image_num)
        db.session.add(venue)
        db.session.commit()
        
        venueinfo = VenueInfo(venue.id, int(capacity), time(int(start), 0, 0), time(int(end), 0, 0))
        db.session.add(venueinfo)
        db.session.commit()
        
        # data = {
        #     'name': name,
        #     'description': description,
        # }
        # current_app.sio.emit('NewVenue', data=data)
        # current_app.sio.emit('NewVenue', data=data, room='1')
        
        return venue_schema.jsonify(venue)

api.add_resource(ReviewsResource, '/', methods = ['GET'])

@blue.route('/get', methods=['GET'])
def get_reviews():
    reviews = Review.query.all()
    results = reviews_schema.dump(reviews)
    return jsonify(results)

@blue.route('/get/<id>', methods=['GET'])
def get_reviews_venue(id):
    reviews = Review.query.filter_by(venue_id=id).all()
    results = reviews_schema.dump(reviews)
    return jsonify(results)