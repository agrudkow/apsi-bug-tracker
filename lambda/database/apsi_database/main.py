from apsi_database.model import Base
from apsi_database.database import engine

Base.metadata.create_all(bind=engine)
