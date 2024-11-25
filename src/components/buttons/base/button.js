import React from 'react';

import styles from './button.module.scss';

const Button = ({handleSubmit, children, id, className = ''})=> {
    const onClick = (event)=> {
        handleSubmit(event);
    }

    return (
        <button className={`${styles.button} ${className}`} type="button" data-id={id} onClick={onClick}>{children}</button>
    )
}

export default Button;