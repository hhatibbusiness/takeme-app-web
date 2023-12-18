import React from 'react';
import './Backdrop.scss';
import history from '../../history/history';
const Backdrop = ({sidebar, setSidebar}) => {
    return (
        <div onClick={() => {
            setSidebar(false);
            history.back();
        }} className={`Backdrop ${sidebar && 'Backdrop__active'}`}>

        </div>
    );
};

export default Backdrop;