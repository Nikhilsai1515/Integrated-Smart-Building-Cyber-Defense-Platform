import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function Reports() {

    const downloadReport = () => {

        window.open(
            "http://127.0.0.1:8000/report",
            "_blank"
        );

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
                    Reports Center
                </h1>

                <div
                    style={{
                        display: "flex",
                        gap: "20px",
                        flexWrap: "wrap",
                        marginBottom: "30px"
                    }}
                >

                    <div
                        style={{
                            background: "#1e293b",
                            padding: "20px",
                            borderRadius: "12px",
                            width: "250px",
                            borderLeft:
                                "5px solid #22c55e",
                            boxShadow:
                                "0 0 15px rgba(0,0,0,0.3)"
                        }}
                    >
                        <h3>
                            Report Type
                        </h3>

                        <h2>
                            Security PDF
                        </h2>
                    </div>

                    <div
                        style={{
                            background: "#1e293b",
                            padding: "20px",
                            borderRadius: "12px",
                            width: "250px",
                            borderLeft:
                                "5px solid #3b82f6",
                            boxShadow:
                                "0 0 15px rgba(0,0,0,0.3)"
                        }}
                    >
                        <h3>
                            Includes
                        </h3>

                        <h2>
                            Alerts + Traffic
                        </h2>
                    </div>

                    <div
                        style={{
                            background: "#1e293b",
                            padding: "20px",
                            borderRadius: "12px",
                            width: "250px",
                            borderLeft:
                                "5px solid #f59e0b",
                            boxShadow:
                                "0 0 15px rgba(0,0,0,0.3)"
                        }}
                    >
                        <h3>
                            Format
                        </h3>

                        <h2>
                            PDF Export
                        </h2>
                    </div>

                </div>

                <div
                    style={{
                        background: "#1e293b",
                        padding: "30px",
                        borderRadius: "12px",
                        boxShadow:
                            "0 0 15px rgba(0,0,0,0.3)"
                    }}
                >

                    <h2>
                        Security Report Generator
                    </h2>

                    <p>
                        Generate a complete
                        Smart Building Security Report
                        containing:
                    </p>

                    <ul
                        style={{
                            marginTop: "15px",
                            lineHeight: "2"
                        }}
                    >
                        <li>
                            Threat Summary
                        </li>

                        <li>
                            Alert Statistics
                        </li>

                        <li>
                            Traffic Monitoring Data
                        </li>

                        <li>
                            Device Inventory
                        </li>

                        <li>
                            Security Analytics
                        </li>
                    </ul>

                    <button
                        onClick={downloadReport}
                        style={{
                            marginTop: "25px",
                            padding: "14px 30px",
                            background: "#22c55e",
                            border: "none",
                            borderRadius: "10px",
                            color: "white",
                            fontWeight: "bold",
                            cursor: "pointer",
                            fontSize: "16px"
                        }}
                    >
                        Generate PDF Report
                    </button>

                </div>

            </div>

        </>

    );

}