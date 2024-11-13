import React from 'react';

import styles from './field.module.scss';

const Field = ({ label, id, value, onChange, error, errorText, checked, type='text', inputType })=> {
    return (
        <div className={`${styles.field}`}>
            <label
                htmlFor={id}
                className={`${styles.label}`}>
                { label }
            </label>
            <div>
                {inputType ?
                    <textarea
                        className={`${styles.input}`}
                        name={id}
                        placeholder={label}
                        id={id}
                        value={value}
                        onChange={onChange}/> :
                    <input
                        className={`${styles.input}`}
                        name={id}
                        placeholder={label}
                        id={id}
                        value={value}
                        type={type}
                        onChange={onChange}
                        checked={checked}/>
                }

            </div>

            {error && !value && <span className="error">{errorText}</span>}
        </div>
    )
}

export default Field;

