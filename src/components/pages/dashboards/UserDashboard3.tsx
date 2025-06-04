import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Used for client-side routing
import UserHomePage from '../HomePages/UserHomePage'; // Importing the component to be rendered on the user homepage

/**
 * UserDashboard is a functional component that serves as the dashboard for a student
 * 
 * Key Concepts:
 * - React.FC: TypeScript generic type used to annotate functional components
 * - This component defines a local function `renderRoutes()` to encapsulate route handling logic.
 * 
 */
const UserDashboard: React.FC = () => {

  /**
   * renderRoutes is a helper function used to render routing logic for the user dashboard.
   * 
   * Purpose:
   * - Encapsulates the route structure.
   * - Uses a try/catch block to catch any runtime errors during route rendering.
   * 
   */
  const renderRoutes = () => {
    try {
      return (
        <Routes>
          {/* Define a single route path: root "/" */}
          <Route path="/" element={<UserHomePage />} />
          {/*
            - `path="/"`: This is the default route for the user dashboard.
            - `element={<UserHomePage />}`: This tells React Router to render the `UserHomePage` component when the path is matched.
          */}
        </Routes>
      );
    } catch (error) {
      // Catch any rendering errors and log them
      console.error('Error rendering user dashboard routes:', error);
      
      // Return a simple fallback UI if there's an error
      return (
        <p style={{ color: 'red' }}>
          Something went wrong while loading the user dashboard.
        </p>
      );
    }
  };

  /**
   * The component's return statement renders a div that contains the route logic.
   * 
   */
  return <div className="App">{renderRoutes()}</div>; // Tied to App.css which acts as a container for layout and styling
};

// Exporting the component so it can be used elsewhere
export default UserDashboard;
