import React, { useState } from "react"; /* Imports react and the helper which lets a function rememebr and update values */
import { EmailField } from "../../forms/EmailField";
import { PasswordField } from "../../forms/PasswordField";
import { useNavigate } from "react-router-dom"; /* Allows redirection after login*/


export function CompanyLogin() {
  const [firstName, setFirstName]       = useState("");
  const [lastName, setLastName]         = useState("");
  const [email, setEmail]               = useState("");
  const [password, setPassword]         = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [linkedin, setLinkedin]         = useState("");
  const [address, setAddress]           = useState("");
  const [companyName, setCompanyName]   = useState("");
  const [numberOfJobs, setNumberOfJobs] = useState<number | "">(""); /* Can hold a empty string or a number*/
  const [salary, setSalary]             = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const navigate = useNavigate(); /* Calls the useNavigate hook, which returns a navigate function*/
  const [errorMsg, setErrorMsg] = useState<string | null>(null); /* It’s null when there is no error, or a string to display an error banner*/

  
  const handleSubmit = async (e: React.FormEvent) => { /* called when the form is submitted*/
    e.preventDefault(); /* Prevents a full page reload, instead handles in in JSX*/
    setErrorMsg(null); /* Clears any previous error message*/


    /*(client-side validation) checks that both firstName and lastName are non‐empty */
    if (!firstName.trim() || !lastName.trim()) {
      alert("First Name and Last Name are required.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const userType = 1; /* company user type*/
    /* Make a new, empty container(object) to collect form values before sending */
    const formData = new FormData();
    /* adds the form data to the form data object */
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("password_confirmation", confirmPassword);
    formData.append("linkedin", linkedin);
    formData.append("address", address);
    formData.append("user_type", String(userType));
    formData.append("company_name", companyName);


    /* must ask aaron */

    try {
      const res1 = await fetch("http://localhost:8000/register", {
        method: "POST",
        credentials: "include",
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
      const companyId = userData.company_id;
      if (!companyId) {
        throw new Error("Company ID not found in registration response");
      }

      const jobResponse = await fetch("http://localhost:8000/create-residency", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
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

      try {
        localStorage.setItem("user_type", "1");
      } catch (storageErr: any) {
        console.error("localStorage error:", storageErr);
        setErrorMsg("Could not save login state—storage is disabled or full.");
        return;
      }

      try {
        navigate("/company-dashboard");
      } catch (navErr: any) {
        console.error("Navigation error:", navErr);
        setErrorMsg("Registration succeeded but redirect failed. Please refresh.");
      }

    } catch (err: any) {
      console.error("Error during registration flow:", err);
      setErrorMsg(err?.message || "Something went wrong—please try again.");
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
          Create Company Account
        </h1>

        {errorMsg && ( /* If error message is not null render this  */
          <div style={{ color: "red", marginBottom: "1rem" }}>
            {errorMsg}
          </div>
        )}

        <label style={{ display: "block", marginBottom: "1rem" }}>
          Number of Jobs *
          <input
            type="number"
            min={0}
            value={numberOfJobs}
            onChange={(e) =>
              setNumberOfJobs(e.target.value === "" ? "" : Number(e.target.value)) /* Takes input and updates it to be either a empty or numeric value*/
            }
            required
            placeholder="Number of available jobs"
            className="admin-login-input"
          />
        </label>

        <label style={{ display: "block", marginBottom: "1rem" }}>
          Salary *
          <input
            type="text"
            value={salary}
            /* Every time the user types or edits the field, React calls this function with the change event e */
            onChange={(e) => setSalary(e.target.value)} /* e.target.value is the string the user has typed so far, passing it to setSalary updates the salary state*/
            required
            placeholder="Salary offered"
            className="admin-login-input"
          />
        </label>

        <label style={{ display: "block", marginBottom: "1rem" }}>
          Job Description *
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            required
            placeholder="Describe the job role"
            className="admin-login-input"
            style={{ minHeight: "100px", resize: "vertical" }}
          />
        </label>

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
          Company Name *
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
            placeholder="Enter your company name"
            className="admin-login-input"
          />
        </label>

        <label style={{ display: "block", marginBottom: "1rem" }}>
          LinkedIn
          <input
            type="url"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            placeholder="https://www.linkedin.com/in/yourprofile"
            className="admin-login-input"
          />
        </label>

        <label style={{ display: "block", marginBottom: "1rem" }}>
          Address
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Eircode"
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
          <PasswordField
            value={password}
            onChange={setPassword}
            className="admin-login-input"
            placeholder="Enter your password"
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
