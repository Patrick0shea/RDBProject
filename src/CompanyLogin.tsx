// src/pages/CompanyLogin.tsx
import React, { useState } from "react";
import { EmailField } from "../components/EmailField"; /* put className?: string; */
import { PasswordField } from "../components/PasswordField"; /* put className?: string; */
import { useNavigate } from "react-router-dom";

export function CompanyLogin() {
  const [email, setEmail]             = useState("");
  const [password, setPassword]       = useState("");
  const [companyName, setCompanyName] = useState("");
  const [numberOfJobs, setNumberOfJobs] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobSalary, setJobSalary]     = useState("");
  const navigate                      = useNavigate();

  return (
    <div
      className="dashboard-container"
      style={{ height: "100vh", justifyContent: "center", alignItems: "center" }}
    >
      <div className="company-list" style={{ maxWidth: "600px" }}>
        <h1 className="ranking-title" style={{ marginBottom: "1.5rem" }}>
          Create Company Account
        </h1>

        <div style={{ marginBottom: "1rem" }}>
          <label style={{ color: "#374151", display: "block" }}>
            Company Name:
          </label>
          <input
            type="text"
            value={companyName}
            onChange={e => setCompanyName(e.target.value)}
            placeholder="Enter your company name"
            className="input-field"
            required
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label style={{ color: "#374151", display: "block" }}>
            Number of Jobs:
          </label>
          <input
            type="number"
            value={numberOfJobs}
            onChange={e => setNumberOfJobs(e.target.value)}
            placeholder="How many jobs are you posting?"
            className="input-field"
            required
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label style={{ color: "#374151", display: "block" }}>
            Job Description:
          </label>
          <input
            type="text"
            value={jobDescription}
            onChange={e => setJobDescription(e.target.value)}
            placeholder="Describe the role you are hiring for"
            className="input-field"
            required
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label style={{ color: "#374151", display: "block" }}>
            Expected Monthly Salary:
          </label>
          <input
            type="number"
            value={jobSalary}
            onChange={e => setJobSalary(e.target.value)}
            placeholder="€ X,XXX"
            className="input-field"
            required
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label style={{ color: "#374151", display: "block" }}>
            Work Email:
          </label>
          <EmailField
            value={email}
            onChange={setEmail}
            className="input-field"
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label style={{ color: "#374151", display: "block" }}>
            Password:
          </label>
          <PasswordField
            value={password}
            onChange={setPassword}
            className="input-field"
          />
        </div>

        <button
          type="button"
          className="submit-button"
          onClick={() => navigate("/company-dashboard")}
          style={{ width: "100%", marginTop: "1rem" }}
          /* navigation? */
        >
          Submit
        </button>
      </div>
    </div>
  );
}
