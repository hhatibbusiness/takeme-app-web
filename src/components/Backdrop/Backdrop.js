import React from 'react';
import './Backdrop.scss';
import history from '../../history/history';
import {useNavigate} from "react-router-dom";
const Backdrop = ({sidebar, setSidebar}) => {
    const navigate = useNavigate();
    return (
        <div onClick={() => {
            setSidebar(false);
            navigate('/');
        }} className={`Backdrop ${sidebar && 'Backdrop__active'}`}>

        </div>
    );
};

export default Backdrop;