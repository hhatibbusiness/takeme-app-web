import React, { useState, useEffect } from 'react';
import Input from '../../../../components/InputAdmin/Input';
import { formValidator } from '../../../../utilty/formValidator'; 


export default function NameInput ({ defaultValue, submitted, setValid, onValueChange, placeholderText, maxLength=20, type }) {
    const [conName, setConName] = useState({
        value: '',
        rules: {
            maxLength: {
                value: maxLength,
                valid: false,
                message: `اكبر عدد من الحروف ${maxLength} حرف`
            },
            required: {
                value: true,
                valid: false,
                message: "هذا الحقل مطلوب"
            }
        },
        touched: false,
        valid: false
    });

    const conNameChangeHandler = value => {
        const inputIsValid = formValidator(conName.rules, value, setConName, conName);
        setConName({
            ...conName,
            touched: true,
            valid: inputIsValid,
            value: value,
            rules: {
                ...conName.rules,
                required: {
                    ...conName.rules.required,
                    valid: value != ''
                },
                maxLength: {
                    ...conName.rules.maxLength,
                    valid: value.length <= conName.rules.maxLength.value
                }
            }
        });

        setValid(inputIsValid);
        onValueChange(value);
    }

    useEffect(() => {
        setConName({
            ...conName,
            value: defaultValue
        });
        conNameChangeHandler(defaultValue);
    }, [defaultValue]);

    return (
        <Input
            touched={conName.touched}
            valid={conName.valid}
            rules={conName.rules}
            submitted={submitted}
            required={conName.rules.required}
            value={conName.value}
            setValue={value => conNameChangeHandler(value)}
            placeholder={placeholderText}
            key={1}
            type={type || 'text'} 
        />
    );
}
