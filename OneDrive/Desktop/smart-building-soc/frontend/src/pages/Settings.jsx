import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function Settings() {

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
                    System Configuration Center
                </h1>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit,minmax(350px,1fr))",
                        gap: "20px"
                    }}
                >

                    <div
                        style={{
                            background: "#1e293b",
                            padding: "20px",
                            borderRadius: "12px",
                            borderLeft:
                                "5px solid #22c55e"
                        }}
                    >
                        <h2>
                            Detection Engine
                        </h2>

                        <p>
                            Status:
                            Active
                        </p>

                        <p>
                            Port Scan Detection:
                            Enabled
                        </p>

                        <p>
                            Traffic Volume Detection:
                            Enabled
                        </p>
                    </div>

                    <div
                        style={{
                            background: "#1e293b",
                            padding: "20px",
                            borderRadius: "12px",
                            borderLeft:
                                "5px solid #3b82f6"
                        }}
                    >
                        <h2>
                            Suricata IDS
                        </h2>

                        <p>
                            Status:
                            Running
                        </p>

                        <p>
                            Alert Monitoring:
                            Enabled
                        </p>

                        <p>
                            Log Source:
                        </p>

                        <small>
                            C:\Program Files\Suricata\log\eve.json
                        </small>
                    </div>

                    <div
                        style={{
                            background: "#1e293b",
                            padding: "20px",
                            borderRadius: "12px",
                            borderLeft:
                                "5px solid #f59e0b"
                        }}
                    >
                        <h2>
                            Database
                        </h2>

                        <p>
                            PostgreSQL:
                            Connected
                        </p>

                        <p>
                            Database:
                            command_control_db
                        </p>
                    </div>

                    <div
                        style={{
                            background: "#1e293b",
                            padding: "20px",
                            borderRadius: "12px",
                            borderLeft:
                                "5px solid #dc2626"
                        }}
                    >
                        <h2>
                            User Roles
                        </h2>

                        <p>
                            ADMIN:
                            Full Access
                        </p>

                        <p>
                            ANALYST:
                            Alert Management
                        </p>

                        <p>
                            VIEWER:
                            Read Only
                        </p>
                    </div>

                    <div
                        style={{
                            background: "#1e293b",
                            padding: "20px",
                            borderRadius: "12px",
                            borderLeft:
                                "5px solid #8b5cf6"
                        }}
                    >
                        <h2>
                            Monitoring Services
                        </h2>

                        <p>
                            Dashboard:
                            Online
                        </p>

                        <p>
                            Socket.IO:
                            Connected
                        </p>

                        <p>
                            Threat Monitoring:
                            Active
                        </p>

                        <p>
                            Traffic Monitoring:
                            Active
                        </p>
                    </div>

                    <div
                        style={{
                            background: "#1e293b",
                            padding: "20px",
                            borderRadius: "12px",
                            borderLeft:
                                "5px solid #06b6d4"
                        }}
                    >
                        <h2>
                            Building Coverage
                        </h2>

                        <p>
                            Floors Monitored:
                            18
                        </p>

                        <p>
                            Devices Discovered:
                            3
                        </p>

                        <p>
                            Command Center:
                            Active
                        </p>
                    </div>

                </div>

            </div>

        </>

    );

}