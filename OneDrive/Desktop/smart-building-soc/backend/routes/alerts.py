from flask import Blueprint, jsonify, request
from models.alert import Alert
from db import db
from extensions import socketio

alerts_bp = Blueprint(
    "alerts",
    __name__
)


@alerts_bp.route(
    "/alerts",
    methods=["GET"]
)
def get_alerts():

    alerts = Alert.query.order_by(
        Alert.id.desc()
    ).all()

    result = []

    for alert in alerts:

        result.append({

            "id": alert.id,
            "severity": alert.severity,
            "message": alert.message,
            "source_ip": alert.source_ip,
            "status": alert.status,
            "created_at": str(alert.created_at)

        })

    return jsonify(result)


@alerts_bp.route(
    "/alerts",
    methods=["POST"]
)
def create_alert():

    data = request.json

    alert = Alert(

        severity=data["severity"],
        message=data["message"],
        source_ip=data["source_ip"],
        status="OPEN"

    )

    db.session.add(alert)
    db.session.commit()

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

    return jsonify({
        "message": "Alert created"
    })


@alerts_bp.route(
    "/alerts/<int:alert_id>/close",
    methods=["PUT"]
)
def close_alert(alert_id):

    alert = Alert.query.get(alert_id)

    if not alert:

        return jsonify({
            "message": "Alert not found"
        }), 404

    alert.status = "CLOSED"

    db.session.commit()

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

    return jsonify({
        "message": "Alert closed"
    })