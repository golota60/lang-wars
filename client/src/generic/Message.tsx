import React from 'react';
import './Message.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

interface MessageProps {
    message: string,
    color: 'red' | 'green',
    error: boolean
}

const Message = ({ message, color, error }: MessageProps) => {
    return (
        <div className={`message-container ${message === '' ? 'hidden' : ''} ${color}`}>

            {error ? <FontAwesomeIcon className='fa-icon' icon={faExclamationTriangle} /> : ''}
            {message}
        </div>
    );
}

export default Message;