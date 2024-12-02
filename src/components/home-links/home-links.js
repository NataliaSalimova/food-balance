import React from 'react';
import { Link } from 'react-router-dom';

import './home-links.scss';

import LINKS from './home-links.constants';

const HomeLinks = ()=> {
    return (
        <ul className="links">
            {
                LINKS.map((item)=> {
                    return (
                        <li key={item.id}>
                            <Link className="links__item" to={item.link}>
                                { item.description }
                            </Link>
                        </li>
                    )
                })
            }
        </ul>
    );
}

export default HomeLinks;
