from app import app
from schedule import period

def job1():
  with app.app_context():
    period.Job1()
    
def job2():
  with app.app_context():
    period.Job2()