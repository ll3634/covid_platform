from redis import Redis

class Dev():
    # SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:123123@localhost/map'
    SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:123123123@map.c4utwtkf1zzt.us-east-2.rds.amazonaws.com:5432/map'
    # SQLALCHEMY_TRACK_MODIFICATIONS = True
    # SQLALCHEMY_COMMIT_ON_TEARDOWN = True
    # SQLALCHEMY_ECHO = True
    
    SESSION_TYPE = 'redis'
    SESSION_REDIS = Redis(host='localhost', db=8)
    
    SCHEDULER_API_ENABLED = True
    
    CELERY_BROKER_URL = 'amqps://map:guestguestguest@b-c44d7833-49b8-47ca-b252-31cb81a35d9f.mq.us-east-2.amazonaws.com:5671'
    # CELERY_BROKER_URL = 'amqp://guest:guest@localhost:5672'
    # CELERY_BACKEND = 'redis://clustercfg.map-redis.l9mm3k.memorydb.us-east-2.amazonaws.com:6379/0'
    CELERY_BACKEND = 'redis://localhost:6379/0'