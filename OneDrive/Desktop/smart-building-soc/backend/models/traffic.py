from db import db

class Traffic(db.Model):

    __tablename__ = "traffic_logs"

    id = db.Column(db.Integer, primary_key=True)

    src_ip = db.Column(db.String(50))

    dst_ip = db.Column(db.String(50))

    created_at = db.Column(
        db.DateTime,
        server_default=db.func.now()
    )