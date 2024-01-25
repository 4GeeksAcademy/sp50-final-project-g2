import os
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from .models import db, Users, UsersCompany, UsersInfluencers, Offers, OffersCandidates, SocialNetworks


def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')
    # Add your models here, for example this is how we add a the Users model to the admin
    admin.add_view(ModelView(Users, db.session))
    admin.add_view(ModelView(UsersCompany, db.session))
    admin.add_view(ModelView(UsersInfluencers, db.session))
    admin.add_view(ModelView(Offers, db.session))
    admin.add_view(ModelView(OffersCandidates, db.session))
    admin.add_view(ModelView(SocialNetworks, db.session))
