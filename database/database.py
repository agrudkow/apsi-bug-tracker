from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import boto3
import os

db_name = os.environ['DB_NAME']
username = os.environ['DB_USERNAME']
password = os.environ['DB_PASSWORD']

# Get database instance endpoint
client = boto3.client('rds')
instances = client.describe_db_instances()

for db in instances["DBInstances"]:
    if db["DBName"] == db_name:
        apsidb = db
        break
else:
    db = None
    print("Database: ", db_name, " instance missing.")
    exit()

endpoint = apsidb["Endpoint"]

# Engine
SQLALCHEMY_DATABASE_URL = "mysql+pymysql://" + username + \
    ":" + password + "@" + endpoint["Address"] + "/" + db_name
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
