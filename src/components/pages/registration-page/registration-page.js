import React from 'react';

import './registration.scss';

import RegistrationForm from '../../registration-form';
import Title from '../../title';

function RegistrationPage() {
    return (
        <div className="registration-page page-container">
            <Title title={"Зарегистрироваться"} className={"registration-page__title"}/>
            <div className="registration-page__main">
                <RegistrationForm/>
            </div>
        </div>
    );
}

export default RegistrationPage;
