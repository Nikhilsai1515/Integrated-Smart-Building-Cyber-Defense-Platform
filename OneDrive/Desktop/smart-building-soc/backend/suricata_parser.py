import json

from app import app
from db import db
from models.alert import Alert
from extensions import socketio

EVE_FILE = r"C:\Program Files\Suricata\log\eve.json"


def save_alert(event):

    alert_data = event.get("alert")

    if not alert_data:
        return

    source_ip = event.get(
        "src_ip",
        "Unknown"
    )

    message = alert_data.get(
        "signature",
        "Suricata Alert"
    )

    severity_num = alert_data.get(
        "severity",
        3
    )

    if severity_num == 1:

        severity = "HIGH"

    elif severity_num == 2:

        severity = "MEDIUM"

    else:

        severity = "LOW"

    exists = Alert.query.filter_by(
        source_ip=source_ip,
        message=message,
        status="OPEN"
    ).first()

    if exists:
        return

    alert = Alert(
        source_ip=source_ip,
        message=message,
        severity=severity,
        status="OPEN"
    )

    db.session.add(alert)
    db.session.commit()

    socketio.emit(
        "new_alert",
        {
        "id": alert.id,
        "severity": alert.severity,
        "message": alert.message,
        "source_ip": alert.source_ip,
        "status": alert.status
        }
    )

    socketio.emit(
        "alert_update",
        {
            "id": alert.id,
            "severity": alert.severity,
            "message": alert.message,
            "source_ip": alert.source_ip,
            "status": alert.status
        }
    )

    print(
        f"[+] Saved: {message}"
    )


with app.app_context():

    count = 0

    with open(
        EVE_FILE,
        "r",
        encoding="utf-8"
    ) as file:

        for line in file:

            try:

                event = json.loads(line)

                if (
                    event.get("event_type")
                    == "alert"
                ):

                    save_alert(event)
                    count += 1

            except Exception as e:

                print(e)

    print(
        f"\nImported {count} alerts"
    )