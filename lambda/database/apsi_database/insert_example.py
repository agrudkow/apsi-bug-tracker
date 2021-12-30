from apsi_database.database import get_db_session
from apsi_database.models import (
    Bug,
    KeyWord,
    Module,
    Report,
    ReportClass,
    Status,
    Urgency,
    User,
    Weight,
)
from datetime import date

kw = KeyWord()
kw.id = '1'
kw.text = '1'

weight = Weight()
weight.name = '1'
weight.meaning = '1'

status = Status()
status.name = '1'
status.meaning = 'status ze trzeba to naprawic i tyle'

urgency = Urgency()
urgency.level = '1'
urgency.meaning = '1'

user = User()
user.username = '1'
user.name = '1'
user.surname = '1'
user.email = '1'
user.phone = '1'
user.worker = '1'

bug = Bug()
bug.id = '1'
bug.description = '1'

module = Module()
module.id = '1'
module.name = '1'

rp = ReportClass()
rp.id = '1'
rp.name = '1'
rp.description = '1'

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

with get_db_session() as session:
  try:
    session.add(kw)
    session.add(weight)
    session.add(status)
    session.add(urgency)
    session.add(user)
    session.add(bug)
    session.add(module)
    session.add(rp)
    session.add(report)
    session.commit()
  except Exception:
    print("Can not add.")
