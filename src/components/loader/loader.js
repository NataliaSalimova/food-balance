import React, { Fragment } from 'react';

import './loader.scss';

const Loader = () => {
    return (
        <Fragment>
            <div className="loader-wrapper"></div>
            <div className="loader"></div>
        </Fragment>
    );
};

export default Loader;