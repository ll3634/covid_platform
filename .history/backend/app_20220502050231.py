from datetime import datetime, timedelta
from flask import Flask, jsonify
# from apscheduler.schedulers.background import BackgroundScheduler
import socketio
from flask_cors import CORS

from models import db
from schemas import ma
from schedule import scheduler
from cache import cache

from views import venue, review, user, checkin, task_demo, schedule_demo

import settings

def create_app():
    app = Flask(__name__)
    app.secret_key = 'key'
    app.config.from_object(settings.Dev)
    return app

db.init_app(app)
ma.init_app(app)
cache.init_app(app)
scheduler.init_app(app)

# scheduler = BackgroundScheduler()
# scheduler.start()

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


app.register_blueprint(venue.blue, url_prefix='/venue')
app.register_blueprint(review.blue, url_prefix='/review')
app.register_blueprint(user.blue, url_prefix='/user')
app.register_blueprint(checkin.blue, url_prefix='/checkin')
app.register_blueprint(task_demo.blue, url_prefix='/task')
app.register_blueprint(schedule_demo.blue, url_prefix='/schedule')

if __name__ == '__main__':    
    app.run()