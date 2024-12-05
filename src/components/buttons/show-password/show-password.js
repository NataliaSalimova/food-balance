import React, {useEffect, useState} from 'react';

import styles from './show-password.module.scss';

const ShowPasswordButton = ({ onChangeTypePassword, typeButtonPassword = 'password' })=> {
    const [ typeInputPassword, setTypeInputPassword ] = useState('password');

    const changeTypePassword = (event) => {
        event.preventDefault();

        typeInputPassword === 'password'
            ? setTypeInputPassword('text')
            : setTypeInputPassword('password');
    }

    useEffect(()=> {
        onChangeTypePassword(typeInputPassword, typeButtonPassword);
    }, [typeInputPassword])

    return (
        <button
            className={`${styles.button} ${typeInputPassword === 'text' ? styles.show : ''}`}
            onClick={changeTypePassword}>
            <img src="/images/show-password.png"
                width="25"
                height="25"
                alt="Show password" />
        </button>
    )
}

export default ShowPasswordButton;