import React, {useEffect, useState} from 'react';

import './dishes-item.css';

import STORE from '../../store';

const DishesItem = ({ onClick, item }) => {
    const diaryUrl = 'http://pet.foodtracker.ru/diary';
    const setUserDataUrl = 'http://pet.foodtracker.ru/setUserData';
    const [ userData, setUserData ] = useState();

    const handleClick = (event) => {
        saveProduct(event);
        addUserData();
    }

    // Сохранить блюдо в базу

    const saveProduct = async (event)=> {
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

        if (response.status === 200) {
            const productStoreId = event.target.getAttribute('data-store-dish-id');

            onClick(productStoreId, res.ID);
        }
    }

    // Проверить данные пользователя

    const getUserData = async ()=> {
        const response = await fetch('http://pet.foodtracker.ru/getUserData', {
            method: 'GET',
            headers: {
                'authKey': localStorage.getItem('authKey')
            }
        });

        const res =  await response.json();

        setUserData({userData, res});
    }

    // Сохранить данные пользователю

    const addUserData = async ()=> {
        const data = userData.res;

        const dataUser = {
            ...data,
            caloriesConsumed: data.caloriesConsumed + item.calories,
            caloriesRemaining: data.calories - item.calories,
            carbohydratesConsumed: data.carbohydratesConsumed + item.carbohydrates,
            proteinsConsumed: data.proteinsConsumed + item.proteins,
            fatsConsumed: data.fatsConsumed + item.fats
        };

        await fetch(setUserDataUrl, {
            method: 'PUT',
            headers: {
                'authKey': localStorage.getItem('authKey')
            },
            body: JSON.stringify(dataUser)
        })
    }

    useEffect(()=> {
       getUserData();
    }, []);

    return (
        <li className="dishes-item">
            <div className="dishes-item-container">
                <div>
                    <p className="dishes-item-name">
                        {item.name}
                    </p>
                    <p className="dishes-item-calories">
                        {item.calories} ккал
                    </p>
                </div>
                <button className="dishes-item-button" data-store-dish-id={item.id} data-dish-id={item.dishID} onClick={handleClick}>+</button>
            </div>
        </li>
    );
};

export default DishesItem;