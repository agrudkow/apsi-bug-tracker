from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import boto3
import os
from pydantic import BaseSettings, Field

# Get credentials from .env file


class DBCreds(BaseSettings):
    db_name: str = Field(..., env='DB_NAME')
    db_username: str = Field(..., env='DB_USERNAME')
    db_password: str = Field(..., env='DB_PASSWORD')

    class Config:
        env_file = "credentials.env"
        env_file_encoding = 'utf-8'


db_creds = DBCreds()

# Get database instance endpoint
client = boto3.client('rds')
instances = client.describe_db_instances()

apsidb = None
for db in instances["DBInstances"]:
    if db["DBName"] == db_creds.db_name:
        apsidb = db
        break
else:
    print("Database: ", db_creds.db_name, " instance missing.")
    exit()

endpoint = apsidb["Endpoint"]

# Engine
SQLALCHEMY_DATABASE_URL = "mysql+pymysql://" + db_creds.db_username + \
    ":" + db_creds.db_password + "@" + \
    endpoint["Address"] + "/" + db_creds.db_name
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
