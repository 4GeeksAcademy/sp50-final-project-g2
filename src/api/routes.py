"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_cors import CORS
from api.models import db, Users, UsersCompany, UsersInfluencers, Offers
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from datetime import datetime


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
    user = db.session.execute(db.select(Users).where(Users.email == email, Users.password == password, Users.is_active == True)).scalar()
    if not user:
        return jsonify({"message": "Bad email or password"}), 401
    access_token = create_access_token(identity=[user.serialize(),])
    return jsonify(access_token=access_token), 200

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


@api.route('/offer-candidates', methods=['GET', 'POST'])
@jwt_required()
def offer_candidates():
    response_body = results = {}
    if request.method == 'POST':
        current_user = get_jwt_identity()
        if not current_user:
            response_body['message'] = 'Access denied'
            return response_body, 401
        if current_user[0]['is_influencer'] == False: 
            response_body["message"] = "Acceso denegado, no tiene perfil de influencer"
            response_body["results"] = current_user
            return response_body, 401
        # Aqui debo hacer la logica para que un influencer aplique a una oferta.
        if current_user[0]['is_influencer'] == True:
            response_body = {}
            data = request.json
            offer_register = OffersCandidates(status = data.get('status'),
                                            status_influencer = data.get('status_influencer'),
                                            cover_letter = data.get('cover_letter'),
                                            social_network_url = data.get('social_network_url'),
                                            followers = data.get('followers'),
                                            id_offer = data.get('id_offer'),
                                            offer = data.get('offer'),
                                            id_influencer = data.get('id_influencer'),
                                            influencer = data.get('influencer'))
        db.session.add(offer_register)
        db.session.commit()
        response_body['Registrado: '] = offer_register.serialize()                 
        # Obtener los datos del json de lo que me estan enviando
        return response_body, 200


@api.route('/offer-candidates/<int:id>', methods=['GET', 'DELETE'])
def offer_candidates_id(id):
    response_body = results = {}
    # Buscamos en la base si esa oferta existe
    # Si no existe, hacemos un return devolviendo el error al front
    if request.method == 'GET':
        current_user = get_jwt_identity()
        # Ver las ofertas ID de ese candidato
        response_body = results = {}
        if current_user[0]['is_influencer'] == True:
            offers = db.session.execute(db.select(OfferCandidates)).scalars
            offers_list = []
            for row in offers:
                offers_list.append(row.serialize())
        results['Offers: '] = offers_list
        response_body['Message: '] = "Ofertas"            
        response_body['Resultados: '] = results
        return response_body, 200
    if request.method == 'DELETE':
        # Eliminar la oferta de ese ID
        return response_body, 200


@api.route('/influencers/<int:id>/offer-candidates', methods=['GET'])
def offer_candidates_by_influencer(id):
    response_body = results = {}
    if request.method == 'GET':
        # Muestro todas las ofertas que se postulo el influencer.
        return response_body, 200

  

