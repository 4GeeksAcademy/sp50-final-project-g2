"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_cors import CORS
from api.models import db, Users
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required


api = Blueprint('api', __name__)
CORS(api)  # Allow CORS requests to this API


@api.route('/hello', methods=['GET'])
def handle_hello():
    response_body = {}
    response_body["message"] = "Hello! I'm a message that came from the backend, check the network tab on the browser inspector and you will see the GET request"
    return response_body, 200


@api.route('/signup', methods=['POST'])
def signup():
    response_body = {}
    data = request.json
    user = Users(email = data.get('email'),
                 password = data.get('password'),
                 is_active = True,
                 is_influencer = data.get('is_influencer')
                 )
    user_exist = db.session.execute(db.select(Users).where(Users.email == user.email)).scalar()
    if user_exist:
        return jsonify({"message": "Usuario existente"}), 401
    db.session.add(user)
    db.session.commit()
    response_body['results'] = user.serialize()
    response_body['message'] = "Usuario creado"
    access_token = create_access_token(identity=[user.email, True])
    response_body['access_token'] = access_token
    return response_body, 200


@api.route('/login', methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    is_influencer =  request.json.get("is_influencer", None)
    user = db.session.execute(db.select(Users).where(Users.email == email, Users.password == password)).scalar()
    if not user:
        return jsonify({"message": "Bad email or password"}), 401
    access_token = create_access_token(identity=[email, "is influencer", is_influencer ])
    return jsonify(access_token=access_token)

@api.route('/profile', methods=['GET', 'POST', 'PUT'])
@jwt_required()
def profile():
    # Access the identity of the current user with get_jwt_identity
    if request.method == "GET":
        current_user = get_jwt_identity()
        if not current_user:
            return jsonify({"message": "Access denied"}), 401
        if current_user[2]: 
            response_body = {}
            response_body["message"] = "Perfil del usuario"
            response_body["results"] = current_user
            return response_body, 200
        else:
            response_body = {}
            response_body["message"] = "Perfil del Empresario"
            response_body["results"] = current_user
            return response_body, 200

