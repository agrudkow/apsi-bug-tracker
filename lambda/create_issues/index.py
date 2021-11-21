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

print(f'{rds_host=} {username=} {password=} {db_name=}')

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
    cur.execute(
        "insert into zgloszenia (nr_zgloszenia, data_utworzenia, data_zamkniecia, termin, waga, status, pilnosc, kod_rodzaju, id_bledu, id_modulu)"
        "values ('002137', '1753-01-01 13:40:08', '1753-02-01 01:12:45', '1753-02-01 14:01:20', 'KRYTYCZNY', 'ROZWIAZANY', '1', '2', '665', '322')"
    )
    cur.execute(
        "insert into zgloszenia (nr_zgloszenia, data_utworzenia, data_zamkniecia, termin, waga, status, pilnosc, kod_rodzaju, id_bledu, id_modulu)"
        "values ('002138', '1939-09-01 19:01:13', '1945-09-02 21:12:15', '1953-03-05 21:37:00', 'NORMALNY', 'NIEPOTWIERDZONY', '1', '2', '666', '325')"
    )
    cur.execute(
        "insert into zgloszenia (nr_zgloszenia, data_utworzenia, data_zamkniecia, termin, waga, status, pilnosc, kod_rodzaju, id_bledu, id_modulu)"
        "values ('002139', '1795-10-24 15:12:18', '1800-02-11 22:11:40', '2009-07-01 17:15:15', 'BLOKUJACY', 'POTWIERDZONY', '1', '2', '667', '322')"
    )
    cur.execute(
        "insert into zgloszenia (nr_zgloszenia, data_utworzenia, data_zamkniecia, termin, waga, status, pilnosc, kod_rodzaju, id_bledu, id_modulu)"
        "values ('002140', '1992-04-27 12:35:47', '2001-05-01 23:12:15', '2010-07-19 18:12:34', 'MALO ISTOTNY', 'ZDIAGNOZOWANY', '1', '2', '668', '122')"
    )
    conn.commit()

  return {'statusCode': 200}
