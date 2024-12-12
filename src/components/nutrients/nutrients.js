import React from 'react';

import './nutrients.scss';

const Nutrients = ({ carbohydrates, proteins, fats })=> {
    return (
        <ul className="nutrients ta-center">
            <li className="nutrients__item">
                <p className="nutrients__title bold">Углеводы</p>
                <p className="nutrients__value">
                    { carbohydrates.consumed } / { carbohydrates.total } г
                </p>
            </li>
            <li className="nutrients__item">
                <p className="nutrients__title bold">Белки</p>
                <p className="nutrients__value">
                    { proteins.consumed } / { proteins.total } г
                </p>
            </li>
            <li className="nutrients__item">
                <p className="nutrients__title bold">Жиры</p>
                <p className="nutrients__value">
                    { fats.consumed } / { fats.total } г
                </p>
            </li>
        </ul>
    )
}

export default Nutrients;