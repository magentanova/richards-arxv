import React, { useCallback } from 'react';

const SelectGroup = props => {
    const changeHandler = useCallback(e => props.onSelect(e.target.value), []);
    const selected = props.selected || "-";
    return (
        <div className={"select-wrapper " + props.className}>
            <label htmlFor={props.selectId}>{props.label}: </label>
            <select defaultValue="-" value={selected} onChange={changeHandler} id={props.selectId}>
                <option key={"blank"}>-</option>
                {props.options.map(val => 
                    <option 
                        key={val}>{val}
                    </option>
                    )
                }
            </select>
        </div>
    )
}

export default SelectGroup;