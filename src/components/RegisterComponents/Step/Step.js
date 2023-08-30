import React from 'react';
import './Step.scss';

const Step = ({step, type, setStep, form, isValid, num, validation}) => {
    const renderSteps = () => {
        // const items = [1, 2, 3];
        const createArray = number => {
            let array = [];
            for (let i = 1; i <= number; i++) {
                array.push(i);
            }
            return array;
        }
        return createArray(num).map(s => (
            <div key={s} onClick={e =>  {
                if((s == 2 || s == 3) && !isValid) return;
                if(s == 3 && (type == 0 && (validation.email != form.email || !validation.valid))) return;
                if(type == 1 && step == 2 && (validation.email != form.email || !validation.valid)) return;
                setStep(s)
            }} className={`Step__s ${s <= step && 'Step__active'} ${s > 1 && 'step__lin'}`}>{s}</div>
        ))
    }
    return (
        <div className={'Step'}>
            {
                renderSteps()
            }
        </div>
    );
};

export default Step;