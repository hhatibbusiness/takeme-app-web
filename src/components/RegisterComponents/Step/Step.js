import React from 'react';
import './Step.scss';

const Step = ({step, setStep, form, isValid}) => {
    const renderSteps = () => {
        const items = [1, 2, 3];
        return items.map(s => (
            <div key={s} onClick={e =>  {
                if((s == 2 || s == 3) && !isValid) return;
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