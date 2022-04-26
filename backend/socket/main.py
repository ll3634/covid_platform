import eventlet

eventlet.monkey_patch()

import eventlet.wsgi
from server import app

import notify

address = ('', 8000)
sock = eventlet.listen(address)
eventlet.wsgi.server(sock, app)
