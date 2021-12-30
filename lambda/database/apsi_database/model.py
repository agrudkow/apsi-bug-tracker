from sqlalchemy import Column, ForeignKey, String, Date, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.schema import Table

from apsi_database.database import Base, engine

report_keyword_association_table = Table('report_keyword_association', Base.metadata,
                                         Column('key_word_id', ForeignKey('reports.id'), index=True),
                                         Column('report_id', ForeignKey('key_words.id')))


class KeyWord(Base):
  __tablename__ = "key_words"

  id = Column('id', String(4), primary_key=True)
  text = Column('text', String(40))

  # Foreign keys
  reports = relationship("Report", secondary=report_keyword_association_table, back_populates="key_words")


class Weight(Base):
  __tablename__ = "weights"

  name = Column('name', String(15), primary_key=True)
  meaning = Column('meaning', String(50))

  # Foreign keys
  reports = relationship("Report", back_populates="weight")


class Status(Base):
  __tablename__ = "statuses"

  name = Column('name', String(15), primary_key=True)
  meaning = Column('meaning', String(50))

  # Foreign keys
  reports = relationship("Report", back_populates="status")


class Urgency(Base):
  __tablename__ = "urgency_levels"

  level = Column('level', String(1), primary_key=True)
  meaning = Column('meaning', String(50))

  # Foreign keys
  reports = relationship("Report", back_populates="urgency")


class Report(Base):
  __tablename__ = "reports"

  id = Column('id', String(6), primary_key=True)
  creation_date = Column('creation_date', Date)
  end_date = Column('end_date', Date)
  deadline = Column('deadline', Date)

  # Foreign keys
  weight_name = Column(String(15), ForeignKey('weights.name'), index=True)
  status_name = Column(String(15), ForeignKey('statuses.name'), index=True)
  urgency_level = Column(String(1), ForeignKey('urgency_levels.level'), index=True)
  report_class = Column(String(1), ForeignKey('report_classes.id'), index=True)
  bug_id = Column(String(10), ForeignKey('bugs.id'), index=True)
  module_id = Column(String(3), ForeignKey('modules.id'), index=True)
  key_words = relationship("KeyWord", secondary=report_keyword_association_table, back_populates="reports")
  weight = relationship("Weight", back_populates="reports")
  status = relationship("Status", back_populates="reports")
  urgency = relationship("Urgency", back_populates="reports")
  messages = relationship("Message", back_populates="report")
  roles = relationship("Role", back_populates="report")


class User(Base):
  __tablename__ = "users"

  username = Column('username', String(50), primary_key=True)
  name = Column('name', String(50))
  surname = Column('surname', String(50))
  email = Column('email', String(100), unique=True)
  phone = Column('phone', String(12), unique=True)
  worker = Column('worker', String(1))
  messages = relationship("Message", back_populates="user")
  roles = relationship("Role", back_populates="user")


class Bug(Base):
  __tablename__ = "bugs"

  id = Column('id', String(10), primary_key=True)
  description = Column('description', String(200))

  # Foreign keys
  parent_bug_id = Column(String(10), ForeignKey('bugs.id'), index=True)


class Module(Base):
  __tablename__ = "modules"

  id = Column('id', String(3), primary_key=True)
  name = Column('name', String(20), unique=True)


class ReportClass(Base):
  __tablename__ = "report_classes"

  id = Column('id', String(1), primary_key=True)
  name = Column('name', String(20), unique=True)
  description = Column('description', String(400))


class Message(Base):
  __tablename__ = "massages"

  send_date = Column('send_date', DateTime, primary_key=True, index=True)
  text = Column('text', String(400))

  # Foreign keys
  report_id = Column(String(6), ForeignKey('reports.id'), primary_key=True)
  username = Column(String(50), ForeignKey('users.username'), primary_key=True, index=True)
  report = relationship("Report", back_populates="messages")
  user = relationship("User", back_populates="messages")


class Role(Base):
  __tablename__ = "roles"

  role = Column('role', String(1))

  # Foreign keys
  report_id = Column(String(6), ForeignKey('reports.id'), primary_key=True, index=True)
  username = Column(String(50), ForeignKey('users.username'), primary_key=True)
  report = relationship("Report", back_populates="roles")
  user = relationship("User", back_populates="roles")


# Sync database
Base.metadata.create_all(bind=engine)
