from db import db

class Alert(db.Model):

    __tablename__ = "alerts"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    severity = db.Column(
        db.String(20)
    )

    message = db.Column(
        db.String(255)
    )

    source_ip = db.Column(
        db.String(50)
    )

    status = db.Column(
        db.String(20),
        default="OPEN"
    )

    created_at = db.Column(
        db.DateTime,
        server_default=db.func.now()
    )