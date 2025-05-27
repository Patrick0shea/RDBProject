import React from 'react';

interface PasswordProps {
  value: string;
  onChange: (newVal: string) => void;
  style?: React.CSSProperties;
}

export function PasswordField({ value, onChange, style }: PasswordProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder="############"
      style={style}
    />
  );
}
