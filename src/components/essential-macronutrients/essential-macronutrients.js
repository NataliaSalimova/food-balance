import React, {useContext, useEffect, useState} from 'react';

import './essential-macronutrients.css';

import Context from '../context/index';

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
    },[carbohydratesConsumed, proteinsConsumed, fatsConsumed])
    
    //
    // const { value } = useContext(Context);
    //
    // useEffect(() => {
    //     if (!value) return;
    //
    //     setCaloriesData(prev=>({
    //         ...prev,
    //         carbohydratesConsumed: prev.carbohydratesConsumed + value.carbohydrates,
    //         proteinsConsumed: prev.proteinsConsumed + value.proteins,
    //         fatsConsumed: prev.fatsConsumed + value.fats,
    //     }))
    // }, [value]);

    return (
        <ul className="essential-macronutrients">
            <li className="essential-macronutrients-item">
                <p className="essential-macronutrients-item-title">Углеводы</p>
                <p className="essential-macronutrients-item-value">{caloriesData.carbohydratesConsumed} / {carbohydratesTotal} г</p>
            </li>
            <li className="essential-macronutrients-item">
                <p className="essential-macronutrients-item-title">Белки</p>
                <p className="essential-macronutrients-item-value">{caloriesData.proteinsConsumed} / {proteinsTotal} г</p>
            </li>
            <li className="essential-macronutrients-item">
                <p className="essential-macronutrients-item-title">Жиры</p>
                <p className="essential-macronutrients-item-value">{caloriesData.fatsConsumed} / {fatsTotal} г</p>
            </li>
        </ul>
    )
}

export default EssentialMacronutrients;