import React from 'react';

import './essential-macronutrients.scss';

const EssentialMacronutrients = ({
    carbohydratesTotal, 
    proteinsTotal, 
    fatsTotal, 
    carbohydratesConsumed, 
    proteinsConsumed, 
    fatsConsumed 
    })=> {

    return (
        <ul className="essential-macronutrients">
            <li className="essential-macronutrients__item">
                <p className="essential-macronutrients__title bold">Углеводы</p>
                <p className="essential-macronutrients__value">
                    {carbohydratesConsumed} / {carbohydratesTotal} г
                </p>
            </li>
            <li className="essential-macronutrients__item">
                <p className="essential-macronutrients__title bold">Белки</p>
                <p className="essential-macronutrients__value">
                    {proteinsConsumed} / {proteinsTotal} г
                </p>
            </li>
            <li className="essential-macronutrients__item">
                <p className="essential-macronutrients__title bold">Жиры</p>
                <p className="essential-macronutrients__value">
                    {fatsConsumed} / {fatsTotal} г
                </p>
            </li>
        </ul>
    )
}

export default EssentialMacronutrients;