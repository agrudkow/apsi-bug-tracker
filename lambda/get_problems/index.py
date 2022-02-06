import os
import json
import logging
from typing import Any, Dict

from get_issues import get_issues

logging.basicConfig()
logger = logging.getLogger('get_issues')
logger.setLevel(int(os.environ['LOG_LEVEL']))
# logger.setLevel(10)

logger.info('APSI get_issues lambda initialized.')


def handler(event: Dict[str, Any], _):
  """
  Handler for get_issues lambda.
  """
  logger.debug(json.dumps(event))
  return {
      'statusCode': 200,
      'headers': {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': True,
      },
      'body': json.dumps(get_issues(str(event['pathParameters']['user']))),
  }
