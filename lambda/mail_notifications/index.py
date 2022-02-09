import json
import logging
import os
from pyexpat.errors import messages

import boto3

logging.basicConfig()
logger = logging.getLogger('mailer_lambda')
logger.setLevel(int(os.environ['LOG_LEVEL']))

logger.info('Lambda initialized.')


def handler(event, _):
    logger.debug('request: {}'.format(json.dumps(event)))
    # values = eval(event["body"])
    values = event
    try:
        client = boto3.client('ses')

        if values["type"] == "update":
                message_val = f'Zgłoszenie {values["issue"]} zostało zmodyfikowane.\nZespół BugTracker'
        else:
            message_val = f'Utworzono zgłoszenie {values["issue"]}.\nZespół BugTracker.'

        client.send_email(
            Source='apsibugtracker@gmail.com',
            Destination={
                'ToAddresses': values["recipients"],
                'CcAddresses': [],
                'BccAddresses': []
            },
            Message={
                'Subject': {
                    'Data': f'Zgłoszenie {values["issue"]}',
                    'Charset': 'UTF-8'
                },
                'Body': {
                    'Text': {
                        'Data':
                        message_val,
                        'Charset': 'UTF-8',
                    }
                }
            })
    except KeyError as ex:
        logger.error(str(ex))
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'test/plain'
            },
            'body': str(ex)
        }
    except Exception as ex:
        logger.error(str(ex))
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'test/plain'
            },
            'body': str(ex)
        }

    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'test/plain'
        },
        'body': 'Email notification sent successfully'
    }
