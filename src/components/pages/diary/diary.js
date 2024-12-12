import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getUserDataApi, getDishesApi } from '../../../api';

import STORE from '../../../store';

import Header from '../../header'
import RatioCalories from '../../ratio-calories';
import Nutrients from '../../nutrients';
import Calendar from '../../calendar';
import Meals from '../../meals';
import WaterConsumption from '../../water-consumption';
import Loader from '../../loader';

function Diary() {
    const [ nutrients, setNutrients ] = useState({
        carbohydrates: {
            consumed: 0,
            total: 0
        },
        proteins: {
            consumed: 0,
            total: 0
        },
        fats: {
            consumed: 0,
            total: 0
        }
    });
    const [ calories, setCalories ] = useState({
        consumed: 0,
        remaining: 0,
    });
    const [ dishes, setDishes ] = useState([]);
    const [ water, setWater ] = useState({
        consumed: 0,
        cups: []
    });
    const [ isLoading, setIsLoading ] = useState(true);
    const navigate = useNavigate();

    const getUserDataRequest = ()=> {
        return getUserDataApi();
    }

    const getUserData = async ()=> {
        const response = await getUserDataRequest();

        switch (response.status) {
            case 200:
                getUserDataSuccess(response);
                break;
            case 401:
                getUserDataError();
                break;
            default:
                break;
        }

        setIsLoading(false);
    };

    const getUserDataSuccess = (response)=> {
        updateCalories(response.responseJSON.calories);
        updateNutrients(response.responseJSON)

        // setUser(prevState => ({
        //     ...prevState,
        //     caloriesRemaining: calories ?? caloriesRemaining,
        //     carbohydratesTotal: carbohydrates ?? carbohydratesTotal,
        //     proteinsTotal: proteins ?? proteinsTotal,
        //     fatsTotal: fats ?? fatsTotal,
        //     waterConsumed: cups ? cups.filter((cup) => cup.selected).length * 0.25 : 0,
        //     cups: cups ?? []
        // }));
    }

    const updateCalories = (calories)=> {
        setCalories(() => ({
            consumed: 0,
            total: calories
        }));
    }

    const updateNutrients = (response)=> {
        const { carbohydrates, proteins, fats } = response;

        setNutrients(()=> ({
            carbohydrates: {
                consumed: 0,
                total: carbohydrates
            },
            proteins: {
                consumed: 0,
                total: proteins
            },
            fats: {
                consumed: 0,
                total: fats
            }
        }))
    }

    const getUserDataError = ()=> {
        navigate('/login');
    }

    const getDishes = async ()=> {
        const data= {
            date: new Date(localStorage.getItem('currentDate')).toISOString() ?? new Date().toISOString()
        }
        const result = await getDishesApi(data);

        let calories = 0;
        let carbohydratesConsumed = 0;
        let proteinsConsumed = 0;
        let fatsConsumed = 0;
        let dishes = [];

        result.responseJSON.map((item)=> {
            STORE.DISHES.find((dish)=> {
                if ((item.dishID === dish.id)) {
                    calories += dish.calories;
                    carbohydratesConsumed += dish.carbohydrates;
                    proteinsConsumed += dish.proteins;
                    fatsConsumed += dish.fats;
                    dishes.push(item);
                }
            });
        })

        // setUser(prevState => ({
        //     ...prevState,
        //     caloriesConsumed: calories,
        //     carbohydratesConsumed: carbohydratesConsumed,
        //     proteinsConsumed: proteinsConsumed,
        //     fatsConsumed: fatsConsumed,
        //     dishesConsumed: dishes
        // }));
    }

    useEffect(()=> {
        getUserData();
        //getDishes();
    }, []);

    return (
        <div className="page-container">
            { isLoading ? <Loader/> : '' }
            <Header/>
            <RatioCalories
                calories={ calories }/>
            <Nutrients
                carbohydrates={ nutrients.carbohydrates }
                proteins={ nutrients.proteins }
                fats={ nutrients.fats } />
            {/*<Calendar onClick={getDishes}/>*/}
            {/*<Meals dishesConsumed={user.dishesConsumed}/>*/}
            {/*<WaterConsumption user={user}/>*/}
        </div>
    );
}

export default Diary;