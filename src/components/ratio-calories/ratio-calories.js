import React from 'react';

import styles from './ratio-calories.module.scss';
const RatioCalories = ({ caloriesConsumed, caloriesRemaining })=> {
    return (
        <div className="ratio-calories">
            <ul className={`${styles.list} ta-center`}>
                <li className={styles.item}>
                    <p className={`${styles.ccal} bold`}>{caloriesConsumed} ккал</p>
                    <p className={`${styles.title} medium-bold uppercase`}>
                        Потребление
                    </p>
                </li>
                <li className={styles.item}>
                    <p className={`${styles.ccal} bold`}>{caloriesRemaining - caloriesConsumed} ккал</p>
                    <p className={`${styles.title} medium-bold uppercase`}>
                        Осталось
                    </p>
                </li>
            </ul>
        </div>
    )
}

export default RatioCalories;