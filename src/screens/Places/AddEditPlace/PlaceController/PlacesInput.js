import React, { useState, useEffect } from 'react';
import Input from '../../../../components/InputAdmin/Input';
import { formValidator } from '../../../../utilty/formValidator'; 

export default function DesireNameInput ({ defaultValue, submitted, setValid, onValueChange, placeholderText }) {
    const [desireName, setDesireName] = useState({
        value: defaultValue || '',
        rules: {
            maxLength: {
                value: 20,
                valid: false,
                message: 'اكبر عدد من الحروف 20 حرف'
            },
            required: {
                value: true,
                valid: false,
                message: "هذا الحقل مطلوب"
            },
        },
        touched: false,
        valid: false
    });

    const desireNameChangeHandler = value => {
        const inputIsValid = formValidator(desireName.rules, value);
        setDesireName({
            ...desireName,
            touched: true,
            valid: inputIsValid,
            value: value,
            rules: {
                ...desireName.rules,
                required: {
                    ...desireName.rules.required,
                    valid: value !== ''
                },
                maxLength: {
                    ...desireName.rules.maxLength,
                    valid: value.length <= desireName.rules.maxLength.value
                }
            }
        });
        setValid(inputIsValid);
        onValueChange(value);
    }
    useEffect(()=> {
        desireNameChangeHandler(desireName.value);
    }, []);

    useEffect(() => {
        setValid(desireName.valid);
    }, [desireName.valid, setValid]);

    return (
        <Input 
            touched={desireName.touched} 
            valid={desireName.valid} 
            rules={desireName.rules} 
            submitted={submitted} 
            required={desireName.rules.required} 
            value={desireName.value} 
            setValue={value => desireNameChangeHandler(value)} 
            placeholder={placeholderText} 
        />
    );
}
