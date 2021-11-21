import os
import json
import logging
import pymysql  # type: ignore
from typing import Any, Dict

# Get DB credentials
rds_host = os.environ['DB_HOST']
username = os.environ['DB_USERNAME']
password = os.environ['DB_PASSWORD']
db_name = os.environ['DB_NAME']

logging.basicConfig()
logger = logging.getLogger('get_issues')
logger.setLevel(int(os.environ['LOG_LEVEL']))

logger.info('APSI lambda initialized.')

# Establish connection with RDS MySQL database
try:
  conn = pymysql.connect(
      host=rds_host,
      user=username,
      passwd=password,
      db=db_name,
      connect_timeout=5,
  )
except pymysql.MySQLError as err:
  logger.error("ERROR: Could not connect to MySQL Instance.")
  logger.error(err)
  raise err


def handler(event: Dict[str, Any], _):
  logger.debug(json.dumps(event))
  """
    Lambda handler to get all contents from zgłoszenia table
  """
  records = []
  with conn.cursor() as cur:
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
      'body': json.dumps(records),
  }
