import React, { ReactNode } from 'react';
import './Button.scss';

interface ButtonProps {
  onClick?(): void;
  children: ReactNode;
  type?: 'button' | 'reset' | 'submit';
  className?: string;
  outline?: boolean;
}

const Button = ({
  children,
  type = 'submit',
  className,
  outline,
  onClick = () => {},
}: ButtonProps) => {
  function createClassName() {
    const newClassName: Array<string> = [];
    className && newClassName.push(className);
    outline && newClassName.push('outline');
    return newClassName.join(' ');
  }

  return (
    <button
      className={`generic-button ${createClassName()}`}
      type={type}
      onClick={() => onClick()}
    >
      {children}
    </button>
  );
};

export default Button;