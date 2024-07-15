import React from 'react';

import './login-page.scss';

import BackLink from '../../back-link';
import Title from '../../title';
import LoginForm from '../../login-form';

function LoginPage() {
    return (
        <div className="login-page page-container">
            <div className="login-page__header">
                <BackLink href={"/"} />
                <Title title={"Войти"} className={"login-page__title"}/>
            </div>
            <div className="login-page__main">
                <LoginForm />
            </div>
        </div>
    );
}

export default LoginPage;
