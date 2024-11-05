import React from 'react';

import './login.scss';

import LoginForm from '../../forms/login';
import Title from '../../title';

function Login() {
    return (
        <div className="login-page page-container">
            <Title title={"Войти"} className={"login-page__title"}/>
            <div className="login-page__main">
                <LoginForm />
            </div>
        </div>
    );
}

export default Login;
