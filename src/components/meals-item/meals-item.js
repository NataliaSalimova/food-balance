import React from 'react';
import { Link } from 'react-router-dom';

import './meals-item.css';

const MealsItem = ({ meal }) => {
    return (
        <li className="meals-item">
            <p className="meals-title">{meal.title}</p>
            <Link to={meal.type} className="meals-button">+</Link>
        </li>
    )
}

export default MealsItem;