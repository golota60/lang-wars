import React, { useState } from 'react';
import TextInput from '../generic/TextInput';
import Button from '../generic/Button';
import './LoginBox.scss';
import { LoginBoxProps } from '../interfaces';
import Message from '../generic/Message';
import { loginUser } from '../utils/fetches';
import { setInStorage } from '../utils/session';
import { Link, Redirect } from 'react-router-dom';

const LoginBox = ({ onLinkClick }: LoginBoxProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

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
      <form
        className="login-form-container"
        onSubmit={async e => {
          e.preventDefault();
          setError('');
          setLoading(true);
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
        Login
        <TextInput type="text" placeholder="Email" onChange={setEmail} />
        <TextInput
          type="password"
          placeholder="Password"
          onChange={setPassword}
        />
        <Message error={true} color="red" message={error} />
        <Button
          text="Login"
          loading={isLoading}
          disabled={isLoading}
          rounded={true}
          color="success"
        />
        <a
          onClick={e => {
            e.preventDefault();
            onLinkClick(false);
          }}
        >
          Don't have an account? Click here
        </a>
      </form>
    );
  } else {
    return <Redirect to="/home"></Redirect>;
  }
};

export default LoginBox;
