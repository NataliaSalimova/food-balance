import React from 'react';

import styles from './login.module.scss';

import LoginForm from '../../forms/login';
import Title from '../../title';

function Login() {
    return (
        <div className="login-page page-container">
            <Title className={styles.title}>
                Войти
            </Title>
            <div>
                <LoginForm />
            </div>
        </div>
    );
}

export default Login;
