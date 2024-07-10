import './login-page.css';

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../../login-form';

function LoginPage() {
    return (
        <div className="login-page">
            <Link to='/' className="login-page-link">
                Вернуться на главную
            </Link>
            <div className="login-page-main">
                <h1 className="login-page-title">
                    Войти
                </h1>
                <LoginForm/>
            </div>
        </div>
    );
}

export default LoginPage;
