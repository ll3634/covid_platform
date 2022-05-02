from tasks.main import app
from utils import sms

@app.task()
def send_sms(phone):
    code = sms.send_sms(phone)
    return code