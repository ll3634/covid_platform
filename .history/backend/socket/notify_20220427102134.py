from server import sio


@sio.on('connect')
def on_connect(sid, environ):
    room = environ['headers_raw'][2][1]
    print(room)
    sio.enter_room(sid, str(room))
    print('Server connected')

@sio.on('disconnect')
def on_disconnect(sid):
    rooms = sio.rooms(sid)
    for room in rooms:
      sio.leave_room(sid, room) 
    print('Server disconnected')
    
@sio.on('NewVenue')
def 