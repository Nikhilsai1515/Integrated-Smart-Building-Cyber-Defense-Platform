from models.alert import Alert
from models.traffic import Traffic
from db import db


def create_alert(
    severity,
    message,
    source_ip
):

    existing = Alert.query.filter_by(
        source_ip=source_ip,
        message=message
    ).first()

    if not existing:

        alert = Alert(
            severity=severity,
            message=message,
            source_ip=source_ip,
            status="OPEN"
        )

        db.session.add(alert)
        db.session.commit()


def detect_port_scan(src_ip):

    traffic_count = Traffic.query.filter_by(
        src_ip=src_ip
    ).count()

    if traffic_count >= 5:

        create_alert(
            "HIGH",
            "Possible Port Scan",
            src_ip
        )


def detect_traffic_volume():

    total_traffic = Traffic.query.count()

    if total_traffic >= 25:

        create_alert(
            "MEDIUM",
            "Unusual Traffic Volume",
            "NETWORK"
        )