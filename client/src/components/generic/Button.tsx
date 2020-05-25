import React, { ReactNode } from 'react';
import './Button.scss';

interface ButtonProps {
  onClick?(): void;
  children: ReactNode;
  type?: 'button' | 'reset' | 'submit';
  className?: string;
  outline?: boolean;
  outlineColor?: 'green-button' | 'red-button' | string;
}

const Button = ({
  children,
  type = 'submit',
  className,
  outline,
  outlineColor
  onClick = () => {},
}: ButtonProps) => {
  function createClassName() {
    const newClassName: Array<string> = [];
    className && newClassName.push(className);
    outline && newClassName.push('outline');
    outlineColor && newClassName.push(outlineColor);
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
