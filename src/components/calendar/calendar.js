import React, { useState, useEffect } from 'react';

import { CURRENT_DATE, ONE_DAY } from './calendar.constants';

import styles from './calendar.module.scss';

const Calendar = ({onClick})=> {
    const [ date, setDate ] = useState();
    const [ currentDate, setCurrentDate ] = useState(new Date(localStorage.getItem(CURRENT_DATE) ?? new Date()));

    const setFormattedDate = (date)=> {
        const day = date.getDate();
        const shortMonth = date.toLocaleString('default', { month: 'short' });
        const formattedDate = day + ' ' + shortMonth;

        setDate(formattedDate);
    }

    const saveDate = (date)=> {
        localStorage.setItem(CURRENT_DATE, date);
    }

    const updateDate = (date = new Date())=> {
        setFormattedDate(date);
        saveDate(date)
    }

    const changeDate = (event)=> {
        setCurrentDate(
            event.target.classList.contains('_prev')
                ? new Date(currentDate.getTime() - ONE_DAY)
                : new Date(currentDate.getTime() + ONE_DAY)
        )

        updateDate(currentDate);

        onClick(currentDate)
    }

    useEffect(()=> {
        currentDate ? updateDate(currentDate) : updateDate();
    }, [])

    return (
        <div className={styles.container}>
            <button className={`${styles.button} _prev`} onClick={changeDate}>
                &lt;
            </button>
            <p className={styles.currentDate}>
                { date }
            </p>
            <button className={styles.button} onClick={changeDate}>
                &gt;
            </button>
        </div>
    )
}

export default Calendar;