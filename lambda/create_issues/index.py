import os
import json
import logging
from datetime import date
from typing import Any, Dict

from apsi_database.database import get_db_session
from apsi_database.model import Report

logging.basicConfig()
logger = logging.getLogger('get_issues')
logger.setLevel(int(os.environ['LOG_LEVEL']))

logger.info('Create issue lambda initialized.')


def handler(event: Dict[str, Any], _):
  """
    Create raport
  """
  # TODO: get params from event
  logger.debug(json.dumps(event))
  with get_db_session() as session:
    report = Report()
    report.id = '1'
    report.creation_date = date(1997, 12, 31)
    report.end_date = date(1997, 12, 31)
    report.deadline = date(1997, 12, 31)
    report.weight_name = '1'
    report.status_name = '1'
    report.urgency_level = '1'
    report.report_class = '1',
    report.bug_id = '1'
    report.module_id = '1'

    session.add(report)
    session.commit()
  return {
      'statusCode': 200,
      'body': json.dumps({'id': report.id}),
  }
