import React from 'react';
import { Link } from 'react-router-dom';

import RegistrationForm from '../../registration-form';

function RegistrationPage() {
    return (
        <div className="authorization-page">
            <Link to='/' className="page-link">
                Вернуться на главную
            </Link>
            <div className="authorization-page-main">
                <h1 className="authorization-page-title">
                    Зарегистрироваться
                </h1>
                <RegistrationForm/>
            </div>
        </div>
    );
}

export default RegistrationPage;
