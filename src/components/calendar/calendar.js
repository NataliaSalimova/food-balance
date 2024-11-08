import React, { useState, useEffect } from 'react';

import styles from './calendar.module.scss';

const Calendar = ()=> {
    const [ date, setDate ] = useState();
    const [ currentDate, setCurrentDate ] = useState(new Date(localStorage.getItem('currentDate') ?? new Date()));

    const setFormattedDate = (date)=> {
        const day = date.getDate();
        const shortMonth = date.toLocaleString('default', { month: 'short' });
        const formattedDate = day + ' ' + shortMonth;

        setDate(formattedDate);
    }

    const saveDate = (date)=> {
        localStorage.setItem('currentDate', date);
    }

    const updateDate = (date = new Date())=> {
        setFormattedDate(date);
        saveDate(date)
    }

    const changeDate = (event)=> {
        const oneDay = 24 * 60 * 60 * 1000;

        setCurrentDate(
            event.target.classList.contains('_prev')
                ? new Date(currentDate.getTime() - oneDay)
                : new Date(currentDate.getTime() + oneDay)
        )

        updateDate(currentDate);
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