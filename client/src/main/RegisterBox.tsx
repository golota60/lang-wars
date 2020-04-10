import React, { useState } from 'react';
import './LoginBox.scss';
import './RegisterBox.scss';
import TextInput from '../generic/TextInput';
import Button from '../generic/Button';
import { registerUser } from '../utils/fetches';
import Message from '../generic/Message';
import HrefLink from '../generic/HrefLink';

interface RegisterBoxProps {
  onLinkClick?: any;
}

const RegisterBox = ({ onLinkClick }: RegisterBoxProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repPassword, setRepPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  function validateForm(): string {
    let returnMessage = 'success';
    if (name.length < 3 || email.length < 3 || password.length < 3) {
      returnMessage = 'All fields have to be longer than 3';
    }
    if (password.localeCompare(repPassword) !== 0) {
      returnMessage = 'Passwords do not match';
    }
    return returnMessage;
  }

  return (
    <div className={`login-form`}>
      <div className="login-form-container-title">
        Sign up to <br /> Language Wars
      </div>
      <form
        className="login-form-container"
        onSubmit={async e => {
          e.preventDefault();
          setError('');
          setSuccess('');
          const isFormValid = validateForm();
          if (isFormValid === 'success') {
            const data = await registerUser({
              name: name,
              email: email,
              password: password,
            });
            const jsonData = await data.json();
            if (data.status === 200) {
              setSuccess(jsonData.msg);
            } else if (data.status === 400) {
              setError(jsonData.msg);
            }
          } else {
            setError(isFormValid);
          }
        }}
      >
        <TextInput type="text" placeholder="Name" onChange={setName} />
        <TextInput type="text" placeholder="Email" onChange={setEmail} />
        <TextInput
          type="password"
          placeholder="Password"
          onChange={setPassword}
        />
        <TextInput
          type="password"
          placeholder="Repeat Password"
          onChange={setRepPassword}
        />
        <Message message={error} error={true} color="red" />
        <Message message={success} color="green" />
        <div className="login-form-button-container">
          <Button text="Register" />
          <HrefLink
            onClick={e => {
              e.preventDefault();
              onLinkClick(true);
            }}
            text="Back to Login"
          ></HrefLink>
        </div>
      </form>
    </div>
  );
};

export default RegisterBox;
