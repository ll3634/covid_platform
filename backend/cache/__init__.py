import redis
from flask_caching import Cache

redis_pool = redis.ConnectionPool(host='localhost', port=6379, db=0)
redis_conn = redis.Redis(connection_pool=redis_pool)


cache = Cache()