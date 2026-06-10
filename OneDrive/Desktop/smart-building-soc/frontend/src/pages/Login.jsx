import { useState } from "react";

export default function Login() {

    const [username, setUsername] =
        useState("");

    const [password, setPassword] =
        useState("");

    const login = async () => {

        try {

            const response =
                await fetch(
                    "http://127.0.0.1:8000/login",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type":
                                "application/json"
                        },
                        body: JSON.stringify({
                            username,
                            password
                        })
                    }
                );

            const data =
                await response.json();

            if (response.ok) {

                localStorage.setItem(
                    "user",
                    JSON.stringify(data)
                );

                window.location.href =
                    "/";

            } else {

                alert(
                    data.message
                );

            }

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background:
                    "linear-gradient(135deg,#020617,#0f172a,#1e293b)",
                padding: "20px"
            }}
        >

            <div
                style={{
                    display: "flex",
                    width: "1000px",
                    maxWidth: "100%",
                    background:
                        "rgba(15,23,42,0.85)",
                    backdropFilter:
                        "blur(12px)",
                    border:
                        "1px solid #334155",
                    borderRadius: "20px",
                    overflow: "hidden",
                    boxShadow:
                        "0 0 40px rgba(37,99,235,0.25)"
                }}
            >

                <div
                    style={{
                        flex: 1,
                        padding: "50px",
                        color: "white",
                        background:
                            "linear-gradient(180deg,#0f172a,#111827)"
                    }}
                >

                    <h1
                        style={{
                            fontSize: "40px",
                            marginBottom: "10px"
                        }}
                    >
                        Smart Building
                    </h1>

                    <h2
                        style={{
                            color: "#60a5fa",
                            marginBottom: "20px"
                        }}
                    >
                        Command & Control Center
                    </h2>

                    <p
                        style={{
                            color: "#94a3b8",
                            lineHeight: "1.8"
                        }}
                    >
                        Real-Time Threat Detection,
                        Network Monitoring,
                        Device Discovery,
                        Traffic Analytics
                        and Security Operations.
                    </p>

                    <div
                        style={{
                            marginTop: "50px"
                        }}
                    >

                        <div
                            style={{
                                color: "#22c55e",
                                marginBottom: "15px",
                                fontWeight: "bold"
                            }}
                        >
                            ● Traffic Monitoring Active
                        </div>

                        <div
                            style={{
                                color: "#22c55e",
                                marginBottom: "15px",
                                fontWeight: "bold"
                            }}
                        >
                            ● Threat Detection Active
                        </div>

                        <div
                            style={{
                                color: "#22c55e",
                                marginBottom: "15px",
                                fontWeight: "bold"
                            }}
                        >
                            ● Device Discovery Active
                        </div>

                        <div
                            style={{
                                color: "#22c55e",
                                fontWeight: "bold"
                            }}
                        >
                            ● Database Connected
                        </div>

                    </div>

                </div>

                <div
                    style={{
                        width: "400px",
                        background: "#1e293b",
                        padding: "50px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center"
                    }}
                >

                    <h2
                        style={{
                            color: "white",
                            textAlign: "center",
                            marginBottom: "10px"
                        }}
                    >
                        SOC Login
                    </h2>

                    <p
                        style={{
                            color: "#94a3b8",
                            textAlign: "center",
                            marginBottom: "30px"
                        }}
                    >
                        Security Operations Center
                    </p>

                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) =>
                            setUsername(
                                e.target.value
                            )
                        }
                        style={{
                            width: "100%",
                            padding: "14px",
                            marginBottom: "15px",
                            borderRadius: "10px",
                            border:
                                "1px solid #334155",
                            background: "#0f172a",
                            color: "white",
                            outline: "none",
                            boxSizing:
                                "border-box"
                        }}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(
                                e.target.value
                            )
                        }
                        style={{
                            width: "100%",
                            padding: "14px",
                            marginBottom: "20px",
                            borderRadius: "10px",
                            border:
                                "1px solid #334155",
                            background: "#0f172a",
                            color: "white",
                            outline: "none",
                            boxSizing:
                                "border-box"
                        }}
                    />

                    <button
                        onClick={login}
                        style={{
                            width: "100%",
                            padding: "14px",
                            border: "none",
                            borderRadius: "10px",
                            cursor: "pointer",
                            color: "white",
                            fontWeight: "bold",
                            fontSize: "16px",
                            background:
                                "linear-gradient(90deg,#2563eb,#06b6d4)"
                        }}
                    >
                        Sign In
                    </button>

                </div>

            </div>

        </div>

    );

}