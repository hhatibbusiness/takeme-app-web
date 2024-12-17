import React, { useState, useEffect } from 'react';
import Input from '../../../../components/InputAdmin/Input';
import { formValidator } from '../../../../utilty/formValidator'; 

export default function NameInput ({ defaultValue, submitted, setValid, onValueChange, placeholderText, maxLength=20, Required=true }) {
    const [Name, setName] = useState({
        value: defaultValue || '',
        rules: {
            maxLength: {
                value: maxLength,
                valid: false,
                message: 'اكبر عدد من الحروف 20 حرف'
            },
            required: {
                value: Required,
                valid: false,
                message: "هذا الحقل مطلوب"
            },
        },
        touched: false,
        valid: false
    });

    const NameChangeHandler = value => {
        const inputIsValid = formValidator(Name.rules, value);
        setName({
            ...Name,
            touched: true,
            valid: inputIsValid,
            value: value,
            rules: {
                ...Name.rules,
                required: {
                    ...Name.rules.required,
                    valid: value !== ''
                },
                maxLength: {
                    ...Name.rules.maxLength,
                    valid: value.length <= Name.rules.maxLength.value
                }
            }
        });
        setValid(inputIsValid);
        onValueChange(value);
    }
    useEffect(()=> {
        NameChangeHandler(Name.value);
    }, []);

    useEffect(() => {
        setValid(Name.valid);
    }, [Name.valid, setValid]);

    return (
        <Input 
            touched={Name.touched} 
            valid={Name.valid} 
            rules={Name.rules} 
            submitted={submitted} 
            required={Name.rules.required} 
            value={Name.value} 
            setValue={value => NameChangeHandler(value)} 
            placeholder={placeholderText} 
        />
    );
}
