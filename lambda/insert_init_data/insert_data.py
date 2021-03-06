from datetime import date

from apsi_database.database import get_db_session
from apsi_database.models import (
    Bug,
    KeyWord,
    Product,
    Report,
    ReportClass,
    Status,
    Urgency,
    User,
    Weight,
    Role,
    RelatedUser,
    Component,
)


def insert_data() -> int:
  with get_db_session() as session:
    try:
      kw = KeyWord()
      kw.text = 'output'
      session.add(kw)
      session.flush()

      weights = []

      weight = Weight()
      weight.name = 'Minor'
      weight.description = 'This problem is of minor importance.'
      session.add(weight)
      session.flush()
      weights.append(weight)

      weight_2 = Weight()
      weight_2.name = 'Critical'
      weight_2.description = 'This problem is critical.'
      session.add(weight_2)
      session.flush()
      weights.append(weight_2)

      weight_3 = Weight()
      weight_3.name = 'Blocking'
      weight_3.description = 'This problem is blocking.'
      session.add(weight_3)
      session.flush()
      weights.append(weight_3)

      weight_4 = Weight()
      weight_4.name = 'High'
      weight_4.description = 'This problem is of high importance.'
      session.add(weight_4)
      session.flush()
      weights.append(weight_4)

      weight_5 = Weight()
      weight_5.name = 'Normal'
      weight_5.description = 'This problem is of normal importance.'
      session.add(weight_5)
      session.flush()
      weights.append(weight_5)

      statuses = []

      status = Status()
      status.name = 'New'
      status.description = 'The problem that has just been submitted.'
      session.add(status)
      session.flush()
      statuses.append(status)

      status_2 = Status()
      status_2.name = 'Assigned'
      status_2.description = 'The problem is assigned.'
      session.add(status_2)
      session.flush()
      statuses.append(status_2)

      status_3 = Status()
      status_3.name = 'Analyzed'
      status_3.description = 'The problem is analyzed.'
      session.add(status_3)
      session.flush()
      statuses.append(status_3)

      status_4 = Status()
      status_4.name = 'Diagnosed'
      status_4.description = 'The problem is diagnosed.'
      session.add(status_4)
      session.flush()
      statuses.append(status_4)

      status_5 = Status()
      status_5.name = 'Undiagnosed'
      status_5.description = 'The problem is undiagnosed.'
      session.add(status_5)
      session.flush()
      statuses.append(status_5)

      status_6 = Status()
      status_6.name = 'Resolved'
      status_6.description = 'The problem is resolved.'
      session.add(status_6)
      session.flush()
      statuses.append(status_6)

      status_7 = Status()
      status_7.name = 'Unresolved'
      status_7.description = 'The problem is unresolved.'
      session.add(status_7)
      session.flush()
      statuses.append(status_7)

      urgencies = []

      urgency = Urgency()
      urgency.level = '1'
      urgency.description = 'This problem is very urgent.'
      session.add(urgency)
      session.flush()
      urgencies.append(urgency)

      urgency_2 = Urgency()
      urgency_2.level = '2'
      urgency_2.description = 'This problem is urgent.'
      session.add(urgency_2)
      session.flush()
      urgencies.append(urgency)

      urgency_3 = Urgency()
      urgency_3.level = '3'
      urgency_3.description = 'This problem has normal priority.'
      session.add(urgency_3)
      session.flush()
      urgencies.append(urgency_3)

      urgency_4 = Urgency()
      urgency_4.level = '4'
      urgency_4.description = 'This problem is not very urgent.'
      session.add(urgency_4)
      session.flush()
      urgencies.append(urgency_4)

      urgency_5 = Urgency()
      urgency_5.level = '5'
      urgency_5.description = 'This problem is not urgent.'
      session.add(urgency_5)
      session.flush()
      urgencies.append(urgency_5)

      role_creator = Role()
      role_creator.id = '1'
      role_creator.description = 'CREATOR'
      session.add(role_creator)
      session.flush()

      role_observer = Role()
      role_observer.id = '2'
      role_observer.description = 'OBSERVER'
      session.add(role_observer)
      session.flush()

      role_rp = Role()
      role_rp.id = '3'
      role_rp.description = 'RESPONSIBLE_PERSON'
      session.add(role_rp)
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

      component = Component()
      component.name = 'Database'
      component.description = 'This is the database of PetApp'
      component.product_id = product.id
      session.add(component)
      session.flush()

      rp = ReportClass()
      rp.name = 'Bug'
      rp.description = "It's not a bug, it's a feature"
      session.add(rp)
      session.flush()

      rp = ReportClass()
      rp.name = 'Incident'
      rp.description = "It's a incident"
      session.add(rp)
      session.flush()

      rp = ReportClass()
      rp.name = 'Service'
      rp.description = "It's a service"
      session.add(rp)
      session.flush()

      user = User()
      user.username = 'jankowalski.bugtracker'
      user.name = 'Jan'
      user.surname = 'Kowalski'
      user.email = 'jankowalski.bugtracker@gmail.com'
      user.phone = '123456789'
      user.worker = True
      session.add(user)
      session.flush()

      user_2 = User()
      user_2.username = "malinowska.kasia"
      user_2.name = "Kasia"
      user_2.surname = "Malinowska"
      user_2.email = "malinowska.kasia@protonmail.com"
      user_2.phone = "987654321"
      user_2.worker = True
      session.add(user_2)
      session.flush()

      user_3 = User()
      user_3.username = "jeffbezos.bugtracker"
      user_3.name = "Jeff"
      user_3.surname = "Bezos"
      user_3.email = "jeffbezos.bugtracker@protonmail.com"
      user_3.phone = "987654322"
      user_3.worker = True
      session.add(user_3)
      session.flush()

      user_4 = User()
      user_4.username = "elonmusk.bugtracker"
      user_4.name = "Elon"
      user_4.surname = "Musk"
      user_4.email = "elonmusk.bugtracker@protonmail.com"
      user_4.phone = "887654322"
      user_4.worker = True
      session.add(user_4)
      session.flush()

      user_5 = User()
      user_5.username = "billgates.bugtracker"
      user_5.name = "Bill"
      user_5.surname = "Gates"
      user_5.email = "billgates.bugtracker@op.pl"
      user_5.phone = "787654322"
      user_5.worker = True
      session.add(user_5)
      session.flush()

      user_6 = User()
      user_6.username = "aduda.bugtracker"
      user_6.name = "Andrzej"
      user_6.surname = "Duda"
      user_6.email = "aduda.bugtracker@op.pl"
      user_6.phone = "787644322"
      user_6.worker = True
      session.add(user_6)
      session.flush()

      user_7 = User()
      user_7.username = "sjobs.bugtracker"
      user_7.name = "Steve"
      user_7.surname = "Jobs"
      user_7.email = "sjobs.bugtracker@op.pl"
      user_7.phone = "787643322"
      user_7.worker = True
      session.add(user_7)
      session.flush()

      user_8 = User()
      user_8.username = "admin.bugtracker"
      user_8.name = "Admin"
      user_8.surname = "BugtrackerTeam"
      user_8.email = "admin.bugtracker@protonmail.com"
      user_8.phone = "782243322"
      user_8.worker = True
      session.add(user_8)
      session.flush()

      report = Report()
      report.creation_date = date(2022, 1, 10)
      report.updated_date = date(2022, 1, 10)
      report.end_date = date(2022, 3, 19)
      report.deadline = date(2022, 3, 19)
      report.weight_name = weight.name
      report.status_name = status.name
      report.urgency_level = urgency.level
      report.report_class_id = rp.id
      report.bug_id = bug.id
      # report.product_id = product.id
      # report.component_id = component.id
      report.key_words.append(kw)
      report.version = 1
      session.add(report)
      session.flush()

      product = Product()
      product.name = 'SmartPet'
      session.add(product)
      session.flush()

      related_user_observer = RelatedUser()
      related_user_observer.report_id = report.id
      related_user_observer.role_id = role_creator.id
      related_user_observer.username = user.username
      session.add(related_user_observer)

      related_user_creator = RelatedUser()
      related_user_creator.report_id = report.id
      related_user_creator.role_id = role_observer.id
      related_user_creator.username = user_2.username
      session.add(related_user_creator)

      related_user_rp = RelatedUser()
      related_user_rp.report_id = report.id
      related_user_rp.role_id = role_rp.id
      related_user_rp.username = user_3.username
      session.add(related_user_rp)

      session.commit()

      return report.id
    except Exception as ex:
      print(str(ex))
      raise ex
