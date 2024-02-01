"""empty message

Revision ID: e2bcd2d6dfa6
Revises: 
Create Date: 2024-01-29 20:28:56.437512

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e2bcd2d6dfa6'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('password', sa.String(length=80), nullable=False),
    sa.Column('is_active', sa.Boolean(), nullable=False),
    sa.Column('is_influencer', sa.Boolean(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('userscompany',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=200), nullable=True),
    sa.Column('cif', sa.String(length=20), nullable=True),
    sa.Column('country', sa.String(length=20), nullable=True),
    sa.Column('zip_code', sa.Integer(), nullable=True),
    sa.Column('telephone', sa.Integer(), nullable=True),
    sa.Column('headline', sa.String(length=100), nullable=True),
    sa.Column('description', sa.String(length=1000), nullable=True),
    sa.Column('industry', sa.String(), nullable=True),
    sa.Column('profile_img', sa.String(), nullable=True),
    sa.Column('website', sa.String(), nullable=True),
    sa.Column('id_user', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['id_user'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('usersinfluencers',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('first_name', sa.String(length=200), nullable=True),
    sa.Column('last_name', sa.String(length=20), nullable=True),
    sa.Column('date_birth', sa.Date(), nullable=True),
    sa.Column('gender', sa.String(), nullable=True),
    sa.Column('telephone', sa.Integer(), nullable=True),
    sa.Column('country', sa.String(length=20), nullable=True),
    sa.Column('zip_code', sa.Integer(), nullable=True),
    sa.Column('profile_img', sa.String(), nullable=True),
    sa.Column('headline', sa.String(length=100), nullable=True),
    sa.Column('description', sa.String(length=1000), nullable=True),
    sa.Column('social_networks', sa.String(), nullable=True),
    sa.Column('id_user', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['id_user'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('offers',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=200), nullable=False),
    sa.Column('post', sa.String(length=2000), nullable=False),
    sa.Column('date_post', sa.Date(), nullable=False),
    sa.Column('status', sa.Enum('opened', 'cancelled', 'closed', name='status'), nullable=False),
    sa.Column('salary_range', sa.String(), nullable=True),
    sa.Column('min_followers', sa.Integer(), nullable=True),
    sa.Column('duration_in_weeks', sa.Integer(), nullable=True),
    sa.Column('location', sa.String(length=200), nullable=True),
    sa.Column('industry', sa.String(length=200), nullable=True),
    sa.Column('id_company', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['id_company'], ['userscompany.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('socialnetworks',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('social_network', sa.String(), nullable=False),
    sa.Column('social_network_url', sa.String(), nullable=False),
    sa.Column('followers', sa.Integer(), nullable=False),
    sa.Column('id_influencer', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['id_influencer'], ['usersinfluencers.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('offerscandidates',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('status_candidate', sa.Enum('pending', 'accepted', 'refused', name='status_candidate'), nullable=False),
    sa.Column('status_influencer', sa.Enum('active', 'inactive', name='status_influencer'), nullable=False),
    sa.Column('cover_letter', sa.String(length=500), nullable=False),
    sa.Column('social_network_url', sa.String(), nullable=False),
    sa.Column('followers', sa.Integer(), nullable=False),
    sa.Column('id_offer', sa.Integer(), nullable=True),
    sa.Column('id_influencer', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['id_influencer'], ['usersinfluencers.id'], ),
    sa.ForeignKeyConstraint(['id_offer'], ['offers.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('offerscandidates')
    op.drop_table('socialnetworks')
    op.drop_table('offers')
    op.drop_table('usersinfluencers')
    op.drop_table('userscompany')
    op.drop_table('users')
    # ### end Alembic commands ###