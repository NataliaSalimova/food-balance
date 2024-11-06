import React from 'react';

import styles from './button.module.scss';

const Button = ({handleSubmit, children})=> {
    const onClick = (event)=> {
        handleSubmit(event);
    }

    return (
        <button className={styles.button} type="button" onClick={onClick}>{children}</button>
    )
}

export default Button;