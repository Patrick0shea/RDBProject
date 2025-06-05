import React from 'react'; /* dont need use state as we are not updating state */
import { useNavigate } from 'react-router-dom';
import { Button } from '../shared/Button';
//import '../../styles/App.css';


/*valid URL's the program can go to
as const makes the array read only */
const VALID_PATHS = ['/login','/company-login','/admin-login-page', '/acc-login-page'] as const;

const LandingPageTest: React.FC = () => {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  const handleClick = (type: '0' | '1' | '2' | '3', path: string) => {
    /* check if the path is valid */
    if (!VALID_PATHS.includes(path as any)) {
      console.error(`Invalid path: ${path}`);
      setErrorMsg('Unknown route. Please contact support.');
      return;
    }

    /* we might not actually need this, must ask aaron */
    try {
      localStorage.setItem('userType', type);
    } catch (e: any) {
      console.error('Storage error:', e);
      setErrorMsg('Cannot save your choice—storage seems full or disabled.');
      return;
    }

    /*attemps to navigate to the path */
    try {
      navigate(path);
    } catch (e: any) {
      console.error('Navigation error:', e);
      setErrorMsg('Could not move forward—please refresh and try again.');
    }
  };

  return (
    <div className="admin-login-container">
      {/* if error message is not null, display it */}
      {errorMsg && (
        <div className="error-banner">
          {errorMsg}
          <button onClick={() => setErrorMsg(null)}>×</button>
        </div>
      )}
      <div
        className="admin-login-form"
        style={{ maxWidth: '500px', padding: '4rem', maxHeight: '550px' }}
      >
        <h2 className="admin-login-header">Who Are You?</h2>

        <Button
          label="Sign In"
          onClick={() => handleClick('3', '/acc-login-page')}
          className="admin-login-button"
        />
        <Button
          label="Create Student Account"
          onClick={() => handleClick('0', '/login')}
          className="admin-login-button"
        />
        <Button
          label="Create Company Account"
          onClick={() => handleClick('1', '/company-login')}
          className="admin-login-button"
        />
        <Button
          label="Create Admin Account"
          onClick={() => handleClick('2', '/admin-login-page')}
          className="admin-login-button"
        />
      </div>
    </div>
  );
}

export default LandingPageTest;
