from sqlalchemy import Column, ForeignKey, Table

from apsi_database.models.base import Base

report_keyword_association_table = Table('report_keyword_association', Base.metadata,
                                         Column('key_word_id', ForeignKey('reports.id'), index=True),
                                         Column('report_id', ForeignKey('key_words.id')))

'''Tabela asocjacji dla relacji wiele do wielu, zgłoszenia-słowa kluczowe'''
