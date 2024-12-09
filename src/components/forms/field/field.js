import React from 'react';

import './field.scss';

const Field = (
    {
        label,
        id,
        value,
        onChange,
        error,
        errorText,
        checked,
        inputType,
        className = '',
        type='text'
    })=> {
    return (
        <div className={`field ${className}`}>
            <label
                htmlFor={id}
                className="field__label">
                { label }
            </label>
            <div>
                {inputType ?
                    <textarea
                        className="field__input"
                        name={id}
                        placeholder={label}
                        id={id}
                        value={value}
                        onChange={onChange}/> :
                    <input
                        className="field__input"
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

