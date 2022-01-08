from sqlalchemy.sql.expression import true
from apsi_database.database import get_db_session
from apsi_database.models import (Bug, KeyWord, Product, Report, ReportClass, Status, Urgency, User, Weight, Role,
                                  RelatedUser, Component)
from datetime import date

with get_db_session() as session:
  try:
    kw = KeyWord()
    kw.text = '1'
    session.add(kw)
    session.flush()

    weight = Weight()
    weight.name = '1'
    weight.description = '1'
    session.add(weight)
    session.flush()

    status = Status()
    status.name = '1'
    status.description = 'status ze trzeba to naprawic i tyle'
    session.add(status)
    session.flush()

    urgency = Urgency()
    urgency.level = '1'
    urgency.description = '1'
    session.add(urgency)
    session.flush()

    user = User()
    user.username = '1'
    user.name = '1'
    user.surname = '1'
    user.email = '1'
    user.phone = '1'
    user.worker = True
    session.add(user)
    session.flush()

    role = Role()
    role.id = '1'
    role.description = 'CREATOR'
    session.add(role)
    session.flush()

    bug = Bug()
    bug.description = '1'
    session.add(bug)
    session.flush()

    product = Product()
    product.name = '1'
    session.add(product)
    session.flush()

    component = Component()
    component.name = '1'
    component.description = '1'
    component.product_id = product.id
    session.add(component)
    session.flush()

    rp = ReportClass()
    rp.name = '1'
    rp.description = '1'
    session.add(rp)
    session.flush()

    report = Report()
    report.creation_date = date(1997, 12, 31)
    report.end_date = date(1997, 12, 31)
    report.deadline = date(1997, 12, 31)
    report.weight_name = '1'
    report.status_name = '1'
    report.urgency_level = '1'
    report.report_class = rp.id
    report.bug_id = bug.id
    report.product_id = product.id
    report.component_id = component.id
    report.key_words.append(kw)
    report.version = 1
    session.add(report)
    session.flush()

    related_user = RelatedUser()
    related_user.report_id = 1
    related_user.role_id = '1'
    related_user.username = '1'
    session.add(related_user)
    session.flush()

    bug = Bug()
    bug.description = '2'
    bug.parent_bug_id = 1
    session.add(bug)
    session.flush()

    report = Report()
    report.creation_date = date(1997, 12, 31)
    report.end_date = date(1997, 12, 31)
    report.deadline = date(1997, 12, 31)
    report.weight_name = '1'
    report.status_name = '1'
    report.urgency_level = '1'
    report.report_class = rp.id
    report.bug_id = bug.id
    report.product_id = product.id
    report.component_id = component.id
    report.key_words.append(kw)
    report.version = 1
    session.add(report)
    session.flush()

    related_user = RelatedUser()
    related_user.report_id = 2
    related_user.role_id = '1'
    related_user.username = '1'
    session.add(related_user)

    session.commit()
  except Exception as ex:
    print(str(ex))
