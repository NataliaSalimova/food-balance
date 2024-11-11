import React, {useEffect, useState} from 'react';

import styles from './water-consumption.module.scss';

import Title from '../title';
import { setUserDataApi } from '../../api';

const WaterConsumption = ({ user })=> {
    const [ cups, setCups ] = useState([
        {
            id: 0,
            disabled: true,
            selected: false,
        },
        {
            id: 1,
            disabled: true,
            selected: false,
        },
        {
            id: 2,
            disabled: true,
            selected: false,
        },
        {
            id: 3,
            disabled: true,
            selected: false,
        },
        {
            id: 4,
            disabled: true,
            selected: false,
        },
        {
            id: 5,
            disabled: true,
            selected: false,
        },
        {
            id: 6,
            disabled: true,
            selected: false,
        },
        {
            id: 7,
            disabled: true,
            selected: false,
        }
    ]);
    const [ userData, setUserData ] = useState({});
    const [ currentCup, setCurrentCup ] = useState(0);

    const onClick = (event)=> {
        updateCups(event);
        updateUserData();
    }

    const updateCups = (event)=> {
        const id = Number(event.currentTarget.dataset.id);

        const index = cups.findIndex((item => {
            return item.id === id;
        }));

        if (currentCup - id > 1) return;

        cups[index].selected = !cups[index].selected;
        setCups(cups);
        setCurrentCup(id);
    }

    const updateUserData = async ()=> {
        setUserData(prev => ({
            ...prev,
            waterConsumed: cups.filter((cup) => cup.selected).length * 0.25,
            cups: cups
        }));

        const response = await setUserDataApi(userData);

        if (!response.status) {
            alert('Что-то пошло не так');
        }
    }

    useEffect(()=> {
        setUserData(user);

        if (user.cups && user.cups.length) {
            setCups(user.cups);
            setCurrentCup(user.cups.filter((cup) => cup.selected).length - 1);
        }
    }, [user])

    return (
        <div>
            <Title className={`${styles.title} ta-center`}>
                Вода
            </Title>
            <p className={styles.subtitle}>
                { userData.waterConsumed } L
            </p>
            <ul className={styles.list}>
                {
                    cups.map((item)=> {
                        return (
                            <li className={`${styles.item} ${item.selected ? styles._selected : ''}`}
                                key={item.id}
                                data-id={item.id}
                                onClick={onClick}>
                                <button className={styles.button}>
                                    <img
                                        src="/images/cup.png"
                                        width="32"
                                        height="51"
                                        alt="Cup"/>
                                </button>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default WaterConsumption;