import logging

from index import handler

logging.basicConfig()
logger = logging.getLogger('test_get_issues')
logger.setLevel(10)


if __name__ == '__main__':
    event = {
        'pathParameters': {
            'user': 'Jeff',
            'id': 1,
        }
    }
    result = handler(event,1)

    logger.info(result)