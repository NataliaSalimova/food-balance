import React from 'react';

import './error-indicator.scss';

const ErrorIndicator = ({errorText = 'Что-то пошло не так. Обновите страницу или попробуйте позже'})=> {
    return (
        <div className="error-indicator ta-center">
            { errorText }
        </div>
    )
}

export default ErrorIndicator;