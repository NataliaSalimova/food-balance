import React from 'react';

import './error-fallback.scss';

const ErrorFallback = ({errorText = 'Что-то пошло не так. Обновите страницу или попробуйте позже'})=> {
    return (
        <div className="error-indicator ta-center">
            <p className="error-indicator__text">
                { errorText }
            </p>
        </div>
    )
}

export default ErrorFallback;