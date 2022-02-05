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

            rp = ReportClass()
            rp.name = 'Bug'
            rp.description = "It's not a bug, it's a feature"
            session.add(rp)
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
            report.product_id = product.id
            report.component_id = component.id
            report.key_words.append(kw)
            report.version = 1
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
            session.flush()

            responsible_person = User()
            responsible_person.username = "Jeff"
            responsible_person.name = "Jeff"
            responsible_person.surname = "Bezos"
            responsible_person.email = "jeff@please.dont.mail.me"
            responsible_person.phone = "987654322"
            responsible_person.worker = True
            session.add(responsible_person)
            session.flush()

            related_user_observer = RelatedUser()
            related_user_observer.report_id = report.id
            related_user_observer.role_id = role_creator.id
            related_user_observer.username = user.name
            session.add(related_user_observer)

            related_user_creator = RelatedUser()
            related_user_creator.report_id = report.id
            related_user_creator.role_id = role_observer.id
            related_user_creator.username = observer.name
            session.add(related_user_creator)

            related_user_rp = RelatedUser()
            related_user_rp.report_id = report.id
            related_user_rp.role_id = role_rp.id
            related_user_rp.username = responsible_person.name
            session.add(related_user_rp)

            session.commit()

            return report.id
        except Exception as ex:
            print(str(ex))
            raise ex
