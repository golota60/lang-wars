import React, { useState } from 'react';
import TextInput from '../generic/TextInput';
import Button from '../generic/Button';
import './LoginBox.scss';
import Message from '../generic/Message';
import { loginUser } from '../utils/fetches';
import { setInStorage } from '../utils/session';
import { Redirect, Link } from 'react-router-dom';
import HrefLink from '../generic/HrefLink';
import LoadingModal from '../generic/LoadingModal';

interface LoginBoxProps {
  onLinkClick?: any;
}

const LoginBox = ({ onLinkClick }: LoginBoxProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);

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
      <div className={`login-form`}>
        <LoadingModal isShown={isLoading}></LoadingModal>
        <div className="login-form-container-title">
          Welcome to <br /> Language Wars
        </div>
        <form
          className="login-form-container"
          onSubmit={async e => {
            e.preventDefault();
            setLoading(true);
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
                setInStorage('lang-wars-token', jsonData.jwtToken);
                setRedirect(true);
              }
              setLoading(false);
            } else {
              setError(isFormValid);
              setLoading(false);
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
            <Button>Login</Button>
            <Link className="generic-link" to="/reset">
              Forgot Password?
            </Link>
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
      </div>
    );
  } else {
    return <Redirect push to="/home"></Redirect>;
  }
};

export default LoginBox;
