import React from 'react';
import { useNavigate } from 'react-router-dom'

import './dishes-item.scss';

const DishesItem = ({ onClick, item }) => {
    const diaryUrl = 'http://pet.foodtracker.ru/diary';
    const navigate = useNavigate();

    const handleClick = (event) => {
        event.preventDefault();

        saveProduct(event);
    }

    const saveProduct = async (event)=> {
        try {
            const data = {
                dishID: item.id,
                types: item.type,
                date: new Date().toISOString()
            };

            const response = await fetch(diaryUrl, {
                method: 'PUT',
                headers: {
                    'authKey': localStorage.getItem('authKey')
                },
                body: JSON.stringify(data)
            });

            const res = await response.json();

            switch (response.status) {
                case 200:
                    const productStoreId = event.target.getAttribute('data-store-dish-id');
                    onClick(productStoreId, res.ID);

                    break;
                case 401:
                    navigate('/login');
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <li className="dishes-item">
            <div className="dishes-item__container">
                <div className="dishes-item__description">
                    <p className="dishes-item__name">
                        {item.name}
                    </p>
                    <p className="dishes-item__calories">
                        {item.calories} ккал
                    </p>
                </div>
                <button className="dishes-item__button medium-bold"
                    data-store-dish-id={item.id}
                    data-dish-id={item.dishID}
                    onClick={handleClick}>+</button>
            </div>
        </li>
    );
};

export default DishesItem;