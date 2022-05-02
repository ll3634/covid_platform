from flask import Flask, jsonify


def create_app(config):
    app = Flask(__name__)
    app.secret_key = 'key'
    app.config.from_object(config)
    return app

app = create_app()
