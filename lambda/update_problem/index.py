import os
import json
import logging
from typing import Any, Dict

import boto3
from dacite import MissingValueError, from_dict

from update_problem import update_problem, UpdateProblemData

logging.basicConfig()
logger = logging.getLogger('update_issue')
logger.setLevel(int(os.environ['LOG_LEVEL']))

logger.info('Update problem lambda initialized.')

SEND_EMAIL_LAMBDA = os.environ['SEND_EMAIL_LAMBDA']
client = boto3.client('lambda')


def handler(event: Dict[str, Any], _):
    """
    Update problem
    """
    logger.debug(json.dumps(event))
    reqest_body = json.loads(event['body'])
    try:
        report_id, email_recipients = update_problem(
            problem_id=int(event['pathParameters']['id']),
            data=from_dict(data_class=UpdateProblemData, data=reqest_body),
            logger=logger,
        )
        logger.info(f'Problem with id {report_id} updated')
        logger.info(f'Sending email notification to users: {str(email_recipients)}')
        # TODO: send proper email notification content
        client.invoke(
            FunctionName=SEND_EMAIL_LAMBDA,
            InvocationType='Event',
            Payload=json.dumps({
                'recipients': email_recipients,
                'issue': report_id,
                'msg': 'TODO: add proper message'
            }),
        )
    except (ValueError, MissingValueError) as ex:
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
        'body': json.dumps({'report_id': report_id})
    }
