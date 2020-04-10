import React from 'react';
import Spinner from '../generic/Spinner';
import './LoadingPage.scss';

const LoadingPage = () => {
  return (
    <div className="loading-page">
      <Spinner></Spinner>
    </div>
  );
};

export default LoadingPage;
