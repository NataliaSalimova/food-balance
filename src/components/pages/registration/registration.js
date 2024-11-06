import React from 'react';

import styles from './registration.module.scss';

import RegistrationForm from '../../forms/registration';
import Title from '../../title';

function Registration() {
    return (
        <div className="registration-page page-container">
            <Title className={styles.title}>
                Зарегистрироваться
            </Title>
            <div>
                <RegistrationForm/>
            </div>
        </div>
    );
}

export default Registration;
