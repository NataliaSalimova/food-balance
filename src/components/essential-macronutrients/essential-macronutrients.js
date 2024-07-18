import React, { useEffect, useState } from 'react';

import './essential-macronutrients.scss';

const EssentialMacronutrients = ({
    carbohydratesTotal, 
    proteinsTotal, 
    fatsTotal, 
    carbohydratesConsumed, 
    proteinsConsumed, 
    fatsConsumed 
    })=> {
    
    const [caloriesData, setCaloriesData] = useState({
        carbohydratesConsumed: 0,
        proteinsConsumed: 0,
        fatsConsumed: 0
    });

    useEffect(()=> {
        setCaloriesData(prev=>({
            ...prev,
            carbohydratesConsumed: carbohydratesConsumed,
            proteinsConsumed: proteinsConsumed,
            fatsConsumed: fatsConsumed
        }))
    },[carbohydratesConsumed, proteinsConsumed, fatsConsumed]);

    return (
        <ul className="essential-macronutrients">
            <li className="essential-macronutrients__item">
                <p className="essential-macronutrients__title bold">Углеводы</p>
                <p className="essential-macronutrients__value">
                    {caloriesData.carbohydratesConsumed} / {carbohydratesTotal} г
                </p>
            </li>
            <li className="essential-macronutrients__item">
                <p className="essential-macronutrients__title bold">Белки</p>
                <p className="essential-macronutrients__value">
                    {caloriesData.proteinsConsumed} / {proteinsTotal} г
                </p>
            </li>
            <li className="essential-macronutrients__item">
                <p className="essential-macronutrients__title bold">Жиры</p>
                <p className="essential-macronutrients__value">
                    {caloriesData.fatsConsumed} / {fatsTotal} г
                </p>
            </li>
        </ul>
    )
}

export default EssentialMacronutrients;