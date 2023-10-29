import React, {useEffect} from 'react';
import './BackBtn.scss';
// import {useHistory} from 'react-router-dom';
import {useNavigate} from "react-router-dom";
import history from '../../../../history/history';

const BackBtn = ({step, setStep}) => {
    return (
        <div onClick={() => {
            if(step && step > 1) {
                setStep(step - 1)
            } else {
                history.back()
            }
        }} className={'BackBtn'}>
            <i className="fa-solid fa-arrow-left"></i>
        </div>
    );
};

export default BackBtn;