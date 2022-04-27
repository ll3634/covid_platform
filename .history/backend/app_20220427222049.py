from datetime import datetime, timedelta
from flask import Flask, jsonify
# from flask_socketio import SocketIO
import socketio
from flask_cors import CORS
from utils.flask_celery import make_celery

from models import db
from schemas import ma
from views import venue, review, user, checkin

import settings

app = Flask(__name__)
app.config.from_object(settings.Dev)

db.init_app(app)
ma.init_app(app)
celery = make_celery(app)
celery.autodiscover_tasks(['tasks.demo'], force=True)
# socketio = SocketIO(app)
# socketio.init_app(app, cors_allowed_origins="*")
app.sio = socketio.KombuManager('amqps://map:guestguestguest@b-c44d7833-49b8-47ca-b252-31cb81a35d9f.mq.us-east-2.amazonaws.com:5671', write_only = True)
# app.sio = socketio.KombuManager('amqp://guest:guest@localhost:5672', write_only = True)
CORS(app)

@app.route('/')
def index():
    return "Hello World!"

@app.route('/create_db')
def create_db():
    db.create_all()
    return "Succeed, Creating Database!"

@app.route('/delete_db')
def drop_db():
    db.drop_all()
    return "Succeed, Dropping Database!"

# test demo for celery
@app.route('/simpletask')
def simpletask():
    celery.send_task('tasks.demo.longtime_add', kwargs={'a': 1, 'b': 2})
    return "Succeed, Calling Task!"

@app.route('/longtask', methods=['GET'])
def longtask():
    task = celery.send_task('tasks.demo.long_task')
    # task = long_task.apply_async()
    return task.id

@app.route('/longtask/<task_id>', methods=['GET'])
def longtask_result(task_id=None):
    task = celery.AsyncResult(task_id)
    # task = long_task.AsyncResult(task_id)
    if task.state == 'PENDING':
        response = {
            'state': task.state,
            'current': 0,
            'total': 1,
            'status': 'Pending...'
        }
    elif task.state != 'FAILURE':
        response = {
            'state': task.state,
            'current': task.info.get('current', 0),
            'total': task.info.get('total', 1),
            'status': task.info.get('status', '')
        }
        if 'result' in task.info:
            response['result'] = task.info['result']
    else:
        response = {
            'state': task.state,
            'current': 1,
            'total': 1,
            'status': str(task.info),
        }
    return jsonify(response)

@app.route('/timetask')
def timetask():
    ctime = datetime.now()
    utc_time = datetime.utcfromtimestamp(ctime.timestamp())
    time_delay = timedelta(seconds=10)
    task_time = utc_time + time_delay
    celery.send_task('tasks.demo.late_time', eta=task_time)
    return "Succeed, Calling Task!"

app.register_blueprint(venue.blue, url_prefix='/venue')
app.register_blueprint(review.blue, url_prefix='/review')
app.register_blueprint(user.blue, url_prefix='/user')
app.register_blueprint(checkin.blue, url_prefix='/checkin')

if __name__ == '__main__':    
    app.run()