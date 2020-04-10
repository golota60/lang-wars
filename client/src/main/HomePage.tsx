import React, { useEffect, useState } from 'react';
import './HomePage.scss';
import { getFromStorage } from '../utils/session';
import { verifyToken } from '../utils/fetches';
import { Redirect } from 'react-router-dom';
import LoadingPage from './LoadingPage';

const HomePage = () => {
  const [status, setStatus] = useState('not set');

  useEffect(() => {
    const token = getFromStorage('lang-wars-token');
    (async () => {
      const data = await verifyToken(token);
      data.status === 200 ? setStatus('true') : setStatus('false');
    })();
  }, []);

  switch (status) {
    case 'not set':
      return <LoadingPage />;
    case 'true':
      return (
        <div className="home-page">
          <h1>bruh</h1>
        </div>
      );
    case 'false':
      return (
        <>
          <Redirect to="/login"></Redirect>
        </>
      );
    default:
      return (
        <>
          <Redirect to="/login"></Redirect>
        </>
      );
  }
};

export default HomePage;
