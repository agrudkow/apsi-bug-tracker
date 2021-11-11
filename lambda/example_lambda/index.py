import json
import logging
import os
from typing import Any, Dict

logging.basicConfig()
logger = logging.getLogger('example_lambda')
logger.setLevel(int(os.environ['LOG_LEVEL']))

logger.info('Lambda initialized.')


def handler(event: Dict[str, Any], _):
  logger.debug(json.dumps(event))

  if event.get('pathParameters') is None:
    err_msg = '`id` not provided in path parameters.'
    logger.error(err_msg)
    return {
        'statusCode': 422,
        'body': err_msg,
    }

  return {
      'statusCode':
          200,
      'body':
          json.dumps({
              'id': event['pathParameters']['id'],
              'path': event['path'],
              'httpMethod': event['httpMethod'],
          }),
  }
