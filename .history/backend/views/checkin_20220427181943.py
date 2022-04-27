import sys, os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import uuid
import datetime as dt
from dataclasses import dataclass
from flask import Blueprint, jsonify, request, current_app
from flask_restful import Api, Resource
from cache.checkin import check_in, create_checkin
from broker.checkin import create_checkin_queue, create_dead_queue
from models.checkin import db, Checkin, CheckinInfo
from schemas.checkin import checkin_schema, checkins_schema, checkinInfos_schema, checkin_join_schema, checkin_num_schema


blue = Blueprint('checkin', __name__)
api = Api(blue)


class CheckinsResource(Resource):
    def get(self):
        venues = Checkin.query.all()
        results = checkins_schema.dump(venues)
        return jsonify(results)
    
    def post(self):
        venue_id = request.json['venue_id']
        temp = request.json['temp']
        test = request.json['test']  
        contact = request.json['contact']
        personnel = request.json['personnel']
        symptoms = request.json['symptoms']
        
        print(temp, test, contact, personnel, symptoms) 
        
        checkin = Checkin(1, venue_id, '')
        db.session.add(checkin)
        db.session.commit() 
                
        checkininfo = CheckinInfo(checkin.id, temp, test, contact, personnel, symptoms)
        db.session.add(checkininfo)
        db.session.commit() 
        
        data = {
            'name': name,
            'description': description,
        }
        current_app.sio.emit('NewCheckin', data=data)
        
        return checkin_schema.jsonify(checkin)
      

class CheckinResource(Resource):
    def get(self, id):        
        checkin = db.session.query(Checkin, CheckinInfo).filter(Checkin.id == CheckinInfo.checkin_id).filter(Checkin.venue_id == id).all()
        result = checkin_join_schema.jsonify(checkin)
        return result


api.add_resource(CheckinsResource, '/', methods = ['GET', 'POST'])
api.add_resource(CheckinResource, '/<id>', methods = ['GET', 'PUT'])


@blue.route('/num', methods = ['GET'])
def num():
  @dataclass
  class Num:
    venue_id: int
    check_num: int
    case_num: int
  
  res = []
  for i in range(1, 10):
    check_num = db.session.query(Checkin, CheckinInfo).filter(Checkin.id == CheckinInfo.checkin_id).filter(Checkin.venue_id == i).count()
    case_num = db.session.query(Checkin, CheckinInfo).filter(Checkin.id == CheckinInfo.checkin_id).filter(Checkin.venue_id == i).filter(CheckinInfo.test == '2').count()
    data = Num(i, check_num, case_num)
    res.append(data)
  
  result = checkin_num_schema.jsonify(res)
  return result

  
@blue.route('/check', methods=['GET', 'POST'])
def check():
  result = { 'status': 200, 'message': '' }
  user_id = request.args.get('user_id')
  venue_id = request.args.get('venue_id')
  checkin_id = uuid.uuid1()
  checkin_info = {
    "user_id": user_id,
    "venue_id": venue_id,
    "checkin_id": str(checkin_id)
  }
  flag = check_in(venue_id, 15)
  if flag:
    try:
      create_checkin(checkin_info)
      create_checkin_queue(checkin_info)
      create_dead_queue(checkin_info)
      result['checkin_info'] = checkin_info
      result['status'] = 200
      result['message'] = 'Check in success'
      print(result['message'])
      return jsonify(result)
    except Exception as e:
      result['status'] = 400
      result['message'] = 'Session time expired'
      print(result['message'])
      return jsonify(result)
  else:
    result['status'] = 201
    result['message'] = 'No available seats'
    print(result['message'])
    return jsonify(result) 