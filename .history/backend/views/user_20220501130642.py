import sys, os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from utils.crypt import pwd
from utils import sms
# from cache.user import save_token, clear_token, get_user_id_by_token
from cache import cache

import uuid
import random
from flask import Blueprint, make_response, request, jsonify, session
from flask_restful import Api, Resource, reqparse, inputs

from models.user import db, User
from schemas.user import user_schema, users_schema


blue = Blueprint('user', __name__)
api = Api(blue)

sms_parser = reqparse.RequestParser()
sms_parser.add_argument('phone', type=inputs.regex(r'^\d{10}$'), required=True, help='phone number is required', location=['json', 'form', 'args']) 

class SendMessageApi(Resource):
    def post(self):
        args = sms_parser.parse_args()
        phone = args.get('phone')
        # phone = request.json['phone']
        
        ret, code = sms.send_sms(phone)
        # ret = 1
        # code = '1234'
        print(phone, code)
        if ret == 1: 
            cache.set(phone, code, timeout=3000)
            return make_response(jsonify({'code': code}), 200)
        else:
            return make_response(jsonify({'code': code}), 400)


lr_parser = sms_parser.copy()
lr_parser.add_argument('code', type=inputs.regex(r'^\d{4}$'), required=True, help='code is required', location=['json', 'form', 'args'])

class LoginRegisterApi(Resource):
    def post(self):
        args = lr_parser.parse_args()
        phone = args.get('phone')
        code = args.get('code')
        # phone = request.json['phone']
        # code = request.json['code']
        cache_code = cache.get(phone)
        print('code', code)
        print('cache_code', cache_code)
        if cache_code and cache_code == code:
            user = User.query.filter(User.phone == phone).first()
            if not user:
                user = User(phone)
                db.session.add(user)
                db.session.commit()
            token = str(uuid.uuid4()).replace('-', '') + str(random.randint(100, 999))
            print(token)
            cache.set(token, user.id, timeout=3000)
            return make_response(jsonify({'token': token}), 200)
        else:
            return make_response(jsonify({'message': 'code is wrong'}), 400)

        
# class ForgetPasswordApi(Resource):
#     def get(self):
#         alpha = 'QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890'
#         code = ''
#         for _ in range(4):
#             rand = random.choice(alpha)
#             code += rand
#         session['code'] = code
        
#         return make_response(jsonify({'code': code}), 200)


reset_parser = sms_parser.copy()
# reset_parser.add_argument('image', type=inputs.regex(r'^[a-zA-Z0-9]{4}$'), required=True, help='correct code is required', location=['json', 'form', 'args'])    

class ResetPasswordApi(Resource):
    def get(self):
        args = reset_parser.parse_args()
        phone = args.get('phone')
        # image = args.get('image')
        # phone = request.json['phone']
        # image = request.json['image']
        # code = session.get('code')
        # print(image, code)
        # if code and image.lower() == code.lower():
            
        user = User.query.filter(User.phone == phone).first()
        if user:
            ret, sms_code = sms.send_sms(phone)
            if ret == 1: 
                cache.set(phone, sms_code, timeout=3000)
                return make_response(jsonify({'code': sms_code}), 200)
            else:
                return make_response(jsonify({'code': sms_code}), 400)
        else:
            return make_response(jsonify({'message': 'user not found'}), 400)
        
        # else:
        #     return make_response(jsonify({'message': 'code is wrong or time out'}), 400)
        
        
update_parser = lr_parser.copy()
update_parser.add_argument('password', type=inputs.regex(r'^[a-zA-Z0-9]{6,20}$'), required=True, help='correct password is required', location=['json', 'form', 'args'])
update_parser.add_argument('confirm', type=inputs.regex(r'^[a-zA-Z0-9]{6,20}$'), required=True, help='correct password is required', location=['json', 'form', 'args']) 
password_login_parser = sms_parser.copy()
password_login_parser.add_argument('password', type=str, required=True, help='password is required', location=['json', 'form', 'args'])

 
# login and update password
class UserApi(Resource):
    def post(self):
        args = password_login_parser.parse_args()
        phone = args.get('phone')
        password = args.get('password')
        # phone = request.json['phone']
        # password = request.json['password']        
        user = User.query.filter(User.phone == phone).first()
        if user:
            if user.auth_key == password:
                token = str(uuid.uuid4()).replace('-', '') + str(random.randint(100, 999))
                print(token)
                cache.set(token, user.id, timeout=3000)
                return make_response(jsonify({'token': token}), 200)
            else:
                return make_response(jsonify({'message': 'password is wrong'}), 400)
        else:
            return make_response(jsonify({'message': 'user not found'}), 400)
        
    def put(self):
        args = update_parser.parse_args()
        code = args.get('code')
        phone = args.get('phone')
        password = args.get('password')
        confirm = args.get('confirm')
        # code = request.json['code']
        # phone = request.json['phone']
        # password = request.json['password']
        # confirm = request.json['confirm']
        cache_code = cache.get(phone)
        if cache_code and cache_code == code:
            if password == confirm:
                user = User.query.filter(User.phone == phone).first()
                if user:
                    user.auth_key = password
                    db.session.commit()
                    return make_response(jsonify({'message': 'success'}), 200)
                else:
                    return make_response(jsonify({'message': 'user not found'}), 400)
            else:
                return make_response(jsonify({'message': 'password is not same'}), 400)
        else:
            return make_response(jsonify({'message': 'code is wrong or time out'}), 400)
 
 
api.add_resource(SendMessageApi, '/sms', methods = ['GET', 'POST'])
api.add_resource(LoginRegisterApi, '/codelogin', methods = ['GET', 'POST'])
api.add_resource(ForgetPasswordApi, '/forgetpassword', methods = ['GET'])
api.add_resource(ResetPasswordApi, '/resetpassword', methods = ['GET'])
api.add_resource(UserApi, '/user', methods = ['POST', 'PUT'])

# @blue.route('/login', methods=['POST'])
# def login():
#     phone = request.json['phone']
#     password = pwd(request.json['password'])
#     login_user = User.query.filter_by(phone=phone, password=password).one()
#     if login_user:
#         # save token
#         token = uuid.uuid4().hex
#         save_token(token, login_user.id)
#         # return
#         return make_response(jsonify({'token': token}), 200)
#     else:
#         # return
#         return make_response(jsonify({'message': 'phone or password is wrong'}), 400)
   
   
# @blue.route('/logout', methods=['POST'])
# def logout():
#     token = request.cookies.get('token')
#     # delete token
#     clear_token(token)
#     # delete cookie
#     # return
#     return make_response(jsonify({'message': 'logout succeed'}), 200)


# @blue.route('/modify_password', methods=['POST'])
# def modify():
#     token = request.cookies.get('token')
#     user_id = get_user_id_by_token(token)
#     user = User.query.get(int(user_id))
#     user.password = pwd(request.json['password'])
    
    
# @blue.route('/register', methods=['POST'])
# def register():
#     pass