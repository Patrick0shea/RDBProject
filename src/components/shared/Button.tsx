// src/components/shared/Button.tsx
import React from 'react';

type ButtonProps = {
  label: string;
  onClick: () => void;
  className?: string;
  style?: React.CSSProperties;
  type?: 'button' | 'submit' | 'reset';
};

export const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  className = '',
  style = {},
  type = 'button',
}) => {
  const handleClick = () => {
    try {
      onClick();
    } catch (error) {
      console.error('Error occurred during button click:', error);
      alert('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <button type={type} onClick={handleClick} className={className} style={style}>
      {label}
    </button>
  );
};
