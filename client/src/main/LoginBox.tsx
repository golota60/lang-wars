import React from 'react';
import TextInput from '../generic/TextInput';
import Button from '../generic/Button';
import './LoginBox.scss';
import { LoginBoxProps } from '../interfaces';

const LoginBox = ({ onLinkClick }: LoginBoxProps) => {

    return (
        <form className="login-form-container" onSubmit={(e) => {
            e.preventDefault();
        }}>
            Login
            <TextInput type="text" placeholder="Email" />
            <TextInput type='password' placeholder="Password" />
            <Button text='Login' rounded={true} color='success' />
            <a onClick={(e) => {
                e.preventDefault();
                onLinkClick(false);
            }}>Don't have an account? Click here</a>
        </form>
    );
}

export default LoginBox;