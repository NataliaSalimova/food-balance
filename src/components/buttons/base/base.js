import React from 'react';

import './base.scss';

const Base = ({handleSubmit, text})=> {
    const onClick = (event)=> {
        event.preventDefault();

        handleSubmit(event);
    }

    return (
        <button className="button" type="button" onClick={onClick}>{text}</button>
    )
}

export default Base;