import React from 'react';
import './Backdrop.scss';
import {useNavigate} from "react-router-dom";
const Backdrop = ({sidebar, backBtn, setSidebar}) => {
    const navigate = useNavigate();
    return (
        <div onClick={() => {
            setSidebar(false);
            // navigate('/');
            }} className={`Backdrop ${sidebar && 'Backdrop__active'}`}
            style={{zIndex: `${backBtn ? 0 : 4900}`}}
        >

        </div>
    );
};

export default Backdrop;