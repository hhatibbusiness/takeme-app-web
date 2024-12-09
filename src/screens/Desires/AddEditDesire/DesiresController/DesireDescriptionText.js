import React, { useState, useEffect } from 'react';
import TextArea from '../../../components/TextArea/TextArea';
import { formValidator } from '../../../utilty/formValidator'; 

export default function DesireDescriptionText ({ defaultValue, submitted, setValid, onValueChange }) {
    const [desireDescription, setDesireDescription] = useState({
        value: defaultValue || '',
        rules: {
            required: false,
            maxLength: {
                value: 250,
                valid: false,
                message: 'اكبر عدد من الحروف 250 حرف'
            },
        },
        touched: false,
        valid: false
    });
    
    const desireDescriptionChangeHandler = value => {
        const inputIsValid = formValidator(desireDescription.rules, value);
        setDesireDescription({
            ...desireDescription,
            touched: true,
            valid: inputIsValid,
            value: value,
            rules: {
                ...desireDescription.rules,
                maxLength: {
                    ...desireDescription.rules.maxLength,
                    valid: value.length <= desireDescription.rules.maxLength.value
                }
            }
        });
        setValid(inputIsValid);
        onValueChange(value);
    }
    useEffect(()=>{
        desireDescriptionChangeHandler(desireDescription.value);
    }, [])

    useEffect(() => {
        setValid(desireDescription.valid);
    }, [desireDescription.valid, setValid]);

    return (
        <TextArea
            touched={desireDescription.touched} 
            valid={desireDescription.valid} 
            rules={desireDescription.rules} 
            submitted={submitted} 
            required={false} 
            value={desireDescription.value} 
            setValue={value => desireDescriptionChangeHandler(value)} 
            placeholder={'الوصف'} 
        />
    );
}
