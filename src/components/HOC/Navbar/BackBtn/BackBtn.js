import React, {useEffect} from 'react';
import './BackBtn.scss';
import {useLocation, useNavigate} from "react-router-dom";
import history from '../../../../history/history'


const BackBtn = () => {
    const navigate = useNavigate();
    useEffect(() => {
        // navigate('/')
    });
    return (
        <div className={'BackBtn'}>
            <i className="fa-solid fa-arrow-left"></i>
        </div>
    );
};

export default BackBtn;