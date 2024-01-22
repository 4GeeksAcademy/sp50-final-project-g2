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
    access_token = create_access_token(identity=[user.serialize()])
    return jsonify(access_token=access_token)


@api.route('/private', methods=['GET', 'PUT'])
@jwt_required()
def private():
    if request.method == "GET":
        current_user = get_jwt_identity()
        if not current_user:
            return jsonify({"message": "Access denied"}), 401
        if current_user[0]['is_influencer'] == True: 
            response_body = {}
            response_body["message"] = "Perfil del usuario"
            response_body["results"] = current_user
            return response_body, 200
        if current_user[0]['is_influencer'] == False:
            response_body = {}
            response_body["message"] = "Perfil del Empresario"
            response_body["results"] = current_user
            return response_body, 200
    if request.method == "PUT":
        current_user = get_jwt_identity()
        response_body = {}
        results = {}
        data = request.json
        if not current_user:
            return jsonify({"message": "Access denied"}), 401
        user = db.session.execute(db.select(Users).where(Users.email == current_user[0]["email"])).scalar()
        user.password = data.get('password')
        db.session.commit()
        results['user'] = user.serialize()
        response_body['message'] = 'Usuario modificado'
        response_body['results'] = results
        return response_body, 200


@api.route('/profile/influencer', methods=['GET', 'POST', 'PUT'])
@jwt_required()
def profile():
    # Access the identity of the current user with get_jwt_identity
    if request.method == "GET":
        current_user = get_jwt_identity()
        if not current_user:
            return jsonify({"message": "Access denied"}), 401
        if current_user[0]['is influencer'] == True:
            user = db.session.execute(db.select(UsersInfluencers).where(UsersInfluencers.id_user==current_user[0]["id"])).scalar() 
            response_body['Message: '] = "Perfil de usuario"
            if not user:
                response_body['results'] = user
                return response_body,200
            response_body['Resultados: '] = user.serialize()
            return response_body,200
        if current_user[0]['is influencer'] == False:
            user = db.session.execute(db.select(UsersCompany).where(UsersCompany.id_user == current_user[0]["id"])).scalar()
            response_body["Mensaje: "] = "Perfil del Empresario"
            if not user:
                response_body["Results: "] = user
                return response_body, 200
            response_body["Resultados: "] = user.serialize()
            return response_body, 200
       
        #  MÉTODO PUT SIN SEPARACIÓN DE USUARIO             
    if request.method == 'PUT':
        current_user = get_jwt_identity()
        response_body = {}
        results = {}
        data = request.json
        if current_user[0]['is influencer'] == True:
            user = db.session.execute(db.select(UsersInfluencers).where(UsersInfluencers.id_user == current_user)).scalar()
        if not user:
            return jsonify({"message:": "Usuario no encontrado"}), 404
        
        user.first_name = data.get('first_name')
        user.last_name = data.get('last_name')
        user.date_birth = data.get('date_birth')
        user.gender = data.get('gender') 
        user.telephone = data.get('telephone')
        user.country = data.get('country')
        user.zip_code = data.get('zip_code')
        user.profile_img = data.get('profile_img')
        user.headline = data.get('headline')
        user.description = data.get('description')
        user.social_networks = data.get('social_networks')
      
        db.session.commit()
        results['User: '] = user.serialize()
        response_body['Message: '] = 'El usuario ha sido modificado'
        response_body['Resultado: '] = results
        return response_body, 200

        if current_user[0]['is_influencer'] == False:  #Si es falso, es por lo tanto una empresa
            user = db.session.execute(db.select(UsersCompany).where(UsersCompany.id_user == current_user)).scalar()
        if not user:
            return jsonify({"message:": "Usuario no encontrado"})
        user.name = data.get('name')
        user.cif = data.get('cif')
        user.country = data.get('country')
        user.zip_code = data.get('zip_code')
        user.telephone = data.get('telephone')
        user.headline = data.get('headline')
        user.description = data.get('description')
        user.industry = data.get('industry')
        user.profile_img = data.get('profile_img')
        user.website = data.get('website')
        user.id_user = data.get('id_user')

        db.session.commit()
        results['User: '] = user.serialize()
        response_body['Resultado: '] = results
        return response_body,200        

    # MÉTODO POST
    if request.method == "POST":
        current_user = get_jwt_identity()
        if not current_user:
            return jsonify({"Mensaje: " : "Bad email or password"}), 401
        response_body = {}
        if current_user[0]['is_influencer'] == True:
            data = request.json
            user = UsersInfluencers(first_name = data.get('first_name'),
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
            db.session.add(user)
            db.session.commit()
            response_body['Nuevo Influencer: '] = user.serialize()
            return response_body,200
        if current_user[0]['is_influencer'] == False:
            data = request.json
            user = UsersCompany(name = data.get('name'),
                                cif = data.get('cif'),
                                country = data.get('country'),
                                zip_code = data.get('zip_code'),
                                telephone = data.get('telephone'),
                                headline = data.get('headline'),
                                description = data.get('description'),
                                industry = data.get('industry'),
                                profile_img = data.get('profile_img'),
                                website = data.get('website'),
                                id_user = current_user[0]['id']
                                )
            db.session.add(user)
            db.session.commit()
            response_body['user'] = user.serialize()
            return response_body, 200       
    
@api.route('/offers/private/', methods=['GET', 'POST',])  # SOLO PARA USERS_COMPANY QUE LAS EMPRESAS VEAN LAS OFERTAS. PODEMOS VERLAS Y CREARLAS.
@jwt_required()
def private_offers():
    if request.method == 'GET':
        current_user = get_jwt_identity()
        response_body = {}
        results = {}
        if not current_user:
            return jsonify({"message": "Access denied"}), 401
        if current_user[0]['is_influencer'] == False:  # SI SOY UNA EMPRESA:
            offers = db.session.execute(db.select(Offers)).where(Offers.id_company == current_user[0][id_user]).scalars()  #ENTIENDO QUE ES LA LISTA OFERTAS DE X EMPRESA
            offers_list = []
            for row in offers:
                offers_list.append(row.serialize())
            
            results['Offers: '] = offers_list
            response_body['Message: '] = "Ofertas"            
            response_body['Resultados: '] = results
            return response_body,200
    
    if request.method == 'POST':
        current_user = jwt_required()
        if not current_user:
            return jsonify({"message": "Access denied"}), 401
        if current_user[0]['is_influencer'] == False:
            response_body= {}
            data = request.json
            offer = Offers(id = data.get('id'),
                            title = data.get('title'),
                            post = data.get('post'),
                            date_post = data.get('date_post'),
                            status = data.get('status'),
                            salary_range = data.get('salary_range'),
                            min_followers = data.get('min_followers'),
                            duration = data.get('duration_in_weeks'),
                            location = data.get('location'),
                            industry = data.get('industry'),
                            id_company = data.get('id_company'),
                            )
                            
            db.session.add(offer)
            db.session.commit()
            response_body['Nueva Oferta: '] = offer.serialize()
            return response_body,200

    
@api.route('/offers/<int:id_user_company>/<int:offers_id>', methods=['PUT', 'DELETE'])  # SOLO PARA USERS/COMPANY
@jwt_required()
def private_offer_singular(offers_id):
    if request.method == 'DELETE':
        current_user = jwt_required
        response_body = {}
        if current_user[0]['is_influencer'] == False:
            user_offer = db.session.execute(db.select(Offers).where(Offers.id == offer_id, Offers.id_company == current_user[0]["id"])).scalar()
            db.session.delete(user_offer)
            db.session.commit()
            response_body['message'] = 'Oferta eliminada'
            return response_body, 200

    if request.method == 'PUT':
        current_user = jwt_required()
        if not current_user:
            return jsonify({"message": "Access denied"}), 401
        if current_user[0]['is_influencer'] == False:
             data = request.json
        user_offer = db.session.execute(db.select(Offers).where(Offers.id == offer_id, Offers.id_company == current_user[0]["id"])).scalar()
        if not user_offers:
                return jsonify({"message:" "No se han encontrado ofertas"}), 404

        user_offer.title = data.get('title') 
        user_offer.post = data.get('post')
        user_offer.date_publish = data.get('date_publish')
        user_offer.status = data.get('status')
        user_offer.salary_range = data.get('salary_range')
        user_offer.min_followers = data.get('min_followers')
        user_offer.duration_in_weeks = data.get('duration_in_weeks')
        user_offer.location = data.get('location') 
        user_offer.industry = data.get('industry')

        db.session.commit()
        response_body['offer: '] = user_offer.serialize()
        response_body['message'] = 'Los datos de la oferta han sido modificados'
        return response_body, 200  
         

           




             

    