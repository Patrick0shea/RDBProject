import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLoginPage: React.FC = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [ID, setID] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const loginData = { name, password };

    try {
      const response = await fetch("http://localhost:8000/admin-login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Login failed");

      try {
        localStorage.setItem("user_type", "2");
      } catch (storageError: any) {
        setErrorMsg("Could not save login state—storage is disabled or full.");
        console.error("localStorage error:", storageError);
        return;
      }



      try {
        navigate("/admin-dashboard");
      } catch (navError: any) {
        setErrorMsg("Unexpected error navigating to dashboard. Please refresh.");
        console.error("navigate() error:", navError);
      }
    } catch (error: any) {
      /* This catches:
       network errors from fetch()
       JSON parsing errors from response.json()
       anything thrown by response.ok check above */
      setErrorMsg(error.message || "Unexpected error — please try again.");
      console.error("handleLogin outer error:", error);
    }
  };

  return (
    <div
      className="admin-login-container"
      style={{
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <form
        onSubmit={handleLogin}
        className="company-list"
        style={{ maxWidth: "500px", padding: "4rem", maxHeight: "550px" }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "1rem" }}>
          Admin Login
        </h1>

        {errorMsg && (
          <div style={{ color: "red", marginBottom: "1rem" }}>{errorMsg}</div>
        )}

        <label style={{ display: "block", marginBottom: "1rem" }}>
          Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="admin-login-input"
            placeholder="Enter your name"
          />
        </label>

        <label style={{ display: "block", marginBottom: "1rem" }}>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="admin-login-input"
            placeholder="Enter your password"
          />
        </label>

        <label style={{ display: "block", marginBottom: "1rem" }}>
          Enter your ID
          <input
            type="password"
            value={ID}
            onChange={(e) => setID(e.target.value)}
            required
            className="admin-login-input"
            placeholder="Enter your ID"
          />
        </label>

        <button
          type="submit"
          className="admin-login-button"
          style={{ width: "100%", marginTop: "1.5rem" }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AdminLoginPage;
