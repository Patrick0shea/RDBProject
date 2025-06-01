// src/components/Button.tsx
import React from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
  style?: React.CSSProperties;
  className?: string;
}

export function Button({ label, onClick, style, className }: ButtonProps) {

  const handleClick = () => {
    try {
      onClick();
    } catch (err: any) {
      console.error('Error in Button onClick, check the button.tsx file:', err);
      alert('Something went wrong. Please try again.');
    }
  };
  return (
    <button
    onClick={handleClick}
    className={className}
    style={style}>{label}
    </button>
);
}