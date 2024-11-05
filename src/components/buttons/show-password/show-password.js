import React, { useEffect, useState } from 'react';

import './show-password.scss';

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
        <button className={`password-button ${type === 'text' ? 'show' : ''}`} onClick={changeTypePassword}>
            <img src="/images/show-password.png" width="25" height="25" alt="Show password" />
        </button>
    )
}

export default ShowPassword;