import React from 'react';
import './BackBtn.scss';
import history from '../../../../history/history';
const BackBtn = ({step, setStep}) => {
    return (
        <div role={'navbar__back'} onClick={() => {
            if(step && step > 1) {
                setStep(step - 1)
            } else {
                history.go(-1);
            }
        }} className={'BackBtn'}>
            <i className="fa-solid fa-left-long"></i>
        </div>
    );
};

export default BackBtn;