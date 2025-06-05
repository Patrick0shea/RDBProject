import React, { useState } from "react"; /* Imports react and the helper which lets a function rememebr and update values */
import { EmailField } from "../../forms/EmailField";
import { PasswordField } from "../../forms/PasswordField";
import { useNavigate } from "react-router-dom"; /* Allows redirection after login*/


export function AdminLogin() {
  const [firstName, setFirstName]       = useState("");
  const [lastName, setLastName]         = useState("");
  const [email, setEmail]               = useState("");
  const [password, setPassword]         = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate(); /* Calls the useNavigate hook, which returns a navigate function*/
  const [errorMsg, setErrorMsg] = useState<string | null>(null); /* It’s null when there is no error, or a string to display an error banner*/
  
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault(); // Prevent form reload
  setErrorMsg(null);  // Clear old errors

  // Basic validation
  if (!firstName.trim() || !lastName.trim()) {
    alert("First Name and Last Name are required.");
    return;
  }

  if (password !== confirmPassword) {
    setErrorMsg("Passwords do not match.");
    return;
  }

  const userType = 2; // 2 = company user type

  const formData = new FormData();
  formData.append("first_name", firstName);
  formData.append("last_name", lastName);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("password_confirmation", confirmPassword);
  formData.append("user_type", String(userType));

  try {
    const response = await fetch("http://localhost:8000/register", {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      // If it's a Laravel validation error
      if (data.errors) {
        const messages = Object.values(data.errors).flat().join("\n");
        setErrorMsg(messages);
      } else {
        setErrorMsg(data.message || "Registration failed.");
      }
      return;
    }

    alert("Registration successful!");
    // Redirect or reset form
  } catch (error) {
    console.error("Error registering:", error);
    setErrorMsg("An unexpected error occurred. Please try again.");
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
        onSubmit={handleSubmit}
        className="company-list"
        style={{ maxWidth: "500px", padding: "2.5rem" }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          Create Admin Account
        </h1>

        {errorMsg && ( /* If error message is not null render this  */
          <div style={{ color: "red", marginBottom: "1rem" }}>
            {errorMsg}
          </div>
        )}

        <label style={{ display: "block", marginBottom: "1rem" }}>
          First Name *
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            placeholder="First Name"
            className="admin-login-input"
          />
        </label>

        <label style={{ display: "block", marginBottom: "1rem" }}>
          Last Name *
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            placeholder="Last Name"
            className="admin-login-input"
          />
        </label>

        <label style={{ display: "block", marginBottom: "1rem" }}>
          Email *
          <EmailField
            value={email}
            onChange={setEmail}
            className="admin-login-input"
          />
        </label>

        <label style={{ display: "block", marginBottom: "1rem" }}>
          Password *
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Re-enter your password"
            className="admin-login-input"
          />
        </label>

        <label style={{ display: "block", marginBottom: "1rem" }}>
          Confirm Password *
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="Re-enter your password"
            className="admin-login-input"
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
}
