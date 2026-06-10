export default function Navbar() {

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const logout = () => {

        localStorage.removeItem(
            "user"
        );

        window.location.href =
            "/login";

    };

    return (

        <div
            style={{
                background: "#111827",
                color: "white",
                padding: "15px 25px",
                borderRadius: "12px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
                border: "1px solid #334155"
            }}
        >

            <div>

                <h1
                    style={{
                        fontSize: "28px",
                        fontWeight: "bold",
                        margin: 0
                    }}
                >
                    Smart Building Command Center
                </h1>

                <p
                    style={{
                        color: "#94a3b8",
                        marginTop: "5px"
                    }}
                >
                    Real-Time Security Operations Center
                </p>

            </div>

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "15px"
                }}
            >

                <div
                    style={{
                        textAlign: "right"
                    }}
                >

                    <div
                        style={{
                            fontWeight: "bold"
                        }}
                    >
                        {user?.username}
                    </div>

                    <div
                        style={{
                            color: "#22c55e",
                            fontSize: "14px"
                        }}
                    >
                        ● {user?.role}
                    </div>

                </div>

                <button
                    onClick={logout}
                    style={{
                        background: "#dc2626",
                        color: "white",
                        border: "none",
                        padding: "10px 16px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontWeight: "bold"
                    }}
                >
                    Logout
                </button>

            </div>

        </div>

    );

}