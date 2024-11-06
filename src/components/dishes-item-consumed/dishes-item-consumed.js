import React from 'react';
import { useNavigate } from 'react-router-dom';

import { deleteDishApi } from '../../api';

import styles from './dishes-item-consumed.module.scss';

const DishesItemConsumed = ( { item, onClick })=> {
    const navigate = useNavigate();
    const deleteDish = async (event) => {
        event.preventDefault();

        const dishId = event.target.getAttribute('data-dish-id');
        const response = await deleteDishApi(dishId);

        if (response.status === 401) {
            navigate('/login');
            return;
        }

        onClick(dishId);
    }

    return (
        <li className={styles.item} key={item.id}>
            <p className={styles.item__title}>
                {item.name}
            </p>
            <button className={`${styles.item__button} medium-bold`}
                data-dish-id={item.dishId}
                onClick={deleteDish}>X</button>
        </li>
    )
}

export default DishesItemConsumed;