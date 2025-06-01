import React from 'react';

interface confirmPasswordProps {
  value: string;
  onChange: (newVal: string) => void;
  style?: React.CSSProperties;
  className?: string;
}

export function confirmPasswordProps({ value, onChange, style, className }: confirmPasswordProps) {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      onChange(e.target.value);
    } catch (err: any) {
      console.error('Error in confirmPasswordField onChange, check confirmPasswordField.tsx:', err);
      alert('There was a problem confirming the password. Please try again.');
    }
  };

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      placeholder="############"
      style={style}
      className={className}
    />
  );
}
