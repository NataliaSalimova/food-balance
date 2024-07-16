import React from 'react';

import './title.scss';

const Title = ({title, className})=> {
    return (
        <h1 className={`page-title bold ${className}`}>
            { title }
        </h1>
    )
}

export default Title;