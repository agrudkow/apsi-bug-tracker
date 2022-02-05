import os
import logging
from typing import Any, Dict

from delete_problem import BugTreeException, delete_problem

logging.basicConfig()
logger = logging.getLogger('delete_problem')
logger.setLevel(int(os.environ['LOG_LEVEL']))

logger.info('APSI delete_problem lambda initialized.')


def handler(event: Dict[str, Any], _):
    """
    Handler for delete_problem lambda.
    Requires id in pathParameters.
    """
    try:
        delete_problem(int(event['pathParameters']['id']))
    except BugTreeException as ex:
        logger.error(ex, stack_info=True)
        return {
            'statusCode': 400,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': True,
            },
            'msg': str(ex)
        }
    except Exception as ex:
        logger.error(ex, stack_info=True)
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': True,
            },
            'msg': str(ex)
        }

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': True,
        },
    }
