from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class Users(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    is_influencer = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User: {self.email}>'

    def serialize(self):
        # Do not serialize the password, its a security breach
        return {'id': self.id,
                'email': self.email,
                'is_active': self.is_active,
                'is_influencer': self.is_influencer}


class UsersInfluencers(db.Model):
    __tablename__ = 'usersinfluencers'
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(20))
    last_name = db.Column(db.String(20))
    date_birth = db.Column(db.Date())
    gender = db.Column(db.String())
    telephone = db.Column(db.Integer)
    country = db.Column(db.String(20))
    zip_code = db.Column(db.Integer)
    profile_img = db.Column(db.String())
    headline = db.Column(db.String(100))
    description = db.Column(db.String(1000))
    social_networks = db.Column(db.String())
    id_user = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship(Users)

    def __repr__(self):
        return f'<User influencer: {self.first_name}>'

    def serialize(self):
        return {'id': self.id,
                'first_name': self.first_name,
                'last_name': self.last_name,
                'date_birth': self.date_birth,
                'gender': self.gender,
                'telephone': self.telephone,
                'country': self.country,
                'zip_code': self.zip_code,
                'profile_img': self.profile_img,
                'headline': self.headline,
                'description': self.description,
                'social_networks': self.social_networks,
                'id_user': self.id_user}


class UsersCompany(db.Model):
    __tablename__ = 'userscompany'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200))
    cif = db.Column(db.String(20))
    country = db.Column(db.String(20))
    zip_code = db.Column(db.Integer)
    telephone = db.Column(db.Integer)
    headline = db.Column(db.String(100))
    description = db.Column(db.String(1000))
    industry =db.Column(db.String())
    profile_img = db.Column(db.String())
    website = db.Column(db.String())
    id_user = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship(Users)

    def __repr__(self):
        return f'<User company: {self.name}>'

    def serialize(self):
        return {'id': self.id,
                'name': self.name,
                'cif': self.cif,
                'country': self.country,
                'zip_code': self.zip_code,
                'telephone': self.telephone,
                'headline': self.headline,
                'description': self.description,
                'industry': self.industry,
                'profile_img': self.profile_img,
                'website': self.website,
                'id_user': self.id_user}


class Offers(db.Model):
    __tablename__ = 'offers'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), unique=False, nullable=False)
    post = db.Column(db.String(2000), unique=False, nullable=False)
    date_post = db.Column(db.Date, nullable=False)
    status = db.Column(db.Enum('opened', 'cancelled', 'closed', name='status'), nullable=False)
    salary_range = db.Column(db.String())
    min_followers = db.Column(db.Integer())
    duration_in_weeks = db.Column(db.Integer)
    location = db.Column(db.String(200))
    industry = db.Column(db.String(200))
    id_company = db.Column(db.Integer, db.ForeignKey('userscompany.id'))
    user = db.relationship(UsersCompany)

    def __repr__(self):
        return f'<Offers: {self.title}>'

    def serialize(self):
        return {'id': self.id,
                'title': self.title,
                'post': self.post,
                'date_post': self.date_post,
                'status': self.status,
                'salary_range': self.salary_range,
                'min_followers': self.min_followers,
                'duration': self.duration_in_weeks,
                'location': self.location,
                'industry': self.industry,
                'id_company': self.id_company}

class OffersCandidates(db.Model):
    __tablename__ = 'offerscandidates'
    id = db.Column(db.Integer, primary_key=True)
    status_candidate = db.Column(db.Enum('pending', 'accepted', 'refused', name='status'), nullable=False)
    status_influencer = db.Column(db.Enum('active', 'inactive', name='status_influencer'), nullable=False)
    cover_letter = db.Column(db.String(500), nullable=False)
    social_network_url = db.Column(db.String(), nullable=False)
    followers = db.Column(db.Integer(), nullable=False)
    id_offer = db.Column(db.Integer, db.ForeignKey('offers.id'))
    offer = db.relationship(Offers)
    id_influencer = db.Column(db.Integer, db.ForeignKey('usersinfluencers.id'))
    influencer = db.relationship(UsersInfluencers)

    def __repr__(self):
        return f'<Offers candidates: {self.status}>'

    def serialize(self):
        return {'id': self.id,
                'status': self.status,
                'status_influencer': self.status_influencer,
                'cover_letter': self.cover_letter,
                'social_network_url': self.social_network_url,
                'followers': self.followers,
                'id_offer': self.id_offer,
                'id_influencer': self.id_influencer}


class SocialNetworks(db.Model):
    __tablename__ = 'socialnetworks'
    id = db.Column(db.Integer, primary_key=True)
    social_network = db.Column(db.String(), nullable=False)
    social_network_url = db.Column(db.String(), nullable=False)
    followers = db.Column(db.Integer(), nullable=False)
    id_influencer = db.Column(db.Integer, db.ForeignKey('usersinfluencers.id'))
    influencer = db.relationship(UsersInfluencers)

    def __repr__(self):
        return f'<Social Networks: {self.social_network}>'

    def serialize(self):
        return {'id': self.id,
                'social_network': self.social_network,
                'social_network_url': self.social_network_url,
                'followers': self.followers,
                'id_influencer': self.id_influencer}

