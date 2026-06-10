from flask import Flask
from flask_cors import CORS

from extensions import socketio

from db import db

from models.traffic import Traffic
from models.device import Device
from models.alert import Alert

from routes.stats import stats_bp
from routes.alerts import alerts_bp
from routes.devices import devices_bp
from routes.report import report_bp
from models.user import User
from routes.auth import auth_bp

def create_app():

    app = Flask(__name__)

    app.config[
        "SQLALCHEMY_DATABASE_URI"
    ] = "postgresql://postgres:112233@127.0.0.1:5432/command_control_db"

    app.config[
        "SQLALCHEMY_TRACK_MODIFICATIONS"
    ] = False

    app.config[
        "SECRET_KEY"
    ] = "supersecret"

    CORS(app)

    db.init_app(app)

    with app.app_context():

        db.create_all()

    app.register_blueprint(
        stats_bp
    )

    app.register_blueprint(
        alerts_bp
    )

    app.register_blueprint(
        devices_bp
    )
    app.register_blueprint(
        report_bp 
    )
    app.register_blueprint(
        auth_bp
    )

    socketio.init_app(
        app,
        cors_allowed_origins="*"
    )

    return app


app = create_app()


@app.route("/")
def home():

    return {
        "message":
        "Smart Building SOC Backend Running"
    }


if __name__ == "__main__":

    socketio.run(
        app,
        host="0.0.0.0",
        port=8000,
        debug=True,
        allow_unsafe_werkzeug=True
    )