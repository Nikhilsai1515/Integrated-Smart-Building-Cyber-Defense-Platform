import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer
} from "recharts";

export default function Analytics() {

    const [alerts, setAlerts] =
        useState([]);

    useEffect(() => {

        const loadAlerts =
            async () => {

                try {

                    const response =
                        await fetch(
                            "http://127.0.0.1:8000/alerts"
                        );

                    const data =
                        await response.json();

                    setAlerts(data);

                } catch (error) {

                    console.error(error);

                }

            };

        loadAlerts();

    }, []);

    const highAlerts =
        alerts.filter(
            alert =>
                alert.severity === "HIGH"
        ).length;

    const mediumAlerts =
        alerts.filter(
            alert =>
                alert.severity === "MEDIUM"
        ).length;

    const lowAlerts =
        alerts.filter(
            alert =>
                alert.severity === "LOW"
        ).length;

    const openAlerts =
        alerts.filter(
            alert =>
                alert.status === "OPEN"
        ).length;

    const closedAlerts =
        alerts.filter(
            alert =>
                alert.status === "CLOSED"
        ).length;

    const severityData = [

        {
            name: "HIGH",
            value: highAlerts
        },

        {
            name: "MEDIUM",
            value: mediumAlerts
        },

        {
            name: "LOW",
            value: lowAlerts
        }

    ];

    const COLORS = [
        "#ef4444",
        "#f59e0b",
        "#22c55e"
    ];

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
                        marginTop: "20px",
                        marginBottom: "20px"
                    }}
                >
                    Security Analytics Center
                </h1>

                <div
                    style={{
                        display: "flex",
                        gap: "20px",
                        flexWrap: "wrap",
                        marginBottom: "25px"
                    }}
                >

                    <div
                        style={{
                            background: "#1e293b",
                            padding: "20px",
                            borderRadius: "12px",
                            width: "240px",
                            borderLeft:
                                "5px solid #3b82f6",
                            boxShadow:
                                "0 0 15px rgba(0,0,0,0.3)"
                        }}
                    >
                        <h3>
                            Total Alerts
                        </h3>

                        <h1>
                            {alerts.length}
                        </h1>
                    </div>

                    <div
                        style={{
                            background: "#1e293b",
                            padding: "20px",
                            borderRadius: "12px",
                            width: "240px",
                            borderLeft:
                                "5px solid #22c55e",
                            boxShadow:
                                "0 0 15px rgba(0,0,0,0.3)"
                        }}
                    >
                        <h3>
                            Open Alerts
                        </h3>

                        <h1>
                            {openAlerts}
                        </h1>
                    </div>

                    <div
                        style={{
                            background: "#1e293b",
                            padding: "20px",
                            borderRadius: "12px",
                            width: "240px",
                            borderLeft:
                                "5px solid #64748b",
                            boxShadow:
                                "0 0 15px rgba(0,0,0,0.3)"
                        }}
                    >
                        <h3>
                            Closed Alerts
                        </h3>

                        <h1>
                            {closedAlerts}
                        </h1>
                    </div>

                    <div
                        style={{
                            background: "#1e293b",
                            padding: "20px",
                            borderRadius: "12px",
                            width: "240px",
                            borderLeft:
                                "5px solid #dc2626",
                            boxShadow:
                                "0 0 15px rgba(0,0,0,0.3)"
                        }}
                    >
                        <h3>
                            High Severity
                        </h3>

                        <h1>
                            {highAlerts}
                        </h1>
                    </div>

                </div>

                <div
                    style={{
                        display: "flex",
                        gap: "20px",
                        flexWrap: "wrap"
                    }}
                >

                    <div
                        style={{
                            background: "#1e293b",
                            borderRadius: "12px",
                            padding: "20px",
                            width: "350px",
                            boxShadow:
                                "0 0 15px rgba(0,0,0,0.3)"
                        }}
                    >

                        <h2>
                            Alert Summary
                        </h2>

                        <p>
                            🔴 High Alerts:
                            {" "}
                            {highAlerts}
                        </p>

                        <p>
                            🟠 Medium Alerts:
                            {" "}
                            {mediumAlerts}
                        </p>

                        <p>
                            🟢 Low Alerts:
                            {" "}
                            {lowAlerts}
                        </p>

                        <p>
                            📂 Open Alerts:
                            {" "}
                            {openAlerts}
                        </p>

                        <p>
                            ✅ Closed Alerts:
                            {" "}
                            {closedAlerts}
                        </p>

                    </div>

                    <div
                        style={{
                            background: "#1e293b",
                            borderRadius: "12px",
                            padding: "20px",
                            flex: 1,
                            minWidth: "450px",
                            height: "500px",
                            boxShadow:
                                "0 0 15px rgba(0,0,0,0.3)"
                        }}
                    >

                        <h2>
                            Alert Severity Distribution
                        </h2>

                        <ResponsiveContainer
                            width="100%"
                            height="90%"
                        >

                            <PieChart>

                                <Pie
                                    data={
                                        severityData
                                    }
                                    dataKey="value"
                                    outerRadius={
                                        170
                                    }
                                    label
                                >

                                    {
                                        severityData.map(
                                            (
                                                entry,
                                                index
                                            ) => (

                                                <Cell
                                                    key={
                                                        index
                                                    }
                                                    fill={
                                                        COLORS[
                                                            index
                                                        ]
                                                    }
                                                />

                                            )
                                        )
                                    }

                                </Pie>

                                <Tooltip />

                            </PieChart>

                        </ResponsiveContainer>

                    </div>

                </div>

            </div>

        </>

    );

}