// src/EmailField.tsx
import React from 'react';

interface EmailFieldProps {
  value: string;
  onChange: (newVal: string) => void;
  style?: React.CSSProperties;
  className?: string;
}

export function EmailField({ value, onChange, style, className }: EmailFieldProps) { /* : = The object we’re destructuring must match the EmailFieldProps type.*/
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      onChange(e.target.value);
    } catch (err: any) {
      console.error('Error in EmailField onChange, check EmailField.tsx:', err);
      alert('There was a problem updating the email. Please try again.');
    }
  };

  return (
    <input
      type="email"
      value={value}
      onChange={handleChange}
      placeholder="name@email.com"
      style={style} 
      className={className}
    />
  );
}