// src/EmailField.tsx
import React from 'react';

interface EmailFieldProps {
  value: string;
  onChange: (newVal: string) => void;
  style?: React.CSSProperties;
  className?: string;
}

export function EmailField({ value, onChange, style }: EmailFieldProps) {
  return (
    <input
      type="email"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder="name@email.com"
      style={style}
    />
  );
}