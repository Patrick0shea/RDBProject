import React from 'react';

interface confirmPasswordProps {
  value: string;
  onChange: (newVal: string) => void;
  style?: React.CSSProperties;
  className?: string;
}

export function ConfirmPassword({ value, onChange, style }: confirmPasswordProps) {
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
