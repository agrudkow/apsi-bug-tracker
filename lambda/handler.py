import os
import sys
import json
import boto3
import time
import logging
import pymysql
from typing import Any, Dict

client = boto3.client('secretsManager')

response = client.get_secret_value(
    SecretID=''
)

secretDict = json.loads(response['SecretString'])

# rds_host = ''
# username = ''
# password = ''
# db_name = ''

logging.basicConfig()
logger = logging.getLogger('APSI_lamda')
logger.setLevel(int(os.environ['LOG_LEVEL']))

logger.info('APSI lambda initialized.')

# Establish connection with RDS MySQL database 
try:
    conn = pymysql.connect(
        host=secretDict['host'], 
        user=secretDict['username'], 
        passwd=secretDict['password'], 
        db=secretDict['dbname'], 
        connect_timeout=5)
except pymysql.MySQLError as err:
    logger.error("ERROR: Could not connect to MySQL Instance.")
    logger.error(err)
    sys.exit()

logger.info("SUCCESS: Successful connection to RDS MySQL instance.")


def lambda_handler(event: Dict[str, Any], context):
    """
    Lambda handler to get all contents from zgloszenia table
    """

    logger.debug(json.dumps(event))

    if event.get('pathParameters') is None:
        err_msg = '`id` not provided in path parameters.'
        logger.error(err_msg)
        return {
            'statusCode': 422,
            'body': err_msg,
        }

    records = []
    with conn.cursor() as cur:
        cur.execute("delete from zgloszenia")
        cur.execute("insert into zgloszenia (nr_zgloszenia, data_utworzenia, data_zamkniecia, termin, waga, status, pilnosc, kod_rodzaju, id_bledu, id_modulu)"
        "values ('666', '1753-01-01 00:00:00', '1753-01-01 00:00:00', '1753-01-01 00:00:00', 'KRYTYCZNY', 'NOWY', '1', '2', '665', '322')")
        conn.commit()
        cur.execute("select * from zgloszenia")
        
        for row in cur:
            record = {
                    'nr_zgloszenia': row[0],
                    'data_utworzenia': str(row[1]),
                    'data_zamkniecia': str(row[2]),
                    'termin': str(row[3]),
                    'waga': row[4],
                    'status': row[5],
                    'pilnosc': row[6],
                    'kod_rodzaju': row[7],
                    'id_bledu': row[8],
                    'id_modulu': row[9],
                }
            records.append(record)
           
    return {
        'statusCode': 200,
        'body' : records
    }
