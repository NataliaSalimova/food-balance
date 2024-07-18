import React from 'react';
import { useNavigate } from 'react-router-dom';

import './dishes-item-consumed.scss';

const DishesItemConsumed = ( { item, onClick })=> {
    const navigate = useNavigate();
    const diaryURL = 'http://pet.foodtracker.ru/diary/';
    const deleteDish = async (event) => {
        event.preventDefault();

        const dishId = event.target.getAttribute('data-dish-id');
        const deleteDishURL = `${diaryURL}${dishId}`;

        try {
            const response = await fetch(deleteDishURL, {
                method: 'DELETE',
                headers: {
                    'authKey': localStorage.getItem('authKey'),
                    'date': new Date().toISOString()
                }
            })

            if (response.status === 401) {
                navigate('/login');
                return;
            }

            onClick(dishId);
        } catch (error) {
            console.log(error)
        }


    }

    return (
        <li className="dishes-list-consumed-item" key={item.id}>
            <p className="dishes-list-consumed-item__title">
                {item.name}
            </p>
            <button className="dishes-list-consumed-item__button medium-bold" data-dish-id={item.dishId} onClick={deleteDish}>X</button>
        </li>
    )
}

export default DishesItemConsumed;