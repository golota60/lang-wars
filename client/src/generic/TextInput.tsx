import React from 'react';
import './TextInput.scss';

interface InputProps {
  type?: 'password' | 'text';
  placeholder?: string;
  onChange: any;
  className?: string;
}

const TextInput = ({ type, placeholder, onChange, className }: InputProps) => {
  return (
    <div className="generic-input-wrapper">
      <input
        className={`${className} textinput`}
        type={type}
        placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
      />
      <div className="line"></div>
    </div>
  );
};

export default TextInput;
