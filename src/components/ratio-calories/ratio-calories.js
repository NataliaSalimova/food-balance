import React from 'react';

import './ratio-calories.scss';
const RatioCalories = ({ caloriesConsumed, caloriesRemaining })=> {
    return (
        <div className="ratio-calories">
            <ul className="ratio-calories__list ta-center">
                <li className="ratio-calories__item">
                    <p className="ratio-calories__ccal bold">{caloriesConsumed} ккал</p>
                    <p className="ratio-calories__title medium-bold uppercase">
                        Потребление
                    </p>
                </li>
                <li className="ratio-calories__item">
                    <p className="ratio-calories__ccal bold">{caloriesRemaining} ккал</p>
                    <p className="ratio-calories__title medium-bold uppercase">
                        Осталось
                    </p>
                </li>
            </ul>
        </div>
    )
}

export default RatioCalories;