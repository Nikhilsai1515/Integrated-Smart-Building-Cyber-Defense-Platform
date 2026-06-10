import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { socket } from "../sockets/socket";

export default function Alerts() {

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const [alerts, setAlerts] = useState([]);
    const [filter, setFilter] = useState("ALL");
    const [search, setSearch] = useState("");

    const loadAlerts = async () => {

        try {

            const response = await fetch(
                "http://127.0.0.1:8000/alerts"
            );

            const data = await response.json();

            setAlerts(data);

        } catch (error) {

            console.error(error);

        }

    };

    useEffect(() => {

        loadAlerts();

        socket.on(
            "new_alert",
            (alert) => {

                setAlerts(prev => {

                    const exists =
                        prev.find(
                            a => a.id === alert.id
                        );

                    if (exists) {
                        return prev;
                    }

                    return [
                        alert,
                        ...prev
                    ];

                });

            }
        );

        socket.on(
            "alert_update",
            (updatedAlert) => {

                setAlerts(prev =>
                    prev.map(alert =>
                        alert.id === updatedAlert.id
                            ? updatedAlert
                            : alert
                    )
                );

            }
        );

        return () => {

            socket.off("new_alert");
            socket.off("alert_update");

        };

    }, []);

    const closeAlert = async (alertId) => {

        try {

            await fetch(
                `http://127.0.0.1:8000/alerts/${alertId}/close`,
                {
                    method: "PUT"
                }
            );

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <>
            <Sidebar />

            <div
                style={{
                    marginLeft: "260px",
                    padding: "20px",
                    background: "#0f172a",
                    color: "white",
                    minHeight: "100vh"
                }}
            >

                <Navbar />

                <h1
                    style={{
                        fontSize: "32px",
                        marginBottom: "20px"
                    }}
                >
                    Threat Center
                </h1>

                <div
                    style={{
                        display: "flex",
                        gap: "20px",
                        marginBottom: "25px",
                        flexWrap: "wrap"
                    }}
                >

                    <div
                        style={{
                            background: "#7f1d1d",
                            padding: "20px",
                            borderRadius: "10px",
                            width: "250px"
                        }}
                    >
                        <h3>High Alerts</h3>

                        <h1>
                            {
                                alerts.filter(
                                    a =>
                                        a.severity ===
                                        "HIGH"
                                ).length
                            }
                        </h1>
                    </div>

                    <div
                        style={{
                            background: "#92400e",
                            padding: "20px",
                            borderRadius: "10px",
                            width: "250px"
                        }}
                    >
                        <h3>Open Alerts</h3>

                        <h1>
                            {
                                alerts.filter(
                                    a =>
                                        a.status ===
                                        "OPEN"
                                ).length
                            }
                        </h1>
                    </div>

                    <div
                        style={{
                            background: "#1e3a8a",
                            padding: "20px",
                            borderRadius: "10px",
                            width: "250px"
                        }}
                    >
                        <h3>Total Alerts</h3>

                        <h1>
                            {alerts.length}
                        </h1>
                    </div>

                </div>

                <input
                    type="text"
                    placeholder="🔍 Search alerts..."
                    value={search}
                    onChange={(e) =>
                        setSearch(
                            e.target.value
                        )
                    }
                    style={{
                        width: "500px",
                        background: "#1e293b",
                        color: "white",
                        border: "1px solid #475569",
                        padding: "12px",
                        borderRadius: "8px",
                        marginBottom: "20px"
                    }}
                />

                <div
                    style={{
                        display: "flex",
                        gap: "10px",
                        marginBottom: "20px"
                    }}
                >

                    <button
                        onClick={() => setFilter("ALL")}
                        style={{
                            background: "#334155",
                            color: "white",
                            border: "none",
                            padding: "10px 18px",
                            borderRadius: "8px",
                            cursor: "pointer"
                        }}
                    >
                        All
                    </button>

                    <button
                        onClick={() => setFilter("HIGH")}
                        style={{
                            background: "#334155",
                            color: "white",
                            border: "none",
                            padding: "10px 18px",
                            borderRadius: "8px",
                            cursor: "pointer"
                        }}
                    >
                        High
                    </button>

                    <button
                        onClick={() => setFilter("MEDIUM")}
                        style={{
                            background: "#334155",
                            color: "white",
                            border: "none",
                            padding: "10px 18px",
                            borderRadius: "8px",
                            cursor: "pointer"
                        }}
                    >
                        Medium
                    </button>

                    <button
                        onClick={() => setFilter("OPEN")}
                        style={{
                            background: "#334155",
                            color: "white",
                            border: "none",
                            padding: "10px 18px",
                            borderRadius: "8px",
                            cursor: "pointer"
                        }}
                    >
                        Open
                    </button>

                    <button
                        onClick={() => setFilter("CLOSED")}
                        style={{
                            background: "#334155",
                            color: "white",
                            border: "none",
                            padding: "10px 18px",
                            borderRadius: "8px",
                            cursor: "pointer"
                        }}
                    >
                        Closed
                    </button>

                </div>

                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        background: "#1e293b"
                    }}
                >

                    <thead>

                        <tr
                            style={{
                                background: "#334155",
                                color: "#e2e8f0"
                            }}
                        >

                            <th style={{ padding: "14px" }}>Severity</th>
                            <th style={{ padding: "14px" }}>Message</th>
                            <th style={{ padding: "14px" }}>Source IP</th>
                            <th style={{ padding: "14px" }}>Status</th>
                            <th style={{ padding: "14px" }}>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            alerts.length === 0 && (

                                <tr>

                                    <td
                                        colSpan="5"
                                        style={{
                                            textAlign: "center",
                                            padding: "40px"
                                        }}
                                    >
                                        No Alerts Detected
                                    </td>

                                </tr>

                            )
                        }

                        {
                            alerts
                                .filter(alert => {

                                    const matchesSearch =
                                        (alert.message || "")
                                            .toLowerCase()
                                            .includes(
                                                search.toLowerCase()
                                            ) ||

                                        (alert.source_ip || "")
                                            .toLowerCase()
                                            .includes(
                                                search.toLowerCase()
                                            );

                                    if (!matchesSearch)
                                        return false;

                                    if (filter === "ALL")
                                        return true;

                                    if (
                                        filter === "HIGH" ||
                                        filter === "MEDIUM"
                                    ) {

                                        return (
                                            alert.severity ===
                                            filter
                                        );

                                    }

                                    return (
                                        alert.status ===
                                        filter
                                    );

                                })
                                .map(alert => (

                                    <tr
                                        key={alert.id}
                                        style={{
                                            borderBottom:
                                                "1px solid #334155"
                                        }}
                                    >

                                        <td
                                            style={{
                                                padding: "14px"
                                            }}
                                        >

                                            <span
                                                style={{
                                                    background:
                                                        alert.severity === "HIGH"
                                                            ? "#dc2626"
                                                            : alert.severity === "MEDIUM"
                                                            ? "#f59e0b"
                                                            : "#16a34a",
                                                    color: "white",
                                                    padding: "6px 12px",
                                                    borderRadius: "20px",
                                                    fontWeight: "bold"
                                                }}
                                            >
                                                {alert.severity}
                                            </span>

                                        </td>

                                        <td
                                            style={{
                                                padding: "14px"
                                            }}
                                        >
                                            {alert.message}
                                        </td>

                                        <td
                                            style={{
                                                padding: "14px"
                                            }}
                                        >
                                            {alert.source_ip}
                                        </td>

                                        <td
                                            style={{
                                                padding: "14px"
                                            }}
                                        >

                                            <span
                                                style={{
                                                    background:
                                                        alert.status === "OPEN"
                                                            ? "#16a34a"
                                                            : "#475569",
                                                    color: "white",
                                                    padding: "6px 12px",
                                                    borderRadius: "20px"
                                                }}
                                            >
                                                {alert.status}
                                            </span>

                                        </td>

                                        <td
                                            style={{
                                                padding: "14px"
                                            }}
                                        >

                                            {
                                                alert.status === "OPEN" &&
                                                user?.role !== "VIEWER" && (

                                                    <button
                                                        onClick={() =>
                                                            closeAlert(
                                                                alert.id
                                                            )
                                                        }
                                                        style={{
                                                            background: "#dc2626",
                                                            color: "white",
                                                            border: "none",
                                                            padding: "8px 14px",
                                                            borderRadius: "8px",
                                                            cursor: "pointer",
                                                            fontWeight: "bold"
                                                        }}
                                                    >
                                                        Close Alert
                                                    </button>

                                                )
                                            }

                                        </td>

                                    </tr>

                                ))
                        }

                    </tbody>

                </table>

            </div>

        </>

    );

}