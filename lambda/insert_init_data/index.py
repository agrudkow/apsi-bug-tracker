import os
import json
import logging
from typing import Any, Dict

from insert_data import insert_data

logging.basicConfig()
logger = logging.getLogger('insert_init_data')
logger.setLevel(int(os.environ['LOG_LEVEL']))

logger.info('Insert initial data lambda initialized.')


def handler(event: Dict[str, Any], _):
    """
    Insert initial data
    """
    logger.debug(json.dumps(event))
    try:
        report_id = insert_data()
        logger.info(f'Issue with id {report_id} created')
    except Exception as ex:
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
        'body': json.dumps({'report_id': report_id})
    }
