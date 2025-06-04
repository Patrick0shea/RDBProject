// Importing React for JSX and types
import React from 'react';

// Type definition for the Button component's props
type ButtonProps = {
  label: string;                    // The text label to display inside the button
  onClick: () => void;              // Callback function to be triggered when the button is clicked
  className?: string;              // Optional CSS class name(s) for styling the button
  style?: React.CSSProperties;     // Optional inline styles as a React style object
  type?: 'button' | 'submit' | 'reset'; // Optional button type (defaults to 'button')
};

// Reusable Button component
export const Button: React.FC<ButtonProps> = ({
  label,            // Text to show inside the button
  onClick,          // Function to execute on click
  className = '',   // Default to empty string if no class provided
  style = {},       // Default to empty style object
  type = 'button',  // Default to a regular button (not submit/reset)
}) => {
  // Click handler wraps the provided onClick function in a try/catch
  const handleClick = () => {
    try {
      onClick(); // Call the passed-in click handler
    } catch (error) {
      // Catch any runtime errors from the user's callback and alert the user
      console.error('Error occurred during button click:', error);
      alert('An unexpected error occurred. Please try again.');
    }
  };

  // Render a standard HTML <button> element with props applied
  return (
    <button
      type={type}               // Sets button behavior: 'button', 'submit', or 'reset'
      onClick={handleClick}     // Attach our safe click handler
      className={className}     // Allow custom class names for styling
      style={style}             // Allow inline styles via props
    >
      {label}
    </button>
  );
};
