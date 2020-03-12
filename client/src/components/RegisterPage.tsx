import React from "react";
import './Registerpage.scss';
// const loginimage = require('../assets/login-page-image.svg');
import loginimage from '../assets/login-page-image.svg';

const RegisterPage = () => {
    return (
        <div className="register-page">
            <div className="register-page__box">
                <div className="left-container">
                    <div className="text-container">
                    Welcome to<br></br>Language Wars!
                    </div>
                <img className="image" src={loginimage} alt="login page image" />
                </div>
                <div className="login-form-container">
                    <input></input>
                    <input></input>
                    <button></button>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;