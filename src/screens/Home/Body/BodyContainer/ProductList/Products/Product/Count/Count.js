import React from 'react';
import './Count.scss';

const Count = ({count}) => {
    return (
        <div className={'Count'}>
            <span>
                {count}
            </span>
        </div>
    );
};

export default React.memo(Count);