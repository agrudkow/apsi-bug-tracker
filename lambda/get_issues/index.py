import os
import json
import logging
from typing import Any, Dict

from get_issues import get_issues

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
      'headers': {
          'Access-Control-Allow-Origin': '*',  # Required for CORS support to work
          'Access-Control-Allow-Credentials': True  # Required for cookies, authorization headers with HTTPS 
      },
      'body': json.dumps(get_issues()),
  }
