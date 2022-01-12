import json
import boto3

def handler(event, context):
    values = eval(event["body"])
    client = boto3.client('ses')
    response = client.send_email(
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
                'Data': f'Zgłoszenie {values["issue"]} zostało zmodyfikowane.\nZespół BugTracker',
                'Charset': 'UTF-8',
            }
        }
    }
)
    print('request: {}'.format(json.dumps(event)))
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'test/plain'
        },
        'body': 'Email notification sent successfully'
    }