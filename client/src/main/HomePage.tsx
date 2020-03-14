import React, { useEffect, useState } from 'react';
import './HomePage.scss';
import { getFromStorage } from '../utils/session';
import { verifyToken } from '../utils/fetches';

const HomePage = () => {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const token = getFromStorage('lang-wars-token');
    if (token) {
      (async () => {
        const data = await verifyToken(token);
        if (data.status === 200) {
          setLoading(false);
        }
      })();
    }
  }, []);

  if (isLoading) {
    return <>Loading...</>;
  } else {
    return <>Congrats! You're logged in!</>;
  }
};

export default HomePage;
