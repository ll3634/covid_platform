# test demo for apscheduler
import sys, os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from flask import Blueprint, jsonify, request, current_app
from apscheduler.schedulers.background import BackgroundScheduler
from schedule import scheduler, period


blue = Blueprint('schedule', __name__)

scheduler = BackgroundScheduler()
scheduler.start()


@blue.route('/apstask')
def apstask():
  scheduler.add_job(func=job1, id='do_job_1', trigger='interval', seconds=2)
    return "Succeed, Calling Task!"

@blue.route('/apstask/stop')
def apstask_stop():
    scheduler.remove_job('do_job_1')
    return "Succeed, Stop Task!"

@blue.route('/addcapacity')
def addcapacity():
  scheduler.add_job(func=job2, id='do_job_2', trigger='interval', seconds=2)
  return "Succeed, Calling Task!"

@blue.route('/addcapacity/stop')
def addcapacity_stop():
  
  scheduler.remove_job('do_job_2')
  return "Succeed, Stop Task!"



def job2():
  # with app.app_context():
    period.Job2()
