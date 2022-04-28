import sys, os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from flask_apscheduler import APScheduler

scheduler = APScheduler()