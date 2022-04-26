from cache import redis_conn



def release_seats(venue_id, seats, max_seats = 100):
    count = redis_conn.incrby('seats:' + venue_id, seats)
    if count > max_seats:
      return False
    return True 