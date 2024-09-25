import React from 'react';
import './Failure.scss';
import errorImage from '../../../../../assets/error.jpg';
import searchErrorImage from '../../../../../assets/images/no-search.png';

const Failure = ({text, provider, product, search, home}) => {
    return (
        <div className={'Failure'}>
            {
                search ? <img className={'Failure__img'} src={searchErrorImage} /> : <img className={'Failure__img'} src={errorImage} />
            }
            <p>{text}</p>
        </div>
    );
};

export default React.memo(Failure);