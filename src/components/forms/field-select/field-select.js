import React from 'react';

import './field-select.scss';

const FieldSelect = (
    {
        name,
        onChange,
        mainOption,
        items,
        value,
        error,
        errorText
    })=> {
    return (
        <div className="field">
            <select className="field__input _select" name={name} onChange={onChange}>
                <option>{ mainOption }</option>
                {
                    items.map((item,index)=> {
                        return (
                            <option
                                key={index}
                                value={item.value}
                                {...(Number(value) === item.value && { selected: true })}>
                                {item.text}
                            </option>
                        )
                    })
                }
            </select>
            {error && !value && <span className="error">{ errorText }</span>}
        </div>
    )
}

export default FieldSelect;

