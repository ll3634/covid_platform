from twilio.rest import Client 
import random

def send_sms(phone):
  account_sid = 'ACf64a7a8f5d038b2790cf37a878656772' 
  auth_token = 'a5e73d64032429074dc2d02bc5b019b0' 
  client = Client(account_sid, auth_token) 
  
  code = ''
  for _ in range(4):
    ran = random.randint(0, 9)
    code += str(ran)
  
  try:
    message = client.messages.create(  
                              messaging_service_sid='MGeeef19e571004887e892376122bdef61', 
                              body = code,  
                              to = phone    
                              # to='+12184151914' 
                          )
    print(message.sid)
    return 1, code
    
  except Exception as e:
    print('Failed to use API: '+ str(e))
    return 0, code