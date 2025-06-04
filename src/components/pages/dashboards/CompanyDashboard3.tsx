import React, { Component } from "react"; // Used to create class-based components not functional components
import { Routes, Route } from "react-router-dom"; // Defining and handling different routes/pages in the app
import CompanyHomePage from "../HomePages/CompanyHomePage"; // Importing Company Home Page with all the content and logic for the company dashboard

/**
 * RouteErrorBoundary is a class-based component used as an **Error Boundary**.
 * 
 * Purpose:
 * - Catches rendering errors in its child components.
 * - Prevents the entire app from crashing when an error occurs in a specific part of the component tree.
 * - Displays a fallback UI when an error is caught.
  *
 */
class RouteErrorBoundary extends Component<
  { children: React.ReactNode }, // Props type: expects children components (JSX) to be passed in
  { hasError: boolean }          // State type: keeps track of error occurrence
> {

  constructor(props: any) {
    super(props); // Required to call the parent class constructor with props
    this.state = { hasError: false }; // Initialize error state
  }

  /**
   * getDerivedStateFromError is a React lifecycle method.
   * 
   * Purpose:
   * - Runs when an error is thrown in a child component.
   * - Allows us to update state so we can show fallback UI on the next render.
   * 
  */
  static getDerivedStateFromError(_: Error) { //Static as it doesn't need access to instance properties
    return { hasError: true }; // Update state to trigger rendering of fallback UI
  }

  /**
   * componentDidCatch is another React lifecycle method for class components.
   * 
   * Purpose:
   * - Called after an error is thrown and caught.
   * - Allows you to log the error or report it to an error tracking service.
   * 
   * Parameters:
   * - `error`: The actual error object thrown.
   * - `errorInfo`: Additional info about the component stack where the error occurred.
   */
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error rendering routes:", error, errorInfo); // Log the error details to the console
  }

  /**
   * The render method decides what should be shown in the DOM.
   * - If there's an error (`hasError` is true), display a simple error message.
   * - Otherwise, render the child components passed into the boundary.
   */
  render() {
    if (this.state.hasError) {
      return (
        <p style={{ color: "red" }}>
          Something went wrong while loading the dashboard.
        </p>
      );
    }

    return this.props.children; // No error: continue rendering children normally
  }
}

/**
 * CompanyDashboard is a functional React component.
 * 
 * Purpose:
 * - Serves as the main dashboard for a company user.
 * - Defines routing for internal views/pages (in this case, only one route is defined).
 * - Wraps its content in the `RouteErrorBoundary` to gracefully handle errors.
 * 
 */
const CompanyDashboard: React.FC = () => { // React.FC is a TypeScript type for functional components
  return (
    <div className="App">
      {/* Wrap routes in an error boundary to catch errors during navigation/rendering */}
      <RouteErrorBoundary>
        <Routes>
          {/* Route defines which component to show when the user is at a specific URL */}
          <Route path="/" element={<CompanyHomePage />} />
          {/*
            - `path="/"`: The root path of the dashboard.
            - `element={<CompanyHomePage />}`: The component to render at that route.
          */}
        </Routes>
      </RouteErrorBoundary>
    </div>
  );
};

// Export this component so it can be imported and used in other parts of the app
export default CompanyDashboard;
