import React from 'react';
import './Button.scss';

interface ButtonProps {
  onClick?(): void;
  text?: string;
  type?: 'button' | 'reset' | 'submit';
  className?: string;
}

const Button = ({ text, type, className }: ButtonProps) => {
  return (
    <button className={`generic-button ${className}`} type={type}>
      {text}
    </button>
  );
};

export default Button;
