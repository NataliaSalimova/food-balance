import React from 'react';
import { useNavigate } from 'react-router-dom'

import { saveDishApi } from '../../api';

import styles from './dishes-item.module.scss';

const DishesItem = ({ onClick, item }) => {
    const navigate = useNavigate();

    const handleClick = (event) => {
        event.preventDefault();

        saveDish(event);
    }

    const saveDish = async (event)=> {
        const dish = {
            dishID: item.id,
            types: item.type,
            date: new Date(localStorage.getItem('currentDate')).toISOString() ?? new Date().toISOString()
        };

        const response = await saveDishApi(dish);

        switch (response.status) {
            case 200:
                const productStoreId = event.target.getAttribute('data-store-dish-id');
                onClick(productStoreId, response.responseJSON.ID);

                break;
            case 401:
                navigate('/login');
                break;
            default:
                break;
        }
    }

    return (
        <li className={styles.item}>
            <div className={styles.item__container}>
                <div>
                    <p className={styles.item__name}>
                        {item.name}
                    </p>
                    <p className={styles.item__calories}>
                        {item.calories} ккал
                    </p>
                </div>
                <button className={`${styles.item__button} medium-bold`}
                    data-store-dish-id={item.id}
                    data-dish-id={item.dishID}
                    onClick={handleClick}>+</button>
            </div>
        </li>
    );
};

export default DishesItem;