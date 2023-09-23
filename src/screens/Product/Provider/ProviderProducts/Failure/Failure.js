import React from 'react';
import './Failure.scss';
import errorImage from '../../../../../assets/error.jpg';

const Failure = ({text}) => {
    return (
        <div className={'Failure'}>
            <img className={'Failure__img'} src={errorImage} />
            {/*<p><i className="fa-solid fa-circle-exclamation"></i></p>*/}
            <p>{text}</p>
        </div>
    );
};

export default Failure;