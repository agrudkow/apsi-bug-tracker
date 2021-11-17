import os
import sys
import json
import time
import logging
import pymysql
from typing import Any, Dict

# Get DB credentials
rds_host = ''
username = ''
password = ''
db_name = 'apsidb'

logging.basicConfig()
logger = logging.getLogger('APSI_lamda')
logger.setLevel(int(os.environ['LOG_LEVEL']))

logger.info('APSI lambda initialized.')

# Establish connection with RDS MySQL database 
try:
    conn = pymysql.connect(
        host=rds_host,
        user=username,
        passwd=password,
        db=db_name,
        connect_timeout=5)
except pymysql.MySQLError as err:
    logger.error("ERROR: Could not connect to MySQL Instance.")
    logger.error(err)
    sys.exit()

logger.info("SUCCESS: Successful connection to RDS MySQL instance.")


def lambda_handler(event: Dict[str, Any], context):
    logger.debug(json.dumps(event))
    """
    Lambda handler to get all contents from zgloszenia table
    """
    if event.get('path') != "/zgloszenia/":
        err_msg = 'Invalid path to resource.'
        logger.error(err_msg)
        return {
            'statusCode': 422,
            'body': err_msg,
        }
    
    records = []
    with conn.cursor() as cur:
        cur.execute("""
        CREATE TABLE IF NOT EXISTS zgloszenia (
        nr_zgloszenia    CHAR(6) NOT NULL,
        data_utworzenia  DATETIME NOT NULL,
        data_zamkniecia  DATETIME,
        termin           DATETIME,
        waga             VARCHAR(15) NOT NULL,
        status           VARCHAR(15) NOT NULL,
        pilnosc          CHAR(1) NOT NULL,
        kod_rodzaju      CHAR(1) NOT NULL,
        id_bledu         VARCHAR(10),
        id_modulu        CHAR(3)
);
        """)
        cur.execute("delete from zgloszenia")
        cur.execute("insert into zgloszenia (nr_zgloszenia, data_utworzenia, data_zamkniecia, termin, waga, status, pilnosc, kod_rodzaju, id_bledu, id_modulu)"
        "values ('002137', '1753-01-01 13:40:08', '1753-02-01 01:12:45', '1753-02-01 14:01:20', 'KRYTYCZNY', 'ROZWIAZANY', '1', '2', '665', '322')")
        cur.execute("insert into zgloszenia (nr_zgloszenia, data_utworzenia, data_zamkniecia, termin, waga, status, pilnosc, kod_rodzaju, id_bledu, id_modulu)"
        "values ('002138', '1939-09-01 19:01:13', '1945-09-02 21:12:15', '1953-03-05 21:37:00', 'NORMALNY', 'NIEPOTWIERDZONY', '1', '2', '666', '325')")
        cur.execute("insert into zgloszenia (nr_zgloszenia, data_utworzenia, data_zamkniecia, termin, waga, status, pilnosc, kod_rodzaju, id_bledu, id_modulu)"
        "values ('002139', '1795-10-24 15:12:18', '1800-02-11 22:11:40', '2009-07-01 17:15:15', 'BLOKUJACY', 'POTWIERDZONY', '1', '2', '667', '322')")
        cur.execute("insert into zgloszenia (nr_zgloszenia, data_utworzenia, data_zamkniecia, termin, waga, status, pilnosc, kod_rodzaju, id_bledu, id_modulu)"
        "values ('002140', '1992-04-27 12:35:47', '2001-05-01 23:12:15', '2010-07-19 18:12:34', 'MALO ISTOTNY', 'ZDIAGNOZOWANY', '1', '2', '668', '122')")
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
