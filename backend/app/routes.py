from flask import jsonify, request
from app import app, db
from app.models import User, Property, Purchase

@app.route('/')
def index():
    return 'Hello, World!'

# Your route definitions here...
