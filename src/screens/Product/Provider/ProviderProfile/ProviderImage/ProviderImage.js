import React from 'react';
import './ProviderImage.scss';

const ProviderImage = ({img}) => {
    return (
        <img className={'ProviderImage'} src={img} alt="provider"/>
    );
};

export default ProviderImage;