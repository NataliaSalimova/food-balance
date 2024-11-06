import React from 'react';

import './title.scss';

const Title = ({children, className})=> {
    return (
        <h1 className={`page-title bold ${className}`}>
            { children }
        </h1>
    )
}

export default Title;