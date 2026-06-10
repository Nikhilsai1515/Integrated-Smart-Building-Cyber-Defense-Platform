from flask import (
    Blueprint,
    request,
    jsonify
)

from models.user import User

auth_bp = Blueprint(
    "auth",
    __name__
)


@auth_bp.route(
    "/login",
    methods=["POST"]
)
def login():

    data = request.json

    user = User.query.filter_by(
        username=data["username"]
    ).first()

    if not user:

        return jsonify({
            "message": "User not found"
        }), 401

    if user.password != data["password"]:

        return jsonify({
            "message": "Invalid password"
        }), 401

    return jsonify({

        "id": user.id,
        "username": user.username,
        "role": user.role

    })