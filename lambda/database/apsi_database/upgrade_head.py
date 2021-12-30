import alembic.config


def upgrade_head():
  alembicArgs = [
      '-c apsi_database/alembic.ini'
      'upgrade',
      'head',
  ]
  alembic.config.main(argv=alembicArgs)
