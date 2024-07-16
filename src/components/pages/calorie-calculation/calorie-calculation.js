import './calorie-calculation.scss';

import React from 'react';

import CalorieCalculationForm from '../../calorie-calculation-form';
import Title from '../../title';

function calorieCalculationPage () {
    return (
        <div className="calorie-calculation-page page-container">
            <Title title={"Расчет калорий"} className={"calorie-calculation-page__title"}/>
            <div className="calorie-calculation__main">
                <CalorieCalculationForm/>
            </div>
        </div>
    );
}

export default calorieCalculationPage;

