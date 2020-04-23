import React from 'react';
import LoginBox from '../LoginBox';
import RegisterBox from '../RegisterBox';
import './LoginPage.scss';
import earth from '../../assets/EarthNewColors.svg';
import swords from '../../assets/SwordsNewColors.svg';
import ComponentSwitcher from '../generic/ComponentSwitcher';

const LoginPage = () => {
  const [isLogin, setLogin] = React.useState(true);

  return (
    <>
      <div className="login-page">
        <div className="login-page__container">
          <ComponentSwitcher changeKey={isLogin}>
            {isLogin ? (
              <LoginBox onLinkClick={setLogin} />
            ) : (
              <RegisterBox onLinkClick={setLogin} />
            )}
          </ComponentSwitcher>
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
