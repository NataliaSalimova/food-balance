import React from 'react';

import './button.scss';

const Button = ({handleSubmit, text})=> {
    const onClick = (event)=> {
        event.preventDefault();

        handleSubmit(event);
    }

    return (
        <button className="button" type="button" onClick={onClick}>{text}</button>
    )
}

export default Button;