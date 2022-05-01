from flask import request, g
from flask_restful import abort
from cache import cache
from models.user import User

def check_user():
  auth = request.headers.get('Authorization')
  if not auth:
    abort(401, msg = 'Please Login')
  user_id = cache.get(auth)
  if not user_id:
    abort(401, msg = 'Invalid Token')
  user = User.query.filter(User.id == user_id).first()
  if not user:
    abort(401, msg = 'Non-existent User')
    
  g.user = user
  

def login_required(func):
  def wrapper(*args, **kwargs):
    check_user()
    return func(*args, **kwargs)
  return wrapper