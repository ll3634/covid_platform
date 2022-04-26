import socketio

mgr = socketio.KombuManager('amqps://map:guestguestguest@b-c44d7833-49b8-47ca-b252-31cb81a35d9f.mq.us-east-2.amazonaws.com:5671')
# mgr = socketio.KombuManager('amqp://guest:guest@localhost:5672')

sio = socketio.Server(async_mode='eventlet', client_manager=mgr)
app = socketio.Middleware(sio)