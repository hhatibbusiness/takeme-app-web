import React, {useEffect} from 'react';
import './BackBtn.scss';
// import {useHistory} from 'react-router-dom';
import {useNavigate} from "react-router-dom";
import history from '../../../../history/history';
import backArrow from '../../../../assets/images/Back arrow.svg';
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
            {/*<i className="fa-solid fa-arrow-left"></i>*/}
        </div>
    );
};

export default BackBtn;