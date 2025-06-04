import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * AdminLoginPage Component
 * ------------------------
 * Renders a login form specifically for admins.
 * Handles form input states, error display, login request, and navigation to the dashboard.
 */
const AdminLoginPage: React.FC = () => {
  // State for input fields and error handling
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [ID, setID] = useState(""); 
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const navigate = useNavigate(); // Used to redirect the user after login

  /**
   * handleLogin
   * -----------
   * Triggered when the login form is submitted.
   * Sends POST request to the backend with login credentials.
   * Handles success and failure cases (storage issues, server errors, navigation).
   */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior
    setErrorMsg(null);  // Clear any previous error messages

    const loginData = { name, password };

    try {
      const response = await fetch("http://localhost:8000/admin-login", {
        method: "POST",
        credentials: "include", // Include cookies for session handling
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Login failed");

      // Persist admin login status in localStorage
      try {
        localStorage.setItem("user_type", "2"); // Indicates admin
      } catch (storageError: any) {
        setErrorMsg("Could not save login state—storage is disabled or full.");
        console.error("localStorage error:", storageError);
        return;
      }

      // Navigate to the admin dashboard on successful login
      try {
        navigate("/admin-dashboard");
      } catch (navError: any) {
        setErrorMsg("Unexpected error navigating to dashboard. Please refresh.");
        console.error("navigate() error:", navError);
      }

    } catch (error: any) {
      // Catch any errors related to network, server, or unexpected behavior
      setErrorMsg(error.message || "Unexpected error — please try again.");
      console.error("handleLogin outer error:", error);
    }
  };

  /**
   * JSX Output
   * ----------
   * Form includes fields for name, password, and ID (though ID is unused).
   * Displays error messages, handles user input, and triggers login handler.
   */
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

        {/* Show error message if login fails */}
        {errorMsg && (
          <div style={{ color: "red", marginBottom: "1rem" }}>{errorMsg}</div>
        )}

        {/* Admin name input */}
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

        {/* Admin password input */}
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

        {/* Admin ID input (optional functionality - not used in login request) */}
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

        {/* Submit button */}
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
