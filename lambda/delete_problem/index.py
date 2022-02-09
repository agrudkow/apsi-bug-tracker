import os
import json
import logging
from typing import Any, Dict

import boto3
# from dacite import MissingValueError

from delete_problem import BugTreeException, delete_problem

logging.basicConfig()
logger = logging.getLogger('delete_problem')
logger.setLevel(int(os.environ['LOG_LEVEL']))

logger.info('APSI delete_problem lambda initialized.')

SEND_EMAIL_LAMBDA = os.environ['SEND_EMAIL_LAMBDA']
client = boto3.client('lambda')

def handler(event: Dict[str, Any], _):
    """
    Handler for delete_problem lambda.
    Requires id in pathParameters.
    """
    try:
        report_id, email_recipients = delete_problem(int(event['pathParameters']['id']))
        logger.info(f'Deleted problem with id {report_id}')
        logger.info(f'Sending email notification to users: {str(email_recipients)}')
        client.invoke(
            FunctionName=SEND_EMAIL_LAMBDA,
            InvocationType='Event',
            Payload=json.dumps({
                'recipients': email_recipients,
                'issue': report_id,
                'type': 'delete',
                'msg': f'Report with ID {report_id} deleted.'
            }),
        )
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
