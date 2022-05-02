from app import app
from schedule import scheduler, period

def job1():
  with app.app_context():
    period.Job1()
    
def