import React, {useEffect} from 'react';
import './BackBtn.scss';
// import {useHistory} from 'react-router-dom';
import {useNavigate} from "react-router-dom";
import history from '../../../../history/history';

const BackBtn = () => {
    return (
        <div onClick={() => {
            history.back()
        }} className={'BackBtn'}>
            <i className="fa-solid fa-arrow-left"></i>
        </div>
    );
};

export default BackBtn;