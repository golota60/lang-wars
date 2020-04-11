import React from 'react';
import Spinner from './Spinner';
import './LoadingModal.scss';

interface LoadingModalProps {
  isShown: boolean;
}

const LoadingModal = ({ isShown }: LoadingModalProps) => {
  return (
    <>
      {isShown ? (
        <div className="loading-modal-overlay">
          <Spinner />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default LoadingModal;
