import sys, os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from celery import Celery

app = Celery('tasks', broker='amqps://map:guestguestguest@b-c44d7833-49b8-47ca-b252-31cb81a35d9f.mq.us-east-2.amazonaws.com:5671', backend='redis://localhost:6379/0')

app.autodiscover_tasks(['tasks.sms', 'tasks.demo'], force=True)