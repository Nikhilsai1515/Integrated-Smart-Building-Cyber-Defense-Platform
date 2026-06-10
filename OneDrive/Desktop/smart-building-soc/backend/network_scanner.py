import nmap

from app import app
from db import db
from models.device import Device

scanner = nmap.PortScanner()

network = "10.163.98.0/24"

print(f"Scanning {network}...")

scanner.scan(
    hosts=network,
    arguments="-sn"
)

with app.app_context():

    for host in scanner.all_hosts():

        print(f"Found: {host}")

        existing = Device.query.filter_by(
            ip_address=host
        ).first()

        if not existing:

            device = Device(
                ip_address=host,
                mac_address="Unknown",
                hostname="Unknown",
                floor=1
            )

            db.session.add(device)

    db.session.commit()

print("Devices saved successfully")