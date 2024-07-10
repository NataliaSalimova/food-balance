import React, { useContext, useEffect, useState } from 'react';

import './ratio-calories.css';

import Context from '../context/index';

const RatioCalories = ({ caloriesConsumed, caloriesRemaining })=> {
    // const { value } = useContext(Context);

    const [ caloriesData, setCaloriesData ] = useState({
        caloriesСonsumedValue: caloriesConsumed,
        caloriesRemainingValue: 0
    });

    // Обновление данных при обновлении страницы

    useEffect(() => {
        setCaloriesData(prev=>({
            caloriesСonsumedValue: caloriesConsumed,
            caloriesRemainingValue: caloriesRemaining - caloriesConsumed
        }))
    }, [caloriesConsumed, caloriesRemaining]);

    // useEffect(() => {
    //     if (!value) return;
    //
    //     setCaloriesData(prev=>({
    //         caloriesСonsumedValue: prev.caloriesСonsumedValue + value.calories,
    //         caloriesLeftValue: prev.caloriesLeftValue - value.calories
    //     }))
    // }, [value]);






    return (
        <div className="ratio-calories">
            <ul className="ratio-calories-list">
                <li className="ratio-calories-item">
                    <p className="ratio-calories-ccal">{caloriesData.caloriesСonsumedValue} ккал</p>
                    <p className="ratio-calories-title">
                        Потребление
                    </p>
                </li>
                <li className="ratio-calories-item">
                    <p className="ratio-calories-ccal">{caloriesData.caloriesRemainingValue} ккал</p>
                    <p className="ratio-calories-title">
                        Осталось
                    </p>
                </li>
            </ul>
        </div>
    )
}

export default RatioCalories;