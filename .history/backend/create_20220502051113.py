from flask import Flask, jsonify


def create_app(config_name):
    app = Flask(__name__)
    app.secret_key = 'key'
    app.config.from_object(config_name)
    return app