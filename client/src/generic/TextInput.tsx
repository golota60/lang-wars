import React from 'react';
import './TextInput.scss';

interface InputProps {
  type: 'password' | 'text';
  placeholder?: string;
  onChange?: any;
}

const TextInput = ({ type, placeholder, onChange }: InputProps) => {
  return (
    <input
      className="input"
      type={type}
      placeholder={placeholder}
      onChange={e => onChange(e.target.value)}
    />
  );
};

export default TextInput;
