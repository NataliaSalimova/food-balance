import React from 'react';

import './login-page.scss';

import LoginForm from '../../login-form';
import Title from '../../title';

function LoginPage() {
    return (
        <div className="login-page page-container">
            <Title title={"Войти"} className={"login-page__title"}/>
            <div className="login-page__main">
                <LoginForm />
            </div>
        </div>
    );
}

export default LoginPage;
