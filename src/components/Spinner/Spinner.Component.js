import React from 'react';
import './Spinner.Styles.scss';

const SpinnerComponent = ({full}) => {
    return (
        <div role={'Spinner'} className={`Spinner ${full ? 'Spinner__full' : ''}`}>
            <div className={'Spinner__spinner'}></div>
        </div>
    );
};

export default SpinnerComponent;