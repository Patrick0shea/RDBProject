import React from 'react';

interface PasswordProps {
  value: string;
  onChange: (newVal: string) => void;
  style?: React.CSSProperties;
  className?: string;
}

export function PasswordField({ value, onChange, style, className }: PasswordProps) {
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
      type="text" // not password so users can see what they're typing
      value={value}
      onChange={handleChange}
      placeholder="############"
      style={style}
      className={className}
    />
  );
}
