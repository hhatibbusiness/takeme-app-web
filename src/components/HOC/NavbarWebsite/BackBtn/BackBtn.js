import React from 'react';
import './BackBtn.scss';
import history from '../../../../history/history';
import backImage from '../../../../assets/images/defaults/back.png';

const BackBtn = ({step, setStep}) => {
    return (
        <div role={'navbar__back'} onClick={() => {
            if(step && step > 1) {
                setStep(step - 1)
            } else {
                history.go(-1);
            }
        }} className={'BackBtn'}>
            <img src={backImage} />
        </div>
    );
};

export default BackBtn;