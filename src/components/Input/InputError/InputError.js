import React from 'react';
import './InputError.css';

const InputError = ({touched, submitted, valid, rules}) => {
    return touched && submitted && !valid && (
            <ul className={'InputError__error--list'}>
                {
                    Object.keys(rules).map((r) => (
                        !rules[r].valid && <li>{ rules[r].message }</li>
                    ))
                }
            </ul>
        )
}

export default InputError;