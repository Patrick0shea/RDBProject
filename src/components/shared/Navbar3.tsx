import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Navbar3 = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8000/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      if (response.ok) {
        alert('Logged out successfully');
        navigate('/landing-page');
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('Logout failed:', errorData);
        alert(`Logout failed: ${errorData.message || 'Unexpected error occurred'}`);
      }
    } catch (error) {
      console.error('Error logging out:', error);
      alert('An error occurred while logging out. Please check your connection and try again.');
    }
  };

  return (
    <nav
      className="navbar"
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        backgroundColor: '#1F2937', // dark gray
        color: '#F9FAFB', // light text
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div className="nav-left">
        <Link
          to="/landing-page"
          style={{
            color: '#F9FAFB',
            textDecoration: 'none',
            fontSize: '1.25rem',
            fontWeight: 'bold',
          }}
        >
          Home
        </Link>
      </div>
      <div className="nav-right">
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: '#EF4444', // red
            border: 'none',
            color: '#FFFFFF',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: '500',
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar3;
