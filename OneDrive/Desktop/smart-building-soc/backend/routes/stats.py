from services.detection_engine import (
    detect_port_scan,
    detect_traffic_volume
)
from flask import Blueprint, request, jsonify
from extensions import socketio
from models.traffic import Traffic
from db import db

stats_bp = Blueprint("stats", __name__)

@stats_bp.route("/traffic", methods=["POST"])
def traffic():

    data = request.json

    traffic_log = Traffic(
        src_ip=data["src_ip"],
        dst_ip=data["dst_ip"]
    )

    db.session.add(traffic_log)
    db.session.commit()

    detect_port_scan(
    data["src_ip"]
    )

    detect_traffic_volume()
    
    socketio.emit(
        "traffic_update",
        data
    )

    return jsonify({
        "message": "Traffic stored successfully"
    })


@stats_bp.route("/traffic", methods=["GET"])
def get_traffic():

    logs = Traffic.query.all()

    result = []

    for log in logs:

        result.append({
            "id": log.id,
            "src_ip": log.src_ip,
            "dst_ip": log.dst_ip,
            "created_at": str(log.created_at)
        })

    return jsonify(result)