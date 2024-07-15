import './diary-page.css';

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import RatioCalories from '../../ratio-calories';
import EssentialMacronutrients from '../../essential-macronutrients';
import Meals from '../../meals';
import STORE from "../../../store";

function DiaryPage() {
    const fetchURLUser = 'http://pet.foodtracker.ru/getUser';

    const [user, setUser] = useState({
        caloriesConsumed: 0,
        carbohydratesConsumed: 0,
        proteinsConsumed: 0,
        fatsConsumed: 0,
        caloriesRemaining: 0,
        carbohydratesTotal: '',
        proteinsTotal: '',
        fatsTotal: '',
        dishes: []
    });

    const getUser = async ()=> {
        const response = await fetch(fetchURLUser, {
            method: 'GET',
            headers: {
                'authKey': localStorage.getItem('authKey')
            }
        });

        const res = await response.json();

        setUser(prevFormData => ({
            ...prevFormData,
            // caloriesConsumed: JSON.parse(res.data).caloriesConsumed ?? 0,
            caloriesRemaining: JSON.parse(res.data).calories,
            carbohydratesTotal: JSON.parse(res.data).carbohydrates,
            proteinsTotal: JSON.parse(res.data).proteins,
            fatsTotal: JSON.parse(res.data).fats,
            // carbohydratesConsumed: JSON.parse(res.data).carbohydratesConsumed ?? 0,
            // proteinsConsumed: JSON.parse(res.data).proteinsConsumed ?? 0,
            // fatsConsumed: JSON.parse(res.data).fatsConsumed ?? 0
        }));
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

        res.map((item, index)=> {
            STORE.DISHES.find((dish)=> {
                if ((item.dishID === dish.id)) {
                    calories += dish.calories;
                    carbohydratesConsumed += dish.carbohydrates;
                    proteinsConsumed += dish.proteins;
                    fatsConsumed += dish.fats;
                }
            });

            setUser(prev => ({
                ...prev,
                caloriesConsumed: calories,
                carbohydratesConsumed: carbohydratesConsumed,
                proteinsConsumed: proteinsConsumed,
                fatsConsumed: fatsConsumed,
            }));
        })
    }

    useEffect(()=> {
        getUser();
        getDishes();
    }, []);

    return (
        <div className="diary-page page-container">
            <div className="diary-page-header">
                <Link to='/' className="diary-page-link">
                    FoodBalance
                </Link>
                <Link to='/profile' className="page-link profile-link">
                    <img src="/images/profile.png" className="diary-page-profile-image" width="25" height="25" alt="Icon profile"/>
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
            <Meals/>
        </div>
    );
}

export default DiaryPage;