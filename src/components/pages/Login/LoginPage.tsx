import React, { useState } from 'react';
import { useNavigate }      from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [firstName, setFirstName]     = useState('');
  const [lastName, setLastName]       = useState('');
  const [email, setEmail]             = useState('');
  const [password, setPassword]       = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [linkedin, setLinkedin]       = useState('');
  const [github, setGithub]           = useState('');
  const [address, setAddress]         = useState('');
  const [cv, setCv]                   = useState<File | null>(null);
  const [role, setRole]               = useState<'user'|'company'|'admin'>('user');
  const [studentId, setStudentId]     = useState('');
  const [companyName, setCompanyName] = useState('');
  const navigate                       = useNavigate();
  const [errorMsg, setErrorMsg]             = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (e.target.files?.[0]) setCv(e.target.files[0]);
    } catch (err: any) {
      console.error('File selection error:', err);
      setErrorMsg('Couldn’t select your CV. Please try again.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    // stops the browser from reloading the page
    e.preventDefault();
    // clears any old errors, so we start fresh.
    setErrorMsg(null);

    
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match.');
      }

    const formData = new FormData();
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('password_confirmation', confirmPassword);
    formData.append('linkedin', linkedin);
    formData.append('github', github);
    formData.append('address', address);
    formData.append('user_type', '0');
    if (cv) formData.append('cv', cv);

    formData.append('student_id', studentId);

    fetch('http://localhost:8000/register', {
      method: 'POST',
      credentials: 'include',
      body: formData,
    })
      .then(async (res) => {
        const text = await res.text();
        let data = {};
        try {
          data = JSON.parse(text);
        } catch {
          console.warn('Response is not JSON:', text);
        }

        if (!res.ok) {
          throw new Error((data as any).message || 'Server error occurred');
        }

        try {
          navigate('/user-dashboard');
        } catch (navErr: any) {
          console.error('Navigation error:', navErr);
          throw new Error('Registration succeeded but navigation failed.');
        }
      })
      
      .catch((err) => {
        console.error('Error during fetch:', err);
        alert(`Something went wrong!\n${err?.message || 'Unknown error'}`);
      });
  }; 


  return (
    <div
      className="admin-login-container"
      style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}
    >
      <form
        onSubmit={handleSubmit}
        className="company-list"
        style={{ maxWidth: '500px', padding: '2.5rem' }}
      >
        <h1 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Create Student Account</h1>


        <label style={{ display: 'block', marginBottom: '1rem' }}>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            placeholder="First Name"
            className="admin-login-input"
            required
          />
        </label>

        <label style={{ display: 'block', marginBottom: '1rem' }}>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            placeholder="Last Name"
            className="admin-login-input"
            required
          />
        </label>

        <label style={{ display: 'block', marginBottom: '1rem' }}>
          Email
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="admin-login-input"
            required
          />
        </label>

        <label style={{ display: 'block', marginBottom: '1rem' }}>
          Password
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="admin-login-input"
            required
          />
        </label>

        <label style={{ display: 'block', marginBottom: '1rem' }}>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            placeholder="Re-enter your password"
            className="admin-login-input"
            required
          />
        </label>

        <label style={{ display: 'block', marginBottom: '1rem' }}>
          LinkedIn
          <input
            type="url"
            value={linkedin}
            onChange={e => setLinkedin(e.target.value)}
            placeholder="https://linkedin.com/in/you"
            className="admin-login-input"
          />
        </label>

        <label style={{ display: 'block', marginBottom: '1rem' }}>
          GitHub
          <input
            type="url"
            value={github}
            onChange={e => setGithub(e.target.value)}
            placeholder="https://github.com/you"
            className="admin-login-input"
          />
        </label>

        <label style={{ display: 'block', marginBottom: '1rem' }}>
          Home Address
          <input
            type="text"
            value={address}
            onChange={e => setAddress(e.target.value)}
            placeholder="Eircode"
            className="admin-login-input"
          />
        </label>

        {role === 'user' && (
          <label style={{ display: 'block', marginBottom: '1rem' }}>
            Student ID
            <input
              type="text"
              value={studentId}
              onChange={e => setStudentId(e.target.value)}
              placeholder="Enter your student ID"
              className="admin-login-input"
              required
            />
          </label>
        )}

        {role === 'company' && (
          <label style={{ display: 'block', marginBottom: '1rem' }}>
            Company Name
            <input
              type="text"
              value={companyName}
              onChange={e => setCompanyName(e.target.value)}
              placeholder="Enter your company name"
              className="admin-login-input"
              required
            />
          </label>
        )}

        <label style={{ display: 'block', marginBottom: '1rem' }}>
          Upload CV
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="admin-login-input"
          />
        </label>

        <button
          type="submit"
          className="admin-login-button"
          style={{ width: '100%', marginTop: '1.5rem' }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default LoginPage;