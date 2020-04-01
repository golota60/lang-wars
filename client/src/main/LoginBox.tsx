import React, { useState } from 'react';
import TextInput from '../generic/TextInput';
import Button from '../generic/Button';
import './LoginBox.scss';
import { LoginBoxProps } from '../interfaces';
import Message from '../generic/Message';
import { loginUser } from '../utils/fetches';
import { setInStorage } from '../utils/session';
import { Redirect } from 'react-router-dom';
import HrefLink from '../generic/HrefLink';

const LoginBox = ({ onLinkClick }: LoginBoxProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

  const [redirect, setRedirect] = useState(false);

  function validateForm(): string {
    let returnMessage = 'success';
    if (email.length <= 0 || password.length <= 0) {
      return 'Email/Password cannot be empty';
    }
    return returnMessage;
  }

  if (!redirect) {
    return (
      <>
        <div className="login-form-container-title">
          Welcome to <br /> Language Wars
        </div>
        <form
          className="login-form-container"
          onSubmit={async e => {
            e.preventDefault();
            setError('');
            const isFormValid = validateForm();
            if (isFormValid === 'success') {
              const data = await loginUser({
                email: email,
                password: password,
              });
              const jsonData = await data.json();
              if (data.status === 400) {
                setError(jsonData.msg);
              } else if (data.status === 200) {
                setRedirect(true);
              }
              setInStorage('lang-wars-token', jsonData.jwtToken);
            } else {
              setError(isFormValid);
            }
          }}
        >
          <TextInput type="text" placeholder="Email" onChange={setEmail} />
          <TextInput
            type="password"
            placeholder="Password"
            onChange={setPassword}
          />
          <Message error={true} color="red" message={error} />
          <div className="login-form-button-container">
            <Button text="Login" color="success" />
            <HrefLink text="Forgot Password?" href="/reset"></HrefLink>
          </div>
          <HrefLink
            className="register-link"
            text="Don't have an account? Click here"
            onClick={e => {
              e.preventDefault();
              onLinkClick(false);
            }}
          ></HrefLink>
        </form>
      </>
    );
  } else {
    return <Redirect to="/home"></Redirect>;
  }
};

export default LoginBox;
