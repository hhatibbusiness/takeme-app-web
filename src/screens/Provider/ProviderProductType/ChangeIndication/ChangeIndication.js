import React from 'react';
import './ChangeIndication.css';

const ChangeIndication = ({ next, prev, bottom, top }) => {
    return (
        <div className={'ChangeIndication'}>
            <div className="ChangeIndication__container">
                <p>انتقل الى {bottom ? next : prev}</p>
                <i className="fa-solid fa-circle-notch"></i>
            </div>
        </div>
    );
};

export default ChangeIndication;