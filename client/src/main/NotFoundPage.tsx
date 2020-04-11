import React from 'react';
import { Link } from 'react-router-dom';
import earth from '../assets/EarthNewColors.svg';
import swords from '../assets/SwordsNewColors.svg';
import './NotFoundPage.scss';

const NotFoundPage = () => {
  return (
    <div className="login-page">
      <div className="login-page__container">
        <>
          <p className="login-form-container-title">
            404
            <br /> Page not found
            <br />
            <Link className="home_button" to="/home">
              Go to Home Page
            </Link>
          </p>
        </>
      </div>
      <div className="login-page__logos">
        <img src={swords} className="swords" />
        <img src={earth} className="earth" />
      </div>
    </div>
  );
};

export default NotFoundPage;
