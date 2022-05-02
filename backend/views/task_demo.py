# test demo for celery
import sys, os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from datetime import datetime, timedelta

from flask import Blueprint, jsonify, request, current_app

blue = Blueprint('task', __name__)

from tasks.demo import tasks


@blue.route('/simpletask')
def simpletask():
    tasks.longtime_add.delay(1, 2)
    # celery.send_task('tasks.demo.longtime_add', kwargs={'a': 1, 'b': 2})
    return "Succeed, Calling Task!"

@blue.route('/longtask', methods=['GET'])
def longtask():
    task = tasks.long_task.apply_async()
    # task = celery.send_task('tasks.demo.long_task')
    return task.id

@blue.route('/longtask/<task_id>', methods=['GET'])
def longtask_result(task_id=None):
    # task = celery.AsyncResult(task_id)
    task = tasks.long_task.AsyncResult(task_id)
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

@blue.route('/timetask')
def timetask():
    ctime = datetime.now()
    utc_time = datetime.utcfromtimestamp(ctime.timestamp())
    delay_list = []
    for i in range(10):
        delay_list.append(utc_time + timedelta(seconds=i * 1))
    for delay in delay_list:
        tasks.late_time.apply_async(eta=delay)
        # celery.send_task('tasks.demo.late_time', eta=delay)
    # time_delay = timedelta(seconds=20)
    # task_time = utc_time + time_delay
    # celery.send_task('tasks.demo.late_time', eta=task_time)
    return "Succeed, Calling Task!"