import React, { useEffect, useState } from 'react';

import './ratio-calories.css';
const RatioCalories = ({ caloriesConsumed, caloriesRemaining })=> {
    const [ caloriesData, setCaloriesData ] = useState({
        caloriesConsumedValue: caloriesConsumed,
        caloriesRemainingValue: 0
    });

    useEffect(() => {
        setCaloriesData(prev=>({
            caloriesConsumedValue: caloriesConsumed,
            caloriesRemainingValue: caloriesRemaining - caloriesConsumed
        }))
    }, [caloriesConsumed, caloriesRemaining]);
    return (
        <div className="ratio-calories">
            <ul className="ratio-calories-list">
                <li className="ratio-calories-item">
                    <p className="ratio-calories-ccal">{caloriesData.caloriesConsumedValue} ккал</p>
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