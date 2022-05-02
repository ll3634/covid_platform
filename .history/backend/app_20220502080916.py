from apscheduler.schedulers.background import BackgroundScheduler
import socketio
from flask_cors import CORS

from models import db
from schemas import ma
from schedule import scheduler, period
from cache import cache

from views import venue, review, user, checkin, task_demo

from create import create_app
import settings

app = create_app(settings.Dev)


db.init_app(app)
ma.init_app(app)
cache.init_app(app)
scheduler.init_app(app)

scheduler = BackgroundScheduler()
scheduler.start()

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


@app.route('/apstask')
def apstask():
  def job1():
    with app.app_context():
        period.Job1()
  scheduler.add_job(func=job1, id='do_job_1', trigger='interval', seconds=2)
  return "Succeed, Calling Task!"

@app.route('/apstask/stop')
def apstask_stop():
    scheduler.remove_job('do_job_1')
    return "Succeed, Stop Task!"

@app.route('/addcapacity/<int:venue_id>/<int:capacity>')
def addcapacity():
  def job2():
    with app.app_context():
      period.Job2()
  scheduler.add_job(func=job2, id='do_job_2', trigger='interval', seconds=2)
  return "Succeed, Calling Task!"

@app.route('/addcapacity/stop')
def addcapacity_stop():
  scheduler.remove_job('do_job_2')
  return "Succeed, Stop Task!"

app.register_blueprint(venue.blue, url_prefix='/venue')
app.register_blueprint(review.blue, url_prefix='/review')
app.register_blueprint(user.blue, url_prefix='/user')
app.register_blueprint(checkin.blue, url_prefix='/checkin')
app.register_blueprint(task_demo.blue, url_prefix='/task')


if __name__ == '__main__':    
    app.run()