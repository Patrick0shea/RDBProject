import React from 'react';

interface PasswordProps {
  value: string;
  onChange: (newVal: string) => void;
  style?: React.CSSProperties;
  className?: string;
  placeholder?: string;
}
export function PasswordField({ value, onChange, style, className, placeholder }: PasswordProps) { 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      onChange(e.target.value);
    } catch (err: any) {
      console.error('Error in PasswordField onChange, check PasswordField.tsx:', err);
      alert('There was a problem updating the password. Please try again.');
    }
  };


  return (
    <input
      type="text" 
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      style={style}
      className={className}
    />
  );
}
