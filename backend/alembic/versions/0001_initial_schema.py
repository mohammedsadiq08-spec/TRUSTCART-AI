"""initial_schema

Revision ID: 0001_initial_schema
Revises: 
Create Date: 2026-09-15 00:00:00.000000

"""
from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = '0001_initial_schema'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # 1. Users Table
    op.create_table(
        'users',
        sa.Column('id', sa.String(length=64), primary_key=True),
        sa.Column('full_name', sa.String(length=128), nullable=False),
        sa.Column('email', sa.String(length=255), nullable=False),
        sa.Column('password_hash', sa.String(length=255), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.Column('updated_at', sa.DateTime(), nullable=True)
    )
    op.create_index('ix_users_id', 'users', ['id'])
    op.create_index('ix_users_email', 'users', ['email'], unique=True)

    # 2. Sellers Table
    op.create_table(
        'sellers',
        sa.Column('id', sa.String(length=64), primary_key=True),
        sa.Column('name', sa.String(length=255), nullable=False),
        sa.Column('platform', sa.String(length=64), nullable=False, server_default='Amazon'),
        sa.Column('profile_url', sa.String(length=512), nullable=True),
        sa.Column('rating', sa.Float(), nullable=True, server_default='0.0'),
        sa.Column('review_count', sa.Integer(), nullable=True, server_default='0'),
        sa.Column('location', sa.String(length=128), nullable=True),
        sa.Column('account_age', sa.String(length=64), nullable=True, server_default='1+ Year active'),
        sa.Column('fulfillment_type', sa.String(length=64), nullable=True, server_default='Direct Platform'),
        sa.Column('risk_level', sa.String(length=32), nullable=True, server_default='LOW'),
        sa.Column('return_policy', sa.String(length=255), nullable=True, server_default='7-Day Replacement Policy'),
        sa.Column('warnings', sa.JSON(), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.Column('updated_at', sa.DateTime(), nullable=True)
    )
    op.create_index('ix_sellers_id', 'sellers', ['id'])
    op.create_index('ix_sellers_name', 'sellers', ['name'])

    # 3. Products Table
    op.create_table(
        'products',
        sa.Column('id', sa.String(length=64), primary_key=True),
        sa.Column('name', sa.String(length=512), nullable=False),
        sa.Column('description', sa.Text(), nullable=True),
        sa.Column('category', sa.String(length=128), nullable=False),
        sa.Column('brand', sa.String(length=128), nullable=False),
        sa.Column('price', sa.Float(), nullable=False),
        sa.Column('currency', sa.String(length=8), nullable=True, server_default='₹'),
        sa.Column('original_price', sa.Float(), nullable=True),
        sa.Column('image_url', sa.String(length=1024), nullable=True),
        sa.Column('source_platform', sa.String(length=64), nullable=False, server_default='Amazon'),
        sa.Column('source_url', sa.String(length=1024), nullable=True),
        sa.Column('seller_id', sa.String(length=64), sa.ForeignKey('sellers.id', ondelete='SET NULL'), nullable=True),
        sa.Column('rating', sa.Float(), nullable=True, server_default='0.0'),
        sa.Column('review_count', sa.Integer(), nullable=True, server_default='0'),
        sa.Column('thirty_day_avg_price', sa.Float(), nullable=True, server_default='0.0'),
        sa.Column('all_time_low', sa.Float(), nullable=True, server_default='0.0'),
        sa.Column('market_min', sa.Float(), nullable=True, server_default='0.0'),
        sa.Column('market_max', sa.Float(), nullable=True, server_default='0.0'),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.Column('updated_at', sa.DateTime(), nullable=True)
    )
    op.create_index('ix_products_id', 'products', ['id'])
    op.create_index('ix_products_name', 'products', ['name'])
    op.create_index('ix_products_category', 'products', ['category'])
    op.create_index('ix_products_brand', 'products', ['brand'])

    # 4. Reviews Table
    op.create_table(
        'reviews',
        sa.Column('id', sa.String(length=64), primary_key=True),
        sa.Column('product_id', sa.String(length=64), sa.ForeignKey('products.id', ondelete='CASCADE'), nullable=False),
        sa.Column('seller_id', sa.String(length=64), sa.ForeignKey('sellers.id', ondelete='SET NULL'), nullable=True),
        sa.Column('reviewer_id', sa.String(length=64), nullable=True),
        sa.Column('author', sa.String(length=128), nullable=False),
        sa.Column('avatar_url', sa.String(length=512), nullable=True),
        sa.Column('review_text', sa.Text(), nullable=False),
        sa.Column('rating', sa.Float(), nullable=False),
        sa.Column('verified_purchase', sa.Boolean(), nullable=True, server_default='1'),
        sa.Column('review_date', sa.String(length=64), nullable=True),
        sa.Column('sentiment_score', sa.Float(), nullable=True, server_default='0.0'),
        sa.Column('credibility_score', sa.Float(), nullable=True, server_default='80.0'),
        sa.Column('suspicion_probability', sa.Float(), nullable=True, server_default='10.0'),
        sa.Column('credibility_label', sa.String(length=64), nullable=True, server_default='High Credibility'),
        sa.Column('detected_signals', sa.JSON(), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=True)
    )
    op.create_index('ix_reviews_id', 'reviews', ['id'])
    op.create_index('ix_reviews_product_id', 'reviews', ['product_id'])

    # 5. Price History Table
    op.create_table(
        'price_history',
        sa.Column('id', sa.String(length=64), primary_key=True),
        sa.Column('product_id', sa.String(length=64), sa.ForeignKey('products.id', ondelete='CASCADE'), nullable=False),
        sa.Column('price', sa.Float(), nullable=False),
        sa.Column('avg_price', sa.Float(), nullable=False),
        sa.Column('source', sa.String(length=64), nullable=True, server_default='Amazon'),
        sa.Column('recorded_date', sa.String(length=32), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=True)
    )
    op.create_index('ix_price_history_id', 'price_history', ['id'])
    op.create_index('ix_price_history_product_id', 'price_history', ['product_id'])

    # 6. Product Analyses Table
    op.create_table(
        'product_analyses',
        sa.Column('id', sa.String(length=64), primary_key=True),
        sa.Column('user_id', sa.String(length=64), sa.ForeignKey('users.id', ondelete='CASCADE'), nullable=True),
        sa.Column('product_id', sa.String(length=64), sa.ForeignKey('products.id', ondelete='CASCADE'), nullable=False),
        sa.Column('review_trust_score', sa.Float(), nullable=True, server_default='80.0'),
        sa.Column('seller_trust_score', sa.Float(), nullable=True, server_default='80.0'),
        sa.Column('price_value_score', sa.Float(), nullable=True, server_default='80.0'),
        sa.Column('product_quality_score', sa.Float(), nullable=True, server_default='80.0'),
        sa.Column('risk_score', sa.Float(), nullable=True, server_default='20.0'),
        sa.Column('overall_trust_score', sa.Float(), nullable=True, server_default='80.0'),
        sa.Column('recommendation', sa.String(length=32), nullable=True, server_default='BUY'),
        sa.Column('confidence', sa.Float(), nullable=True, server_default='85.0'),
        sa.Column('decision_summary', sa.Text(), nullable=True),
        sa.Column('positive_evidence', sa.JSON(), nullable=True),
        sa.Column('caution_evidence', sa.JSON(), nullable=True),
        sa.Column('risk_factors', sa.JSON(), nullable=True),
        sa.Column('raw_telemetry', sa.JSON(), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=True)
    )
    op.create_index('ix_product_analyses_id', 'product_analyses', ['id'])
    op.create_index('ix_product_analyses_user_id', 'product_analyses', ['user_id'])
    op.create_index('ix_product_analyses_product_id', 'product_analyses', ['product_id'])

    # 7. User Preferences Table
    op.create_table(
        'user_preferences',
        sa.Column('id', sa.String(length=64), primary_key=True),
        sa.Column('user_id', sa.String(length=64), sa.ForeignKey('users.id', ondelete='CASCADE'), nullable=False, unique=True),
        sa.Column('category', sa.String(length=128), nullable=True, server_default='Audio & Electronics'),
        sa.Column('budget', sa.Float(), nullable=True, server_default='30000.0'),
        sa.Column('purpose', sa.String(length=64), nullable=True, server_default='Study'),
        sa.Column('comfort_weight', sa.Float(), nullable=True, server_default='40.0'),
        sa.Column('battery_weight', sa.Float(), nullable=True, server_default='30.0'),
        sa.Column('sound_weight', sa.Float(), nullable=True, server_default='20.0'),
        sa.Column('mic_weight', sa.Float(), nullable=True, server_default='10.0'),
        sa.Column('preferences', sa.JSON(), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.Column('updated_at', sa.DateTime(), nullable=True)
    )
    op.create_index('ix_user_preferences_id', 'user_preferences', ['id'])
    op.create_index('ix_user_preferences_user_id', 'user_preferences', ['user_id'], unique=True)

    # 8. Saved Products Table
    op.create_table(
        'saved_products',
        sa.Column('id', sa.String(length=64), primary_key=True),
        sa.Column('user_id', sa.String(length=64), sa.ForeignKey('users.id', ondelete='CASCADE'), nullable=False),
        sa.Column('product_id', sa.String(length=64), sa.ForeignKey('products.id', ondelete='CASCADE'), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.UniqueConstraint('user_id', 'product_id', name='uq_user_saved_product')
    )
    op.create_index('ix_saved_products_id', 'saved_products', ['id'])
    op.create_index('ix_saved_products_user_id', 'saved_products', ['user_id'])
    op.create_index('ix_saved_products_product_id', 'saved_products', ['product_id'])

    # 9. Social Product Inputs Table
    op.create_table(
        'social_product_inputs',
        sa.Column('id', sa.String(length=64), primary_key=True),
        sa.Column('user_id', sa.String(length=64), sa.ForeignKey('users.id', ondelete='SET NULL'), nullable=True),
        sa.Column('source_platform', sa.String(length=32), nullable=True, server_default='Instagram'),
        sa.Column('source_url', sa.String(length=1024), nullable=True),
        sa.Column('image_url', sa.String(length=1024), nullable=True),
        sa.Column('raw_post_title', sa.String(length=512), nullable=True),
        sa.Column('seller_handle', sa.String(length=128), nullable=True),
        sa.Column('posted_price_claim', sa.String(length=128), nullable=True),
        sa.Column('extracted_text', sa.Text(), nullable=True),
        sa.Column('identified_product', sa.String(length=255), nullable=True),
        sa.Column('market_price_range', sa.String(length=128), nullable=True),
        sa.Column('seller_risk', sa.String(length=32), nullable=True, server_default='HIGH'),
        sa.Column('return_info_status', sa.String(length=64), nullable=True, server_default='Unknown / Hidden'),
        sa.Column('reverse_image_origin', sa.String(length=255), nullable=True),
        sa.Column('flagged_warning', sa.Text(), nullable=True),
        sa.Column('confidence_score', sa.Float(), nullable=True, server_default='90.0'),
        sa.Column('analysis_status', sa.String(length=32), nullable=True, server_default='COMPLETED'),
        sa.Column('created_at', sa.DateTime(), nullable=True)
    )
    op.create_index('ix_social_product_inputs_id', 'social_product_inputs', ['id'])


def downgrade() -> None:
    op.drop_table('social_product_inputs')
    op.drop_table('saved_products')
    op.drop_table('user_preferences')
    op.drop_table('product_analyses')
    op.drop_table('price_history')
    op.drop_table('reviews')
    op.drop_table('products')
    op.drop_table('sellers')
    op.drop_table('users')
