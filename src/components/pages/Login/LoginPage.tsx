import React, { useState } from 'react'; /* Imports react and the helper which lets a function rememebr and update values */
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
  const [studentId, setStudentId]     = useState('');
  const navigate                       = useNavigate();
  const [errorMsg, setErrorMsg]             = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (e.target.files?.[0]) { /* checks if user picked a file, if they did we enter the block if not we skip. */
        setCv(e.target.files[0]);
        setErrorMsg(null);       // Clear previous errors when a file succeeds
      }
    } catch (err: any) {
      console.error('File selection error:', err);
      setErrorMsg('Could not select your CV. Please try again.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    // stops the browser from reloading the page
    e.preventDefault();
    // clears any old errors, so we start fresh.
    setErrorMsg(null);

    
      if (password !== confirmPassword) {
        setErrorMsg('Passwords do not match.');
        return;
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

    /* Aaron */

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

        /* aaron */

        try {
          navigate('/user-dashboard');
        } catch (navErr: any) {
          console.error('Navigation error:', navErr);
          throw new Error('Registration succeeded but navigation failed.');
        }
      })
      
      .catch((err) => { /* for the throw's not try's*/ 
        console.error('Error during fetch:', err);
        alert(`Something went wrong!\n${err?.message}`);
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

        {errorMsg && (
        <div
          style={{
            backgroundColor: '#fdecea',
            color: '#b71c1c',
            padding: '0.75rem 1rem',
            borderRadius: '4px',
            marginBottom: '1rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span>{errorMsg}</span>
          <button
            onClick={() => setErrorMsg(null)}
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: '1.2rem',
              lineHeight: '1',
              cursor: 'pointer',
            }}
          >
            x {/* x so the user can close the error message */}
          </button>
        </div>
      )}


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