import os
import json
import logging
from typing import Any, Dict

from get_issues import get_issues
from lambda_parser import date_to_json

logging.basicConfig()
logger = logging.getLogger('get_issues')
logger.setLevel(int(os.environ['LOG_LEVEL']))

logger.info('APSI get_issues lambda initialized.')

def handler(event: Dict[str, Any], _):
  """
  Handler for get_issues lambda.
  
  """
  return {
      'statusCode': 200,
      'body': json.dumps(get_issues(), default=date_to_json),
  }