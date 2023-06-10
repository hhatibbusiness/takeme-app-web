import React from 'react';
import './Backdrop.scss';

const Backdrop = ({sidebar, setSidebar}) => {
    return (
        <div onClick={() => setSidebar(false)} className={`Backdrop ${sidebar && 'Backdrop__active'}`}>

        </div>
    );
};

export default Backdrop;