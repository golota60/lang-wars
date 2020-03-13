import React from 'react';
import './ErrorMessage.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

interface ErrorProps {
    message: string
}


const ErrorMessage = ({ message }: ErrorProps) => {
    return (
        <div className={`error-container ${message === '' ? 'hidden' : ''}`}>
            <FontAwesomeIcon className='fa-icon' icon={faExclamationTriangle} />
            {message}
        </div>
    );
}

export default ErrorMessage;