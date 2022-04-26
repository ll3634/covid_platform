import ssl
import pika

ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLSv1_2)
ssl_context.set_ciphers('ECDHE+AESGCM:!ECDSA')

url = f"amqps://map:guestguestguest@b-c44d7833-49b8-47ca-b252-31cb81a35d9f.mq.us-east-2.amazonaws.com:5671"
parameters = pika.URLParameters(url)
parameters.ssl_options = pika.SSLOptions(context=ssl_context)

rabbitmq_conn = pika.BlockingConnection(parameters)


# credential = pika.PlainCredentials('guest', 'guest')
# rabbitmq_conn = pika.BlockingConnection(pika.ConnectionParameters('localhost', credentials=credential))
