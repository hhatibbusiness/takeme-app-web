import React from 'react';
import './FallBack.css';

const FallBack = ({full}) => {
    return (
        <div className={`FallBack ${full ? 'FallBack__full' : ''}`}>

        </div>
    );
};

export default FallBack;