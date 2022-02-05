import logging
import os

from index import handler

logging.basicConfig()
logger = logging.getLogger('test_delete_problem')
logger.setLevel(int(os.environ['LOG_LEVEL']))

if __name__ == '__main__':
    result = handler({
        'pathParameters': {
            'id': 4
        },
    }, None)

    logger.info(result)
