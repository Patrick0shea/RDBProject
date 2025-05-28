import React, { useState } from "react";
import { EmailField } from "./EmailField"; // Make sure EmailField supports className and onChange
import { PasswordField } from "./PasswordField"; // Make sure PasswordField supports className and onChange
import { useNavigate } from "react-router-dom";

export function CompanyLogin() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [address, setAddress] = useState("");
  const [cv, setCv] = useState<File | null>(null);
  const [companyName, setCompanyName] = useState("");

  // NEW STATES
  const [numberOfJobs, setNumberOfJobs] = useState<number | "">("");
  const [salary, setSalary] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCv(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName.trim() || !lastName.trim()) {
      alert("First Name and Last Name are required.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const userType = 1; // company user type

    // First Request: Register user
    const formData = new FormData();
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("password_confirmation", confirmPassword);
    formData.append("linkedin", linkedin);
    formData.append("github", github);
    formData.append("address", address);
    formData.append("user_type", String(userType));
    formData.append("company_name", companyName);
    if (cv) formData.append("cv", cv);

    try {
      const res1 = await fetch("http://localhost:8000/register", {
        method: "POST",
        credentials: 'include',
        body: formData,
      });

      const text1 = await res1.text();
      let userData: any = {};
      try {
        userData = JSON.parse(text1);
      } catch {
        console.warn("First response is not JSON:", text1);
      }

      if (!res1.ok) {
        throw new Error(userData.message || "Registration failed");
      }

      // Extract company_id from the registration response
      const companyId = userData.company_id;
      if (!companyId) {
        throw new Error("Company ID not found in registration response");
      }

      // Second Request: Post job info
      const jobResponse = await fetch("http://localhost:8000/create-residency", {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          company_id: companyId,
          count: numberOfJobs === "" ? 0 : Number(numberOfJobs),
          salary,
          description: jobDescription,
        }),
      });

      const jobText = await jobResponse.text();
      let jobData: any = {};
      try {
        jobData = JSON.parse(jobText);
      } catch {
        console.warn("Second response is not JSON:", jobText);
      }

      if (!jobResponse.ok) {
        throw new Error(jobData.message || "Job post failed");
      }

      // Save user type and redirect
      localStorage.setItem("user_type", String(userType));
      navigate("/company-dashboard");

    } catch (err: any) {
      alert(`Something went wrong!\n${err?.message || "Unknown error"}`);
    }
  };

  return (
    <div
      className="dashboard-container"
      style={{ height: "100vh", justifyContent: "center", alignItems: "center" }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: 600,
          width: "100%",
          padding: "2rem",
          background: "#F0FDF4",
          borderRadius: 12,
        }}
      >
        <h1 style={{ marginBottom: "1.5rem", textAlign: "center" }}>
          Create Company Account
        </h1>

        {/* Existing fields here... */}

        <label style={{ display: "block", marginBottom: "1rem" }}>
          Number of Jobs *
          <input
            type="number"
            min={0}
            value={numberOfJobs}
            onChange={(e) => setNumberOfJobs(e.target.value === "" ? "" : Number(e.target.value))}
            required
            placeholder="Number of available jobs"
            className="input-field"
            style={{
              width: "100%",
              padding: "0.75rem",
              borderRadius: 6,
              border: "1px solid #A3E635",
            }}
          />
        </label>

        <label style={{ display: "block", marginBottom: "1rem" }}>
          Salary *
          <input
            type="text"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            required
            placeholder="Salary offered"
            className="input-field"
            style={{
              width: "100%",
              padding: "0.75rem",
              borderRadius: 6,
              border: "1px solid #A3E635",
            }}
          />
        </label>

        <label style={{ display: "block", marginBottom: "1rem" }}>
          Job Description *
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            required
            placeholder="Describe the job role"
            className="input-field"
            style={{
              width: "100%",
              padding: "0.75rem",
              borderRadius: 6,
              border: "1px solid #A3E635",
              minHeight: 100,
              resize: "vertical",
            }}
          />
        </label>

        {/* Rest of your fields below */}
        {/* First Name, Last Name, Company Name, LinkedIn, GitHub, Address, Email, Password, Confirm Password, Upload CV */}

        {/* You can reorder if needed */}

        <label style={{ display: "block", marginBottom: "1rem" }}>
          First Name *
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            placeholder="First Name"
            className="input-field"
            style={{
              width: "100%",
              padding: "0.75rem",
              borderRadius: 6,
              border: "1px solid #A3E635",
            }}
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
            className="input-field"
            style={{
              width: "100%",
              padding: "0.75rem",
              borderRadius: 6,
              border: "1px solid #A3E635",
            }}
          />
        </label>

        <label style={{ display: "block", marginBottom: "1rem" }}>
          Company Name *
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
            placeholder="Enter your company name"
            className="input-field"
            style={{
              width: "100%",
              padding: "0.75rem",
              borderRadius: 6,
              border: "1px solid #A3E635",
            }}
          />
        </label>

        <label style={{ display: "block", marginBottom: "1rem" }}>
          LinkedIn
          <input
            type="url"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            placeholder="https://www.linkedin.com/in/yourprofile"
            className="input-field"
            style={{
              width: "100%",
              padding: "0.75rem",
              borderRadius: 6,
              border: "1px solid #A3E635",
            }}
          />
        </label>

        <label style={{ display: "block", marginBottom: "1rem" }}>
          GitHub
          <input
            type="url"
            value={github}
            onChange={(e) => setGithub(e.target.value)}
            placeholder="https://github.com/yourusername"
            className="input-field"
            style={{
              width: "100%",
              padding: "0.75rem",
              borderRadius: 6,
              border: "1px solid #A3E635",
            }}
          />
        </label>

        <label style={{ display: "block", marginBottom: "1rem" }}>
          Address
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Eircode"
            className="input-field"
            style={{
              width: "100%",
              padding: "0.75rem",
              borderRadius: 6,
              border: "1px solid #A3E635",
            }}
          />
        </label>

        <label style={{ display: "block", marginBottom: "1rem" }}>
          Email *
          <EmailField
            value={email}
            onChange={setEmail}
            className="input-field"
            required
            style={{
              width: "100%",
              padding: "0.75rem",
              borderRadius: 6,
              border: "1px solid #A3E635",
            }}
          />
        </label>

        <label style={{ display: "block", marginBottom: "1rem" }}>
          Password *
          <PasswordField
            value={password}
            onChange={setPassword}
            className="input-field"
            required
            style={{
              width: "100%",
              padding: "0.75rem",
              borderRadius: 6,
              border: "1px solid #A3E635",
            }}
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
            className="input-field"
            style={{
              width: "100%",
              padding: "0.75rem",
              borderRadius: 6,
              border: "1px solid #A3E635",
            }}
          />
        </label>

        <label style={{ display: "block", marginBottom: "1rem" }}>
          Upload CV
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="input-field"
            style={{
              width: "100%",
              padding: "0.75rem",
              borderRadius: 6,
              border: "1px solid #A3E635",
            }}
          />
        </label>

        <button
          type="submit"
          className="submit-button"
          style={{
            width: "100%",
            padding: "0.75rem",
            fontSize: "1rem",
            borderRadius: 6,
            border: "none",
            background: "#22C55E",
            color: "#FFFFFF",
            cursor: "pointer",
            marginTop: "1.5rem",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
