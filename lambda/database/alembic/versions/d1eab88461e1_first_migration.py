"""first_migration

Revision ID: d1eab88461e1
Revises: 
Create Date: 2021-12-30 20:45:21.225121

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd1eab88461e1'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('reports',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('creation_date', sa.Date(), nullable=True),
    sa.Column('end_date', sa.Date(), nullable=True),
    sa.Column('deadline', sa.Date(), nullable=True),
    sa.Column('weight_name', sa.String(length=15), nullable=True),
    sa.Column('status_name', sa.String(length=15), nullable=True),
    sa.Column('urgency_level', sa.String(length=1), nullable=True),
    sa.Column('report_class', sa.Integer(), nullable=True),
    sa.Column('bug_id', sa.Integer(), nullable=True),
    sa.Column('module_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['bug_id'], ['bugs.id'], ),
    sa.ForeignKeyConstraint(['module_id'], ['modules.id'], ),
    sa.ForeignKeyConstraint(['report_class'], ['report_classes.id'], ),
    sa.ForeignKeyConstraint(['status_name'], ['statuses.name'], ),
    sa.ForeignKeyConstraint(['urgency_level'], ['urgency_levels.level'], ),
    sa.ForeignKeyConstraint(['weight_name'], ['weights.name'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_reports_bug_id'), 'reports', ['bug_id'], unique=False)
    op.create_index(op.f('ix_reports_id'), 'reports', ['id'], unique=False)
    op.create_index(op.f('ix_reports_module_id'), 'reports', ['module_id'], unique=False)
    op.create_index(op.f('ix_reports_report_class'), 'reports', ['report_class'], unique=False)
    op.create_index(op.f('ix_reports_status_name'), 'reports', ['status_name'], unique=False)
    op.create_index(op.f('ix_reports_urgency_level'), 'reports', ['urgency_level'], unique=False)
    op.create_index(op.f('ix_reports_weight_name'), 'reports', ['weight_name'], unique=False)
    op.create_table('messages',
    sa.Column('send_date', sa.DateTime(), nullable=False),
    sa.Column('text', sa.String(length=400), nullable=True),
    sa.Column('report_id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=50), nullable=False),
    sa.ForeignKeyConstraint(['report_id'], ['reports.id'], ),
    sa.ForeignKeyConstraint(['username'], ['users.username'], ),
    sa.PrimaryKeyConstraint('send_date', 'report_id', 'username')
    )
    op.create_index(op.f('ix_messages_send_date'), 'messages', ['send_date'], unique=False)
    op.create_index(op.f('ix_messages_username'), 'messages', ['username'], unique=False)
    op.create_table('report_keyword_association',
    sa.Column('key_word_id', sa.Integer(), nullable=True),
    sa.Column('report_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['key_word_id'], ['reports.id'], ),
    sa.ForeignKeyConstraint(['report_id'], ['key_words.id'], )
    )
    op.create_index(op.f('ix_report_keyword_association_key_word_id'), 'report_keyword_association', ['key_word_id'], unique=False)
    op.create_table('roles',
    sa.Column('role', sa.String(length=1), nullable=True),
    sa.Column('report_id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=50), nullable=False),
    sa.ForeignKeyConstraint(['report_id'], ['reports.id'], ),
    sa.ForeignKeyConstraint(['username'], ['users.username'], ),
    sa.PrimaryKeyConstraint('report_id', 'username')
    )
    op.create_index(op.f('ix_roles_report_id'), 'roles', ['report_id'], unique=False)
    op.create_index(op.f('ix_roles_role'), 'roles', ['role'], unique=False)
    op.create_index(op.f('ix_bugs_id'), 'bugs', ['id'], unique=False)
    op.create_index(op.f('ix_key_words_id'), 'key_words', ['id'], unique=False)
    op.create_index(op.f('ix_modules_id'), 'modules', ['id'], unique=False)
    op.create_index(op.f('ix_report_classes_id'), 'report_classes', ['id'], unique=False)
    op.create_index(op.f('ix_statuses_name'), 'statuses', ['name'], unique=False)
    op.create_index(op.f('ix_urgency_levels_level'), 'urgency_levels', ['level'], unique=False)
    op.create_index(op.f('ix_users_username'), 'users', ['username'], unique=False)
    op.create_index(op.f('ix_weights_name'), 'weights', ['name'], unique=False)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_weights_name'), table_name='weights')
    op.drop_index(op.f('ix_users_username'), table_name='users')
    op.drop_index(op.f('ix_urgency_levels_level'), table_name='urgency_levels')
    op.drop_index(op.f('ix_statuses_name'), table_name='statuses')
    op.drop_index(op.f('ix_report_classes_id'), table_name='report_classes')
    op.drop_index(op.f('ix_modules_id'), table_name='modules')
    op.drop_index(op.f('ix_key_words_id'), table_name='key_words')
    op.drop_index(op.f('ix_bugs_id'), table_name='bugs')
    op.drop_index(op.f('ix_roles_role'), table_name='roles')
    op.drop_index(op.f('ix_roles_report_id'), table_name='roles')
    op.drop_table('roles')
    op.drop_index(op.f('ix_report_keyword_association_key_word_id'), table_name='report_keyword_association')
    op.drop_table('report_keyword_association')
    op.drop_index(op.f('ix_messages_username'), table_name='messages')
    op.drop_index(op.f('ix_messages_send_date'), table_name='messages')
    op.drop_table('messages')
    op.drop_index(op.f('ix_reports_weight_name'), table_name='reports')
    op.drop_index(op.f('ix_reports_urgency_level'), table_name='reports')
    op.drop_index(op.f('ix_reports_status_name'), table_name='reports')
    op.drop_index(op.f('ix_reports_report_class'), table_name='reports')
    op.drop_index(op.f('ix_reports_module_id'), table_name='reports')
    op.drop_index(op.f('ix_reports_id'), table_name='reports')
    op.drop_index(op.f('ix_reports_bug_id'), table_name='reports')
    op.drop_table('reports')
    # ### end Alembic commands ###