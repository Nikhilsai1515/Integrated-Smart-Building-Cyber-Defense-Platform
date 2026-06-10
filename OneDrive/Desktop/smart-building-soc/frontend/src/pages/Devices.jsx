import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function Devices() {

    const [devices, setDevices] = useState([]);
    const [search, setSearch] = useState("");

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

    useEffect(() => {

        loadDevices();

    }, []);

    const onlineDevices =
        devices.filter(
            d => d.status === "ONLINE"
        ).length;

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
                    Device Monitoring Center
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
                            Total Devices
                        </h3>

                        <h1>
                            {devices.length}
                        </h1>
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
                            Online Devices
                        </h3>

                        <h1>
                            {onlineDevices}
                        </h1>
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
                            Floors Monitored
                        </h3>

                        <h1>
                            {
                                new Set(
                                    devices.map(
                                        d => d.floor
                                    )
                                ).size
                            }
                        </h1>
                    </div>

                </div>

                <input
                    type="text"
                    placeholder="Search IP Address..."
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
                        border:
                            "1px solid #475569",
                        padding: "12px",
                        borderRadius: "8px",
                        marginBottom: "20px"
                    }}
                />

                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        background: "#1e293b",
                        borderRadius: "12px",
                        overflow: "hidden"
                    }}
                >

                    <thead>

                        <tr
                            style={{
                                background: "#334155",
                                color: "#e2e8f0"
                            }}
                        >

                            <th
                                style={{
                                    padding: "15px"
                                }}
                            >
                                ID
                            </th>

                            <th
                                style={{
                                    padding: "15px"
                                }}
                            >
                                IP Address
                            </th>

                            <th
                                style={{
                                    padding: "15px"
                                }}
                            >
                                Hostname
                            </th>

                            <th
                                style={{
                                    padding: "15px"
                                }}
                            >
                                Floor
                            </th>

                            <th
                                style={{
                                    padding: "15px"
                                }}
                            >
                                Status
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            devices.length === 0 && (

                                <tr>

                                    <td
                                        colSpan="5"
                                        style={{
                                            textAlign:
                                                "center",
                                            padding:
                                                "40px"
                                        }}
                                    >
                                        No Devices Found
                                    </td>

                                </tr>

                            )
                        }

                        {
                            devices
                                .filter(device =>
                                    device.ip_address
                                        ?.toLowerCase()
                                        .includes(
                                            search.toLowerCase()
                                        )
                                )
                                .map(device => (

                                    <tr
                                        key={
                                            device.id
                                        }
                                        style={{
                                            borderBottom:
                                                "1px solid #334155"
                                        }}
                                    >

                                        <td
                                            style={{
                                                padding:
                                                    "14px"
                                            }}
                                        >
                                            {device.id}
                                        </td>

                                        <td
                                            style={{
                                                padding:
                                                    "14px"
                                            }}
                                        >

                                            <span
                                                style={{
                                                    background:
                                                        "#0ea5e9",
                                                    padding:
                                                        "6px 12px",
                                                    borderRadius:
                                                        "20px"
                                                }}
                                            >
                                                {
                                                    device.ip_address
                                                }
                                            </span>

                                        </td>

                                        <td
                                            style={{
                                                padding:
                                                    "14px"
                                            }}
                                        >
                                            {
                                                device.hostname
                                            }
                                        </td>

                                        <td
                                            style={{
                                                padding:
                                                    "14px"
                                            }}
                                        >

                                            <span
                                                style={{
                                                    background:
                                                        "#475569",
                                                    padding:
                                                        "6px 12px",
                                                    borderRadius:
                                                        "20px"
                                                }}
                                            >
                                                Floor {
                                                    device.floor
                                                }
                                            </span>

                                        </td>

                                        <td
                                            style={{
                                                padding:
                                                    "14px"
                                            }}
                                        >

                                            <span
                                                style={{
                                                    background:
                                                        device.status ===
                                                        "ONLINE"
                                                            ? "#16a34a"
                                                            : "#dc2626",
                                                    color:
                                                        "white",
                                                    padding:
                                                        "6px 12px",
                                                    borderRadius:
                                                        "20px",
                                                    fontWeight:
                                                        "bold"
                                                }}
                                            >
                                                {
                                                    device.status
                                                }
                                            </span>

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