import React from 'react';
import LoginBox from './LoginBox';
import RegisterBox from './RegisterBox';
import './LoginPage.scss';
import earth from '../assets/EarthNewColors.svg';
import swords from '../assets/SwordsNewColors.svg';

const LoginPage = () => {
  const [isLogin, setLogin] = React.useState(true);

  return (
    <>
      <div className="login-page">
        <div className="login-page__container">
          <div className="login-page__container-title">
            Welcome to <br /> Language Wars
          </div>
          <>
            {isLogin ? (
              <LoginBox onLinkClick={setLogin} />
            ) : (
              <RegisterBox onLinkClick={setLogin} />
            )}
          </>
        </div>
        <div className="login-page__logos">
          <img src={swords} className="swords" />
          <img src={earth} className="earth" />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
