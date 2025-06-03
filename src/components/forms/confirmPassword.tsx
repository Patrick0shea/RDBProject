// src/components/ConfirmPasswordInput.tsx
import React from 'react';

interface ConfirmPasswordProps {
  value: string;
  onChange: (newVal: string) => void;
  style?: React.CSSProperties;
  className?: string;
}

export function ConfirmPasswordInput({
  value,
  onChange,
  style,
  className,
}: ConfirmPasswordProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="############"
      style={style}
      className={className}
    />
  );
}
