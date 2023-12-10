import React from 'react';
import './Spinner.Styles.scss';

const SpinnerComponent = () => {
    return (
        <div role={'Spinner'} className={'Spinner'}>
            <div className={'Spinner__spinner'}></div>
        </div>
    );
};

export default SpinnerComponent;