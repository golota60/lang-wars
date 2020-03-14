import React from "react";
import loginimage from "../assets/login-page-image.svg";
import LoginBox from "./LoginBox";
import RegisterBox from "./RegisterBox";
import "./LoginPage.scss";

const LoginPage = () => {
  const [isLogin, setLogin] = React.useState(true);

  return (
    <>
      <div className="login-page">
        <div className="login-page__box">
          <div className="text-container">
            Welcome to<br></br>Language Wars!
          </div>
          <div className="lower-container">
            <div className="left-container">
              <img className="image" src={loginimage} alt="login page image" />
            </div>
            <>
              {isLogin ? (
                <LoginBox onLinkClick={setLogin} />
              ) : (
                <RegisterBox onLinkClick={setLogin} />
              )}
            </>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
