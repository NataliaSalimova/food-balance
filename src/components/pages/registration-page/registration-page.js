import React from 'react';

import './registration.scss';

import RegistrationForm from '../../registration-form';
import BackLink from '../../back-link';
import Title from '../../title';

function RegistrationPage() {
    return (
        <div className="registration-page page-container">
            <div className="registration-page__header">
                <BackLink href={"/"} />
                <Title title={"Зарегистрироваться"} className={"registration-page__title"}/>
            </div>
            <div className="registration-page__main">
                <RegistrationForm/>
            </div>
        </div>
    );
}

export default RegistrationPage;
