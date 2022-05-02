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

    def post(self):
        user_id = 1
        venue_id = request.json['venue_id']
        review = request.json['review']
        
        review = Review(user_id, int(venue_id), review)
        db.session.add(review)
        db.session.commit()
        
        return review_schema.jsonify(review)

api.add_resource(ReviewsResource, '/', methods = ['GET'])
api.add_resource(ReviewResource, '/review', methods = ['GET', 'POST'])


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