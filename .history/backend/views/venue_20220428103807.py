from flask import Blueprint, request, jsonify, current_app
from flask_restful import Api, Resource
from models.venue import db, Venue, Category, VenueInfo
from schemas.venue import venue_schema, venues_schema

from datetime import time

blue = Blueprint('venue', __name__)
api = Api(blue)


class VenuesResource(Resource):
    def get(self):
        venues = Venue.query.all()
        results = venues_schema.dump(venues)
        return jsonify(results)
    
    def post(self):
        name = request.json['name']
        description = request.json['description']  
        latitude = request.json['latitude']
        longitude = request.json['longitude']
        image_num = request.json['image_num']
        
        capacity = request.json['capacity']
        start = request.json['start']
        end = request.json['end']
        print(capacity)
        print(time(start, 0, 0))
        print(time(end, 0, 0))
        
        venue = Venue(name, description, latitude, longitude, image_num)
        db.session.add(venue)
        db.session.commit()
        
        venueinfo = VenueInfo(venue.id, capacity, time(start, 0, 0), time(end, 0, 0))
        db.session.add(venueinfo)
        db.session.commit()
        
        # data = {
        #     'name': name,
        #     'description': description,
        # }
        # current_app.sio.emit('NewVenue', data=data)
        # current_app.sio.emit('NewVenue', data=data, room='1')
        
        return venue_schema.jsonify(venue)


class VenueResource(Resource):
    def get(self, id):
        venue = Venue.query.get(id)
        result = venue_schema.jsonify(venue)
        return result
    
    def put(self, id):
        venue = Venue.query.get(id)
        name = request.json['name']
        description = request.json['description']  
        venue.name = name
        venue.description = description
        db.session.commit()
        result = venue_schema.jsonify(venue)
        return result
    
    def delete(self, id):
        venue = Venue.query.get(id)
        print(venue)
        db.session.delete(venue)
        db.session.commit()
        result = venue_schema.jsonify(venue)
        return result        


api.add_resource(VenuesResource, '/', methods = ['GET', 'POST'])
api.add_resource(VenueResource, '/<id>', methods = ['GET', 'PUT', 'DELETE'])


# @blue.route('/add', methods=['POST'])
# def add_venue():
#     name = request.json['name']
#     description = request.json['description']  
#     latitude = request.json['latitude']
#     longitude = request.json['longitude']
#     image_num = request.json['image_num']
#     venue = Venue(name, description, latitude, longitude, image_num)
#     db.session.add(venue)
#     db.session.commit() 
#     return venue_schema.jsonify(venue)

# @blue.route('/get', methods=['GET'])
# def get_venues():
#     venues = Venue.query.all()
#     results = venues_schema.dump(venues)
#     return jsonify(results)

# @blue.route('/get/<id>', methods=['GET'])
# def get_venue(id):
#     venue = Venue.query.get(id)
#     result = venue_schema.jsonify(venue)
#     return result

# @blue.route('/update/<id>', methods=['PUT'])
# def update_venue(id):
#     venue = Venue.query.get(id)
#     name = request.json['name']
#     description = request.json['description']  
#     venue.name = name
#     venue.description = description
#     db.session.commit()
#     result = venue_schema.jsonify(venue)
#     return result

# @blue.route('/delete/<id>', methods=['DELETE'])
# def delete_venue(id):
#     venue = Venue.query.get(id)
#     db.session.delete(venue)
#     db.session.commit()
#     result = venue_schema.jsonify(venue)
#     return result

@blue.route('/get/last', methods=['GET'])
def get_venue_last():
    venue = Venue.query.get(id)
    result = venue_schema.jsonify(venue)
    return result

@blue.route('/upload/<id>', methods=['PUT'])
def upload_venue(id):
    venue = Venue.query.get(id)
    image_num = request.json['image_num']  
    venue.image_num = image_num
    db.session.commit()
    result = venue_schema.jsonify(venue)
    return result
