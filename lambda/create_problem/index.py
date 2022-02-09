import os
import json
import logging
from typing import Any, Dict

import boto3
from dacite import MissingValueError, from_dict

from create_problem import create_problem, CreateProblemData

logging.basicConfig()
logger = logging.getLogger('create_issue')
logger.setLevel(int(os.environ['LOG_LEVEL']))

logger.info('Create problem lambda initialized.')
SEND_EMAIL_LAMBDA = os.environ['SEND_EMAIL_LAMBDA']
client = boto3.client('lambda')

def handler(event: Dict[str, Any], _):
    """
    Create problem
    """
    logger.debug(json.dumps(event))
    reqest_body = json.loads(event['body'])
    try:
        report_id, email_recipients = create_problem(
            data=from_dict(data_class=CreateProblemData, data=reqest_body),
            logger=logger,
        )
        logger.info(f'Problem with id {report_id} created')
        logger.info(f'Sending email notification to users: {str(email_recipients)}')
        client.invoke(
            FunctionName=SEND_EMAIL_LAMBDA,
            InvocationType='Event',
            Payload=json.dumps({
                'recipients': email_recipients,
                'issue': report_id,
                'type': 'create',
                'msg': f'Created report with ID {report_id}.'
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

# if __name__ == '__main__':
#     result = handler(
#         {
#             'body':
#                 json.dumps({
#                     'description': 'Test desc',
#                     'username': 'Jan',
#                     'responsiblePerson': 'Kasia',
#                     'observers': ', '.join(['Jeff']),
#                     'proposedDeadline': '2022-03-19',
#                     'weight': 'Minor',
#                     'status': 'New',
#                     'urgency': '1',
#                     'problemType': 'Bug',
#                     'product': '1',
#                     'component': '1',
#                     'keywords': ', '.join([
#                         'output',
#                         'runtime',
#                     ]),
#                     'relatedProblems': '3',
#                 })
#         }, 1)

#     logger.info(result)
