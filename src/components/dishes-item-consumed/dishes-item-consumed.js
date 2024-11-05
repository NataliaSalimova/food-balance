import React from 'react';
import { useNavigate } from 'react-router-dom';

import { deleteDishApi } from '../../api';

import './dishes-item-consumed.scss';

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
        <li className="dishes-list-consumed-item" key={item.id}>
            <p className="dishes-list-consumed-item__title">
                {item.name}
            </p>
            <button className="dishes-list-consumed-item__button medium-bold"
                data-dish-id={item.dishId}
                onClick={deleteDish}>X</button>
        </li>
    )
}

export default DishesItemConsumed;