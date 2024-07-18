import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './diary.scss';

import RatioCalories from '../../ratio-calories';
import EssentialMacronutrients from '../../essential-macronutrients';
import Meals from '../../meals';

import STORE from "../../../store";

function Diary() {
    const getUserURL = 'http://pet.foodtracker.ru/getUser';

    const [user, setUser] = useState({
        caloriesConsumed: 0,
        carbohydratesConsumed: 0,
        proteinsConsumed: 0,
        fatsConsumed: 0,
        caloriesRemaining: 0,
        carbohydratesTotal: '',
        proteinsTotal: '',
        fatsTotal: '',
        dishesConsumed: []
    });

    const navigate = useNavigate();

    const getUser = async ()=> {
        try {
            const response = await fetch(getUserURL, {
                method: 'GET',
                headers: {
                    'authKey': localStorage.getItem('authKey')
                }
            })

            switch (response.status) {
                case 200:
                    const res = await response.json();

                    setUser(prevState => ({
                        ...prevState,
                        caloriesRemaining: JSON.parse(res.data).calories,
                        carbohydratesTotal: JSON.parse(res.data).carbohydrates,
                        proteinsTotal: JSON.parse(res.data).proteins,
                        fatsTotal: JSON.parse(res.data).fats
                    }));

                    break;

                case 401:
                    navigate('/login');
            }
        } catch (error) {
            console.log(error)
        }
    };

    const getDishes = async ()=> {
        const response = await fetch('http://pet.foodtracker.ru/diary', {
            method: 'GET',
            headers: {
                'authKey': localStorage.getItem('authKey')
            }
        });

        const res =  await response.json();
        let calories = 0;
        let carbohydratesConsumed = 0;
        let proteinsConsumed = 0;
        let fatsConsumed = 0;
        let dishes = [];

        res.map((item)=> {
            STORE.DISHES.find((dish)=> {
                if ((item.dishID === dish.id)) {
                    calories += dish.calories;
                    carbohydratesConsumed += dish.carbohydrates;
                    proteinsConsumed += dish.proteins;
                    fatsConsumed += dish.fats;
                    dishes.push(item);
                }
            });

            setUser(prevState => ({
                ...prevState,
                caloriesConsumed: calories,
                carbohydratesConsumed: carbohydratesConsumed,
                proteinsConsumed: proteinsConsumed,
                fatsConsumed: fatsConsumed,
                dishesConsumed: dishes
            }));
        })
    }

    useEffect(()=> {
        getUser();
        getDishes();
    }, []);

    return (
        <div className="diary-page page-container">
            <div className="diary-page__header">
                <Link to='/' className="diary-page__link">
                    FoodBalance
                </Link>
                <Link to='/profile' className="page-link diary-page__profile-link">
                    <img src="/images/profile.png"
                        className="diary-page-profile-image"
                        width="25"
                        height="25"
                        alt="Icon profile"/>
                </Link>
            </div>

            <RatioCalories
                caloriesConsumed={user.caloriesConsumed}
                caloriesRemaining={user.caloriesRemaining}/>
            <EssentialMacronutrients
                carbohydratesTotal={user.carbohydratesTotal}
                proteinsTotal={user.proteinsTotal}
                fatsTotal={user.fatsTotal}
                carbohydratesConsumed={user.carbohydratesConsumed}
                proteinsConsumed={user.proteinsConsumed}
                fatsConsumed={user.fatsConsumed} />
            <Meals dishesConsumed={user.dishesConsumed}/>
        </div>
    );
}

export default Diary;