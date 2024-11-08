import React from 'react';

import styles from './field.module.scss';

const Field = ({ label, id, value, onChange, error, errorText, checked, type='text' })=> {
    return (
        <div className={`${styles.field}`}>
            <label
                className={`${styles.label}`}>
                { label }
            </label>
            <div>
                <input
                    className={`${styles.input}`}
                    name={id}
                    placeholder={label}
                    id={id}
                    value={value}
                    type={type}
                    onChange={onChange}
                    checked={checked}/>
            </div>

            {error && !value && <span className="error">{errorText}</span>}
        </div>
    )
}

export default Field;

