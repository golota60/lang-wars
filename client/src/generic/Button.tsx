import React from 'react';
import './Button.scss';

interface ButtonProps {
  onClick?(): void;
  color?: 'primary' | 'link' | 'info' | 'success' | 'warning' | 'danger';
  text?: string;
  type?: 'button' | 'reset' | 'submit';
  className?: string;
}

function createClassName(type: string) {
  return `is-${type}`;
}

const Button = ({ color, text, type, className }: ButtonProps) => {
  const newClassName = ['button', color && createClassName(color)]
    .join(' ')
    .trim();

  return (
    <button
      className={`${newClassName} generic-button ${className}`}
      type={type}
    >
      {text}
    </button>
  );
};

export default Button;
