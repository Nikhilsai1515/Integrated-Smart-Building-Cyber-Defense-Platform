import { useEffect, useState } from "react";
import { socket } from "../sockets/socket";
import TrafficChart from "../components/TrafficChart";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function Dashboard() {

    const [traffic, setTraffic] = useState([]);
    const [devices, setDevices] = useState([]);
    const [alerts, setAlerts] = useState([]);

    const openAlerts = alerts.filter(
        alert => alert.status === "OPEN"
    ).length;

    const closedAlerts = alerts.filter(
        alert => alert.status === "CLOSED"
    ).length;

    const highAlerts = alerts.filter(
        alert => alert.severity === "HIGH"
    ).length;

    const mediumAlerts = alerts.filter(
        alert => alert.severity === "MEDIUM"
    ).length;

    useEffect(() => {

        const loadTraffic = async () => {

            try {

                const response = await fetch(
                    "http://127.0.0.1:8000/traffic"
                );

                const data = await response.json();

                setTraffic(data);

            } catch (error) {

                console.error(error);

            }

        };

        const loadDevices = async () => {

            try {

                const response = await fetch(
                    "http://127.0.0.1:8000/devices"
                );

                const data = await response.json();

                setDevices(data);

            } catch (error) {

                console.error(error);

            }

        };

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

        loadTraffic();
        loadDevices();
        loadAlerts();

        socket.on("connect", () => {

            console.log(
                "Connected to Backend"
            );

        });

        socket.on(
            "traffic_update",
            (data) => {

                setTraffic(prev => [
                    ...prev,
                    data
                ]);

            }
        );

        socket.on(
            "alert_update",
            (newAlert) => {

                setAlerts(prev => {

                    const exists =
                        prev.find(
                            alert =>
                                alert.id ===
                                newAlert.id
                        );

                    if (exists) {

                        return prev.map(
                            alert =>
                                alert.id ===
                                newAlert.id
                                    ? newAlert
                                    : alert
                        );

                    }

                    return [
                        newAlert,
                        ...prev
                    ];

                });

            }
        );

        return () => {

            socket.off(
                "traffic_update"
            );

            socket.off(
                "alert_update"
            );

        };

    }, []);

const generateTraffic = async () => {

    const devices = [
        "10.163.98.155",
        "10.163.98.163",
        "10.163.98.206"
    ];

    const destinations = [
        "8.8.8.8",
        "1.1.1.1",
        "142.250.183.78",
        "172.217.167.14",
        "104.26.10.78"
    ];

    try {

        await fetch(
            "http://127.0.0.1:8000/traffic",
            {
                method: "POST",
                headers: {
                    "Content-Type":
                        "application/json"
                },
                body: JSON.stringify({
                    src_ip:
                        devices[
                            Math.floor(
                                Math.random() *
                                devices.length
                            )
                        ],
                    dst_ip:
                        destinations[
                            Math.floor(
                                Math.random() *
                                destinations.length
                            )
                        ]
                })
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
                    background: "#0f172a",
                    color: "white",
                    minHeight: "100vh",
                    padding: "20px"
                }}
            >

                <Navbar />

                <h1
                    style={{
                        fontSize: "32px",
                        marginTop: "20px",
                        marginBottom: "20px"
                    }}
                >
                    Smart Building SOC Dashboard
                </h1>

                <div
                    style={{
                        display: "flex",
                        gap: "20px",
                        flexWrap: "wrap",
                        marginBottom: "20px"
                    }}
                >

                    <div
                        style={{
                            background: "#1e293b",
                            padding: "20px",
                            borderRadius: "10px",
                            width: "220px"
                        }}
                    >
                        <h3>Active Devices</h3>
                        <h1>{devices.length}</h1>
                    </div>

                    <div
                        style={{
                            background: "#1e293b",
                            padding: "20px",
                            borderRadius: "10px",
                            width: "220px"
                        }}
                    >
                        <h3>Traffic Events</h3>
                        <h1>{traffic.length}</h1>
                    </div>

                    <div
                        style={{
                            background: "#1e293b",
                            padding: "20px",
                            borderRadius: "10px",
                            width: "220px"
                        }}
                    >
                        <h3>Open Alerts</h3>
                        <h1
                            style={{
                                color: "#ef4444"
                            }}
                        >
                            {openAlerts}
                        </h1>
                    </div>

                    <div
                        style={{
                            background: "#1e293b",
                            padding: "20px",
                            borderRadius: "10px",
                            width: "220px"
                        }}
                    >
                        <h3>Closed Alerts</h3>
                        <h1
                            style={{
                                color: "#22c55e"
                            }}
                        >
                            {closedAlerts}
                        </h1>
                    </div>

                    <div
                        style={{
                            background: "#1e293b",
                            padding: "20px",
                            borderRadius: "10px",
                            width: "220px"
                        }}
                    >
                        <h3>High Alerts</h3>
                        <h1
                            style={{
                                color: "#ef4444"
                            }}
                        >
                            {highAlerts}
                        </h1>
                    </div>

                    <div
                        style={{
                            background: "#1e293b",
                            padding: "20px",
                            borderRadius: "10px",
                            width: "220px"
                        }}
                    >
                        <h3>Medium Alerts</h3>
                        <h1
                            style={{
                                color: "#f59e0b"
                            }}
                        >
                            {mediumAlerts}
                        </h1>
                    </div>

                </div>

                <button
                    onClick={generateTraffic}
                    style={{
                        padding: "12px 25px",
                        background: "#22c55e",
                        border: "none",
                        borderRadius: "8px",
                        color: "white",
                        cursor: "pointer",
                        marginBottom: "20px"
                    }}
                >
                    Generate Traffic
                </button>

                <TrafficChart
                    traffic={traffic}
                />

                <div
                    style={{
                        background: "#1e293b",
                        marginTop: "25px",
                        padding: "20px",
                        borderRadius: "10px"
                    }}
                >

                    <h2>Threat Center</h2>

                    {
                        alerts.length === 0
                            ? (
                                <p>
                                    No Active Alerts
                                </p>
                            )
                            : (
                                alerts.map(
                                    alert => (

                                        <div
                                            key={
                                                alert.id
                                            }
                                            style={{
                                                marginTop:
                                                    "15px",
                                                padding:
                                                    "12px",
                                                background:
                                                    "#0f172a",
                                                borderRadius:
                                                    "8px"
                                            }}
                                        >

                                            <div
                                                style={{
                                                    color:
                                                        alert.severity ===
                                                        "HIGH"
                                                            ? "#ef4444"
                                                            : "#f59e0b",
                                                    fontWeight:
                                                        "bold"
                                                }}
                                            >
                                                {
                                                    alert.severity
                                                } ALERT
                                            </div>

                                            <p>
                                                {
                                                    alert.message
                                                }
                                            </p>

                                            <small>
                                                Source:{" "}
                                                {
                                                    alert.source_ip
                                                }
                                            </small>

                                        </div>

                                    )
                                )
                            )
                    }

                </div>

            </div>
        </>

    );

}