import './calorie-calculation.css';

import React from 'react';
import { Link } from 'react-router-dom';

import CalorieCalculationForm from '../../target-form';

function calorieCalculationPage () {
    return (
        <div className="calorie-calculation-page">
            <Link to='/' className="calorie-calculation-page-link">
                Вернуться на главную
            </Link>
            <div className="calorie-calculation-target">
                <h1 className="calorie-calculation-target-title">
                    Рассчитай свою норму калорий
                </h1>
                <CalorieCalculationForm/>
            </div>
        </div>
    );
}

export default calorieCalculationPage;

