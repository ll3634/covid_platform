from flask import Flask, jsonify

import settings

def create_app():
    app = Flask(__name__)
    app.secret_key = 'key'
    app.config.from_object(settings.Dev)
    return app
