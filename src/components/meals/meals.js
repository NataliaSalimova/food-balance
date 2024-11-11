import React from 'react';

import styles from './meals.module.scss';

import MealsItem from '../meals-item';

import STORE from '../../store';

const Meals = ({ dishesConsumed })=> {
    return (
        <div className={styles.meals}>
            <ul className={styles.list}>
                {
                    STORE.MEALS.map((item, index)=> {
                        return (
                            <MealsItem key={index} meal={item} dishes={dishesConsumed}/>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default Meals;