import React, { useEffect, useState } from 'react';

import styles from './show-password.module.scss';

const ShowPassword = ({ onHandleClick })=> {
    const [ type, setType ] = useState('password');

    const changeTypePassword = (event) => {
        event.preventDefault();

        type === 'password' ? setType('text') : setType('password');
    }

    useEffect(()=> {
        onHandleClick(type);
    }, [type])

    return (
        <button className={`${styles.button} ${type === 'text' ? 'show' : ''}`} onClick={changeTypePassword}>
            <img src="/images/show-password.png" width="25" height="25" alt="Show password" />
        </button>
    )
}

export default ShowPassword;