import os
import json
import logging
from datetime import date
from typing import Any, Dict

from sqlalchemy.sql.expression import true
from apsi_database.database import get_db_session
from apsi_database.models import (Bug, KeyWord, Product, Report, ReportClass, Status, Urgency, User, Weight, Role,
                                  RelatedUser, Component, component, related_user, status, urgency, weight)
logging.basicConfig()
logger = logging.getLogger('get_issues')
logger.setLevel(int(os.environ['LOG_LEVEL']))

logger.info('Create issue lambda initialized.')


def handler(event: Dict[str, Any], _):
  """
    Create raport
  """
  # TODO: get params from event
  logger.debug(json.dumps(event))
  with get_db_session() as session:
    try:
      kw = KeyWord()
      kw.text = 'output'
      session.add(kw)
      session.flush()

      weight = Weight()
      weight.name = 'Minor'
      weight.description = 'This problem is of minor importance.'
      session.add(weight)
      session.flush()

      status = Status()
      status.name = 'New'
      status.description = 'A problem that has just been submitted.'
      session.add(status)
      session.flush()

      urgency = Urgency()
      urgency.level = '1'
      urgency.description = 'This problem is not urgent.'
      session.add(urgency)
      session.flush()

      user = User()
      user.username = 'Jan'
      user.name = 'Jan'
      user.surname = 'Kowalski'
      user.email = 'kowalski@please.dont.mail.me'
      user.phone = '123456789'
      user.worker = True
      session.add(user)
      session.flush()

      role = Role()
      role.id = '1'
      role.description = 'CREATOR'
      role.related_users = user # TODO: check
      session.add(role)
      session.flush()

      bug = Bug()
      bug.description = "I can't get the proper output"
      session.add(bug)
      session.flush()

      product = Product()
      product.name = 'PetApp'
      session.add(product)
      session.flush()

      component = Component()
      component.name = 'Interface'
      component.description = 'This is the interface of PetApp'
      component.product_id = product.id
      session.add(component)
      session.flush()

      rp = ReportClass()
      rp.name = 'Bug'
      rp.description = "It's not a bug, it's a feature"
      session.add(rp)
      session.flush()

      report = Report()
      report.creation_date = date(2022, 1, 10)
      report.end_date = date(2022, 3, 19)
      report.deadline = date(2022, 3, 19)
      report.weight_name = weight.name
      report.status_name = status.name
      report.urgency_level = urgency.level
      report.report_class = rp.id
      report.bug_id = bug.id
      report.product_id = product.id
      report.component_id = component.id
      report.key_words.append(kw)
      report.version = '1.2.1'
      session.add(report)
      session.flush()

      observer = User()
      observer.username = "Kasia"
      observer.name = "Kasia"
      observer.surname = "Malinowska"
      observer.email = "malinowska@please.dont.mail.me"
      observer.phone = "987654321"
      observer.worker = True
      session.add(observer)
      # session.flush()

      related_user = RelatedUser()
      related_user.report_id = report.id
      related_user.role_id = role.id
      related_user.username = observer.name
      session.add(related_user)

      session.commit()
    except Exception as ex:
      print(str(ex))

    session.commit()
  return {
      'statusCode': 200,
      'body': json.dumps({'id': report.id}),
  }
