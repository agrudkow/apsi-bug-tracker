import json
import logging
import os

import boto3

logging.basicConfig()
logger = logging.getLogger('mailer_lambda')
logger.setLevel(int(os.environ['LOG_LEVEL']))

logger.info('Lambda initialized.')


def handler(event, _):
    logger.debug('request: {}'.format(json.dumps(event)))
    values = eval(event["body"])
    try:
        client = boto3.client('ses')

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
                        f'Zgłoszenie {values["issue"]} zostało zmodyfikowane.\nZespół BugTracker',
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