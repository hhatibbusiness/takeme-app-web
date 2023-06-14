import React from 'react';
import './Count.scss';

const Count = ({count}) => {
    return (
        <div className={'Count'}>
            {count}
        </div>
    );
};

export default Count;