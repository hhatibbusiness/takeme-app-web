import React from 'react';
import './Failure.scss';

const Failure = ({text}) => {
    return (
        <div className={'Failure'}>
            <p><i className="fa-solid fa-circle-exclamation"></i></p>
            <p>{text}</p>
        </div>
    );
};

export default Failure;