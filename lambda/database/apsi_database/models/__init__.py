from apsi_database.models.base import Base  # noqa
from apsi_database.models.bug import Bug  # noqa
from apsi_database.models.key_word import KeyWord  # noqa
from apsi_database.models.message import Message  # noqa
from apsi_database.models.module import Module  # noqa
from apsi_database.models.report_class import ReportClass  # noqa
from apsi_database.models.report_keyword import report_keyword_association_table  # noqa
from apsi_database.models.report import Report  # noqa
from apsi_database.models.role import Role  # noqa
from apsi_database.models.status import Status  # noqa
from apsi_database.models.urgency import Urgency  # noqa
from apsi_database.models.user import User  # noqa
from apsi_database.models.weight import Weight  # noqa
from apsi_database.database import engine

# Sync database
Base.metadata.create_all(bind=engine)
