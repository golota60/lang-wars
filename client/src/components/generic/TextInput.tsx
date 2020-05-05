import React from 'react';
import './TextInput.scss';

interface InputProps {
  type?: 'password' | 'text';
  placeholder?: string;
  onChange: any;
  className?: string;
}

const TextInput = ({ type, placeholder, onChange, className }: InputProps) => {
  function createClassName() {
    let newClassName = [];
    className && newClassName.push(className);
    return newClassName.join(' ');
  }

  return (
    <div className={`${createClassName()} generic-input-wrapper`}>
      <input
        className={`textinput`}
        type={type}
        placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
      />
      <div className="line"></div>
    </div>
  );
};

export default TextInput;
