import React from 'react';

import LoginForm from '../../forms/login';
import Title from '../../title';

function Login() {
    return (
        <div className="login page-container">
            <Title className="login-title">
                Войти
            </Title>
            <div>
                <LoginForm />
            </div>
        </div>
    );
}

export default Login;
