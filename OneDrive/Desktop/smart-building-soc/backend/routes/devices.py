from flask import Blueprint, jsonify
from models.device import Device

devices_bp = Blueprint(
    "devices",
    __name__
)

@devices_bp.route(
    "/devices",
    methods=["GET"]
)
def get_devices():

    devices = Device.query.all()

    result = []

    for device in devices:

        result.append({

            "id": device.id,
            "ip_address": device.ip_address,
            "mac_address": device.mac_address,
            "hostname": device.hostname,
            "floor": device.floor,
            "status": device.status

        })

    return jsonify(result)