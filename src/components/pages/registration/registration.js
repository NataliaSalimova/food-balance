import React from 'react';

import './registration.scss';

import RegistrationForm from '../../forms/registration';
import Title from '../../title';

function Registration() {
    return (
        <div className="registration-page page-container">
            <Title title={"Зарегистрироваться"} className={"registration-page__title"}/>
            <div className="registration-page__main">
                <RegistrationForm/>
            </div>
        </div>
    );
}

export default Registration;
