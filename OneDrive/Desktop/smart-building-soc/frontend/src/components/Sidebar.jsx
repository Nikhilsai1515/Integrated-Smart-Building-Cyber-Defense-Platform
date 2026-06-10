import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {

    const location = useLocation();

    const menus = [

        {
            name: "Dashboard",
            path: "/"
        },

        {
            name: "Traffic",
            path: "/traffic"
        },

        {
            name: "Threat Center",
            path: "/alerts"
        },

        {
            name: "Devices",
            path: "/devices"
        },

        {
            name: "Analytics",
            path: "/analytics"
        },

        {
            name: "Reports",
            path: "/reports"
        },

        {
            name: "Settings",
            path: "/settings"
        }

    ];

    return (

        <div
            style={{
                width: "260px",
                height: "100vh",
                background: "#111827",
                color: "white",
                position: "fixed",
                left: 0,
                top: 0,
                borderRight: "1px solid #334155"
            }}
        >

            <div
                style={{
                    textAlign: "center",
                    padding: "25px",
                    fontSize: "24px",
                    fontWeight: "bold",
                    borderBottom: "1px solid #334155"
                }}
            >
                SOC CENTER
            </div>

            <div
                style={{
                    padding: "15px"
                }}
            >

                {
                    menus.map(menu => (

                        <Link
                            key={menu.name}
                            to={menu.path}
                            style={{
                                display: "block",
                                textDecoration: "none",
                                color: "white",
                                padding: "14px",
                                marginBottom: "8px",
                                borderRadius: "10px",
                                background:
                                    location.pathname === menu.path
                                        ? "#2563eb"
                                        : "transparent",
                                transition: "0.3s"
                            }}
                        >
                            {menu.name}
                        </Link>

                    ))
                }

            </div>

            <div
                style={{
                    position: "absolute",
                    bottom: "20px",
                    left: "20px",
                    right: "20px",
                    background: "#1e293b",
                    padding: "15px",
                    borderRadius: "10px"
                }}
            >

                <div
                    style={{
                        color: "#22c55e",
                        fontWeight: "bold"
                    }}
                >
                    ● System Online
                </div>

                <div
                    style={{
                        color: "#94a3b8",
                        fontSize: "14px",
                        marginTop: "5px"
                    }}
                >
                    Monitoring Active
                </div>

            </div>

        </div>

    );

}