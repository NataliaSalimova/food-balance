import React from 'react';

import  './ratio-calories.scss';

const RatioCalories = ({ calories })=> {
    return (
        <ul className="ratio-calories ta-center">
            <li className="ratio-calories__item">
                <p className="ratio-calories__ccal bold">{calories.consumed} ккал</p>
                <p className="ration-calories__title medium-bold uppercase">
                    Потребление
                </p>
            </li>
            <li className="ratio-calories__item">
                <p className="ratio-calories__ccal bold">{calories.total - calories.consumed} ккал</p>
                <p className="ration-calories__title medium-bold uppercase">
                    Осталось
                </p>
            </li>
        </ul>
    )
}

export default RatioCalories;