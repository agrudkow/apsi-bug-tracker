import json
import logging
import os

from index import handler

logging.basicConfig()
logger = logging.getLogger('test_create_issue')
logger.setLevel(int(os.environ['LOG_LEVEL']))

if __name__ == '__main__':
    result = handler(
        {
            'pathParameters': {
                'id': 3
            },
            'body':
                json.dumps({
                    'description': 'Update',
                    'username': 'Jan',
                    'responsiblePerson': 'Kasia',
                    'observers': ', '.join(['Kasia, Jeff, Jan']),
                    'proposedDeadline': '2022-03-19',
                    'weight': 'Minor',
                    'status': 'New',
                    'urgency': '1',
                    'problemType': 'Bug',
                    'product': '1',
                    'component': '1',
                    'keywords': ', '.join([
                        'output',
                        'runtime',
                        'xdddd'
                    ]),
                    'relatedProblems': '1',
                })
        }, 1)

    logger.info(result)
