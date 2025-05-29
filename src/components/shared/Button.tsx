import React from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
  style?: React.CSSProperties;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  style,
  className = '',
  type = 'button',
}) => {
  const handleClick = () => {
    try {
      onClick();
    } catch (error) {
      console.error('Error occurred during button click:', error);
      // Optionally, you could show a UI message here
      alert('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      className={`btn ${className}`.trim()}
      style={style}
    >
      {label}
    </button>
  );
};
