from redis import Redis

class Dev():
    # SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:123123@localhost/map'
    SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:123123123@map.c4utwtkf1zzt.us-east-2.rds.amazonaws.com:5432/map'
    # SQLALCHEMY_TRACK_MODIFICATIONS = True
    # SQLALCHEMY_COMMIT_ON_TEARDOWN = True
    # SQLALCHEMY_ECHO = True
    
    SESSION_TYPE = 'redis'
    SESSION_REDIS = Redis(host='127.0.0.1', db=8)