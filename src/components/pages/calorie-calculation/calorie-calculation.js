import styles from './calorie-calculation.module.scss';

import React from 'react';

import CalorieCalculationForm from '../../forms/calorie-calculation';
import Title from '../../title';

function calorieCalculationPage () {
    return (
        <div className="page-container">
            <Title className={styles.title}>
                Расчет калорий
            </Title>
            <div className="calorie-calculation__main">
                <CalorieCalculationForm/>
            </div>
        </div>
    );
}

export default calorieCalculationPage;

