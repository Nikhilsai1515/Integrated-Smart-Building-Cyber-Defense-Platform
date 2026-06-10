from db import db

class Device(db.Model):

    __tablename__ = "devices"

    id = db.Column(db.Integer, primary_key=True)

    ip_address = db.Column(db.String(50))

    mac_address = db.Column(db.String(50))

    hostname = db.Column(db.String(100))

    floor = db.Column(db.Integer)

    status = db.Column(
        db.String(20),
        default="ONLINE"
    )