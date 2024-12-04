import React from 'react';

import './button.scss';

const Button = ({handleSubmit, children, id, className = ''})=> {
    const onClick = (event)=> {
        handleSubmit(event);
    }

    return (
        <button
            className={`button ${className}`}
            type="button"
            data-id={id}
            onClick={onClick}>
            { children }
        </button>
    )
}

export default Button;