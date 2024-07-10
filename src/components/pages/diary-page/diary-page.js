import './diary-page.css';

import React, { useState, createContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import RatioCalories from '../../ratio-calories';
import EssentialMacronutrients from '../../essential-macronutrients';
import Meals from '../../meals';
//
// import Context from '../../context/index';
//
// import STORE from '../../../store';

function DiaryPage() {
    const fetchURLUser = 'http://pet.foodtracker.ru/getUser';
    // const fetchUrlProducts = 'http://pet.foodtracker.ru/diary';
    // const navigate = useNavigate();

    const [user, setUser] = useState({
        caloriesConsumed: 0,
        caloriesRemaining: 0,
        carbohydratesСonsumed: 0,
        proteinsСonsumed: 0,
        fatsСonsumed: 0,
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

        console.log(res)

        setUser(prevFormData => ({
            ...prevFormData,
            caloriesRemaining: JSON.parse(res.data).calories,
            carbohydratesTotal: JSON.parse(res.data).carbohydrates,
            proteinsTotal: JSON.parse(res.data).proteins,
            fatsTotal: JSON.parse(res.data).fats,
        }));
    };
    //
    // const [value, setValue] = useState('');
    //
    // const getDishes = async ()=> {
    //     const response = await fetch(fetchUrlProducts, {
    //         method: 'GET',
    //         headers: {
    //             'authKey': localStorage.getItem('authKey'),
    //             'date': new Date().toISOString()
    //         }
    //     })
    //
    //     if (response.status === 200) {
    //         const products = await response.json();
    //         let calories = 0;
    //         let proteins = 0;
    //         let fats = 0;
    //         let carbohydrates = 0;
    //         let dishes = [];
    //
    //         products.forEach((product, index)=> {
    //             let findProduct = STORE.DISHES.find(currentProduct => currentProduct.id === product.dishID);
    //             findProduct.ID = product.ID;
    //
    //             calories += findProduct.calories;
    //             proteins += findProduct.proteins;
    //             fats += findProduct.fats;
    //             carbohydrates += findProduct.carbohydrates;
    //             dishes.push(findProduct);
    //         });
    //
    //         setUser(prev=> ({
    //             ...prev,
    //             caloriesСonsumed: calories,
    //             carbohydratesСonsumed: carbohydrates,
    //             proteinsСonsumed: proteins,
    //             fatsСonsumed: fats,
    //             productsConsumed: dishes
    //         }));
    //     };
    // }
    //
    useEffect(()=> {
        getUser();
        // getDishes();
    }, []);

    return (
        <div className="diary-page page-container">
            <div className="diary-page-header">
                <Link to='/' className="diary-page-link">
                    FoodBalance
                </Link>
                <Link to='/profile' className="page-link diary-profile-link">
                    Profile
                </Link>
            </div>

            <RatioCalories
                caloriesConsumed={user.caloriesConsumed}
                caloriesRemaining={user.caloriesRemaining}/>
            <EssentialMacronutrients
                carbohydratesTotal={user.carbohydratesTotal}
                proteinsTotal={user.proteinsTotal}
                fatsTotal={user.fatsTotal}
                carbohydratesConsumed={user.carbohydratesСonsumed}
                proteinsConsumed={user.proteinsСonsumed}
                fatsConsumed={user.fatsСonsumed} />
            <Meals/>
            
            {/*<Context.Provider value={{ value, setValue }}>*/}
            {/*    <Meals ccal={user.calories} dishes={user.productsConsumed}/>*/}
            {/*</Context.Provider>*/}
        </div>
    );
}

export default DiaryPage;
