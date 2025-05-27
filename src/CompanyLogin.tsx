import React, { useState } from "react";
import { EmailField } from "./EmailField";
import { PasswordField } from "./PasswordField";

export function CompanyLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [numberOfJobs, setNumberOfJobs] = useState("");
  const [jobDescription, setjobDescription] = useState("");
  const [jobSalary, setjobSalary] = useState("");



  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        margin: 0,
        fontFamily: "sans-serif",
        background: "#0F172A",
      }}
    >
      <div
        style={{
          width: "600px",
          background: "#FFF",
          borderRadius: "8px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          padding: "2rem",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#10B981",
            marginBottom: "1.5rem",
          }}
        >
          Create Company Account
        </h1>

        <div style={{ marginBottom: "1rem" }}>
          <label style={{ color: "#374151" }}>Company Name:</label>
          <br />
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Enter your company name"
            style={fieldStyle}
            required
          />
        </div>

  
           {/* Num of Jobs*/}
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ color: "#374151" }}>Number of Jobs:</label>
          <br />
          <input
            type="number"
            value={numberOfJobs}
            onChange={(e) => setNumberOfJobs(e.target.value)}
            placeholder="How many jobs are you posting?"
            style={fieldStyle}
            required
          />
        </div>


           {/* Job Description */}
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ color: "#374151" }}>Job Description:</label>
          <br />
          <input
            type="text"
            value={jobDescription}
            onChange={(e) => setjobDescription(e.target.value)}
            placeholder="Describe the role you are hiring for"
            style={fieldStyle}
            required
          />
        </div>



          {/* Monthly Salary*/}
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ color: "#374151" }}>Expected Monthly Salary:</label>
          <br />
          <input
            type="number"
            value={jobSalary}
            onChange={(e) => setjobSalary(e.target.value)}
            placeholder="€ X,XXX"
            style={fieldStyle}
            required
          />
        </div>

        {/* Email */}
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ color: "#374151" }}>Work Email:</label>
          <br />
          <EmailField value={email} onChange={setEmail} 
          style={fieldStyle} />
        </div>

        {/* Password */}
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ color: "#374151" }}>Password:</label>
          <br />
          <PasswordField
            value={password}
            onChange={setPassword}
            style={fieldStyle}
          />
        </div>

        <button style={submitStyle}>Submit</button>
      </div>
    </div>
  );
}

// Shared styles for inputs
const fieldStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.75rem",
  border: "1px solid #D1FAE5",
  borderRadius: "4px",
  background: "#F0FDF4",
  color: "#1F2937",
};

// Shared style for submit button
const submitStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.75rem",
  marginTop: "1rem",
  background: "#10B981",
  color: "#FFF",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "1rem",
  fontWeight: "bold",
};
