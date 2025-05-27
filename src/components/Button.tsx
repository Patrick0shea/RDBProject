// src/components/Button.tsx
import React from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
  style?: React.CSSProperties;
  className?: string;}

export function Button({ label, onClick, style }: ButtonProps) {
  return (
    <button onClick={onClick} style={style}>
      {label}
    </button>
);
}