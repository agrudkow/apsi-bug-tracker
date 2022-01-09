import os
import json
import logging
from typing import Any, Dict

from get_problem_by_id import get_problem_by_id

logging.basicConfig()
logger = logging.getLogger('get_problems')
logger.setLevel(int(os.environ['LOG_LEVEL']))

logger.info('APSI get_problems lambda initialized.')

def handler(event: Dict[str, Any], _):
    """
    Handler for get_problem_by_id lambda.
    Requires id in pathParameters.
    """
    return {
        'statusCode': 200,
        'headers': {
          'Access-Control-Allow-Origin': '*',  # Required for CORS support to work
          'Access-Control-Allow-Credentials': True  # Required for cookies, authorization headers with HTTPS 
        },
        'body': json.dumps(get_problem_by_id(event['pathParameters']['id'])),
    }
