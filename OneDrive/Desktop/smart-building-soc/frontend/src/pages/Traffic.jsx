import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function Traffic() {

    const [traffic, setTraffic] = useState([]);
    const [search, setSearch] = useState("");

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

        loadTraffic();

    }, []);

    const uniqueSources =
        new Set(
            traffic.map(
                t => t.src_ip
            )
        ).size;

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
                        fontSize: "34px",
                        marginTop: "20px",
                        marginBottom: "20px"
                    }}
                >
                    Network Traffic Monitoring
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
                            width: "220px",
                            borderLeft: "5px solid #22c55e"
                        }}
                    >
                        <h3>Total Events</h3>
                        <h1>{traffic.length}</h1>
                    </div>

                    <div
                        style={{
                            background: "#1e293b",
                            padding: "20px",
                            borderRadius: "12px",
                            width: "220px",
                            borderLeft: "5px solid #3b82f6"
                        }}
                    >
                        <h3>Active Sources</h3>
                        <h1>{uniqueSources}</h1>
                    </div>

                    <div
                        style={{
                            background: "#1e293b",
                            padding: "20px",
                            borderRadius: "12px",
                            width: "220px",
                            borderLeft: "5px solid #f59e0b"
                        }}
                    >
                        <h3>Devices</h3>
                        <h1>3</h1>
                    </div>

                </div>

                <input
                    type="text"
                    placeholder="Search Source or Destination IP..."
                    value={search}
                    onChange={(e) =>
                        setSearch(
                            e.target.value
                        )
                    }
                    style={{
                        width: "400px",
                        padding: "12px",
                        borderRadius: "8px",
                        border: "none",
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

                            <th style={{ padding: "15px" }}>
                                ID
                            </th>

                            <th>
                                Source IP
                            </th>

                            <th>
                                Destination IP
                            </th>

                            <th>
                                Time
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            traffic
                                .filter(log =>

                                    (log.src_ip || "")
                                        .toLowerCase()
                                        .includes(
                                            search.toLowerCase()
                                        )

                                    ||

                                    (log.dst_ip || "")
                                        .toLowerCase()
                                        .includes(
                                            search.toLowerCase()
                                        )

                                )
                                .map(log => (

                                    <tr
                                        key={log.id}
                                        style={{
                                            borderBottom:
                                                "1px solid #334155"
                                        }}
                                    >

                                        <td
                                            style={{
                                                padding: "12px"
                                            }}
                                        >
                                            {log.id}
                                        </td>

                                        <td>

                                            <span
                                                style={{
                                                    background: "#0ea5e9",
                                                    padding: "6px 12px",
                                                    borderRadius: "20px"
                                                }}
                                            >
                                                {log.src_ip}
                                            </span>

                                        </td>

                                        <td>

                                            <span
                                                style={{
                                                    background: "#475569",
                                                    padding: "6px 12px",
                                                    borderRadius: "20px"
                                                }}
                                            >
                                                {log.dst_ip}
                                            </span>

                                        </td>

                                        <td>
                                            {log.created_at}
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