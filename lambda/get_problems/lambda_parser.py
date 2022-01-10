from datetime import date
from sqlalchemy import inspect

def date_to_json(dt):
    if isinstance(dt, date):
        return str(dt)

def object_as_dict(obj):
    return {c.key: getattr(obj, c.key)
            for c in inspect(obj).mapper.column_attrs}