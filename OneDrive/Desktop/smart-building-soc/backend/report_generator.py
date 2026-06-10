from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer
)

from reportlab.lib.styles import (
    getSampleStyleSheet
)

from models.alert import Alert
from models.device import Device
from models.traffic import Traffic


def generate_report(path):

    pdf = SimpleDocTemplate(path)

    styles = getSampleStyleSheet()

    content = []

    title = Paragraph(
        "Smart Building SOC Report",
        styles["Title"]
    )

    content.append(title)

    content.append(
        Spacer(1, 20)
    )

    total_devices = Device.query.count()

    total_traffic = Traffic.query.count()

    total_alerts = Alert.query.count()

    open_alerts = Alert.query.filter_by(
        status="OPEN"
    ).count()

    closed_alerts = Alert.query.filter_by(
        status="CLOSED"
    ).count()

    content.append(
        Paragraph(
            f"Total Devices: {total_devices}",
            styles["Normal"]
        )
    )

    content.append(
        Paragraph(
            f"Total Traffic Events: {total_traffic}",
            styles["Normal"]
        )
    )

    content.append(
        Paragraph(
            f"Total Alerts: {total_alerts}",
            styles["Normal"]
        )
    )

    content.append(
        Paragraph(
            f"Open Alerts: {open_alerts}",
            styles["Normal"]
        )
    )

    content.append(
        Paragraph(
            f"Closed Alerts: {closed_alerts}",
            styles["Normal"]
        )
    )

    content.append(
        Spacer(1, 20)
    )

    content.append(
        Paragraph(
            "Recent Alerts",
            styles["Heading2"]
        )
    )

    alerts = Alert.query.order_by(
        Alert.id.desc()
    ).limit(10).all()

    for alert in alerts:

        content.append(
            Paragraph(
                f"{alert.severity} | "
                f"{alert.message} | "
                f"{alert.source_ip}",
                styles["Normal"]
            )
        )

    pdf.build(content)