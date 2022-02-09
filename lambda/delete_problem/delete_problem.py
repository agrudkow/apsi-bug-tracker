from apsi_database.database import get_db_session
from apsi_database.models import Report, Bug, RelatedUser, Message


class BugTreeException(Exception):
    pass


def delete_problem(id: int) -> None:
    """
    Return problem by id
    """
    with get_db_session() as session:
        problem = session.query(Report).get(id)
        bug = problem.bug
        related_bugs = session.query(Bug).filter(Bug.parent_bug_id == problem.bug_id).all()
        related_users = session.query(RelatedUser).filter(RelatedUser.report_id == problem.id).all()
        related_messages = session.query(Message).filter(Message.report_id == problem.id).all()

        if len(related_bugs) > 0:
            raise BugTreeException('Problem has child problems and cannot be deleted. Delete child problems first.')

        for user in related_users:
            session.delete(user)
        session.delete(problem)
        session.delete(bug)

        for message in related_messages:
            session.delete(message)

        session.commit()
