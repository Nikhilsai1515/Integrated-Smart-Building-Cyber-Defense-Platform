from flask import (
    Blueprint,
    send_file
)

from report_generator import (
    generate_report
)

report_bp = Blueprint(
    "report",
    __name__
)


@report_bp.route(
    "/report",
    methods=["GET"]
)
def report():

    filename = "soc_report.pdf"

    generate_report(
        filename
    )

    return send_file(
        filename,
        as_attachment=True
    )