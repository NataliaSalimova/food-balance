import React from 'react';

import styles from './essential-macronutrients.module.scss';

const EssentialMacronutrients = ({
    carbohydratesTotal, 
    proteinsTotal, 
    fatsTotal, 
    carbohydratesConsumed, 
    proteinsConsumed, 
    fatsConsumed 
    })=> {

    return (
        <ul className={styles.list}>
            <li className={styles.item}>
                <p className={`${styles.item__title} bold`}>Углеводы</p>
                <p className={styles.item__value}>
                    {carbohydratesConsumed} / {carbohydratesTotal} г
                </p>
            </li>
            <li className={styles.item}>
                <p className={`${styles.item__title} bold`}>Белки</p>
                <p className={styles.item__value}>
                    {proteinsConsumed} / {proteinsTotal} г
                </p>
            </li>
            <li className={styles.item}>
                <p className={`${styles.item__title} bold`}>Жиры</p>
                <p className={styles.item__value}>
                    {fatsConsumed} / {fatsTotal} г
                </p>
            </li>
        </ul>
    )
}

export default EssentialMacronutrients;