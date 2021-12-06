from sqlalchemy import insert
from database import *
from model import *
from datetime import date
from sqlalchemy import select

session = SessionLocal()

kw = KeyWord()
kw.id = '1'
kw.text = '1'
session.add(kw)

weight = Weight()
weight.name = '1'
weight.meaning = '1'
session.add(weight)

status = Status()
status.name = '1'
status.meaning = 'status ze trzeba to naprawic i tyle'
session.add(status)

urgency = Urgency()
urgency.level = '1'
urgency.meaning = '1'
session.add(urgency)

user = User()
user.username = '1'
user.name = '1'
user.surname = '1'
user.email = '1'
user.phone = '1'
user.worker = '1'
session.add(user)

bug = Bug()
bug.id = '1'
bug.description = '1'
session.add(bug)

module = Module()
module.id = '1'
module.name = '1'
session.add(module)

rp = ReportClass()
rp.id = '1'
rp.name = '1'
rp.description = '1'
session.add(rp)

report = Report()
report.id = '1'
report.creation_date = date(1997, 12, 31)
report.end_date = date(1997, 12, 31)
report.deadline = date(1997, 12, 31)
report.weight_name = '1'
report.status_name = '1'
report.urgency_level = '1'
report.report_class = '1',
report.bug_id = '1'
report.module_id = '1'

session.add(report)
session.commit()
session.close()
