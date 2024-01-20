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

@api.route('/profile/influencer', methods=['GET', 'POST', 'PUT'])
@jwt_required()
def profile():
    # Access the identity of the current user with get_jwt_identity
    if request.method == "GET":
        current_user = get_jwt_identity()
        if not current_user:
            return jsonify({"message": "Access denied"}), 401
        if current_user[1]: 
            response_body = {}
            response_body["message"] = "Perfil del usuario"
            response_body["results"] = current_user
            return response_body, 200
            
    if request.method == 'PUT':
        current_user = get_jwt_identity()
        response_body = {}
        results = {}
        data = request.json
        users_influencers = db.session.execute(db.select(UsersInfluencers).where(UsersInfluencers.id_user == current_user)).scalar()
        if not users_influencers:
            return jsonify({"message:" "Usuario no encontrado"}), 404
        
        users_influencers.first_name = data.get('first_name')
        users_influencers.last_name = data.get('last_name')
        users_influencers.date_birth = data.get('date_birth')
        users_influencers.gender = data.get('gender') 
        users_influencers.telephone = data.get('telephone')
        users_influencers.country = data.get('country')
        users_influencers.zip_code = data.get('zip_code')
        users_influencers.profile_img = data.get('profile_img')
        users_influencers.headline = data.get('headline')
        users_influencers.description = data.get('description')
        users_influencers.social_networks = data.get('social_networks')
      
        db.session.commit()
        results['User: '] = users_influencers.serialize()
        response_body['Message: '] = 'El usuario ha sido modificado'
        response_body['Resultado: '] = results
        return response_body, 200

    if request.method == "POST":
        response_body = {}
        data = request.json
        new_influencer = UsersInfluencers(first_name = data.get('first_name'),
                                      last_name = data.get('last_name'),
                                      date_birth = data.get('date_birth'),
                                      gender = data.get('gender'),
                                      telephone = data.get('telephone'),
                                      country = data.get('country'),
                                      zip_code = data.get('zip_code'),
                                      profile_img = data.get('profile_img'),
                                      headline = data.get('headline'),
                                      description = data.get('description'),
                                      social_networks = data.get('social_networks'),
                                      )
        db.session.add(new_influencer)
        db.session.commit()
        response_body['Nuevo Influencer: '] = new_influencer.serialize()
        return response_body,200       
    
@api.route('/profile/company', methods=['GET', 'POST', 'PUT'])
@jwt_required()
def company_profile():
    if request.method == "GET":
        current_user = get_jwt_identity()
        if not current_user:
            return jsonify({"message": "Access denied"}), 401
        if current_user: 
                response_body = {}
                response_body["message"] = "Perfil del usuario (Empresa)"
                response_body["results"] = current_user
                return response_body, 200
    
    if request.method == "PUT":
        current_user = get_jwt_identity()
        response_body = {}
        results = {}
        data = request.json
        users_company = db.session.execute(db.select(UsersCompany).where(UsersCompany.id_user == current_user)).scalar()
        if not users_company:
            return jsonify({"message:" "Empresa no encontrada"}), 404
        
        users_company.name = data.get('name')
        users_company.cif = data.get('cif')
        users_company.country = data.get('country')
        users_company.zip_code = data.get('zip_code') 
        users_company.telephone = data.get('telephone')
        users_company.telephone = data.get('headline')
        users_company.description = data.get('description')
        users_company.industry = data.get('industry')
        users_company.profile_img = data.get('profile_img')
        users_company.website = data.get('website')
        users_company.id_user = data.get('id_user')
        
      
        db.session.commit()
        results['User: '] = users_company.serialize()
        response_body['Message: '] = 'Los datos de la empresa han sido modificados'
        response_body['Resultado: '] = results
        return response_body, 200

    
        
        
