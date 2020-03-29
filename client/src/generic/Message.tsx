import React from 'react';
import './Message.scss';
import warning from '../assets/warning-outline.svg';

interface MessageProps {
  message: string;
  color: 'red' | 'green';
  error?: boolean;
  className?: string;
}

const Message = ({ message, color, error }: MessageProps) => {
  return (
    <div
      className={`message-container ${message === '' ? 'hidden' : ''} ${color}`}
    >
      {error ? <img className="error-svg" src={warning} /> : ''}
      {message}
    </div>
  );
};

export default Message;
