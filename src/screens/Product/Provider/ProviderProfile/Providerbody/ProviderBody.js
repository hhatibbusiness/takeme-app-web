import React from 'react';
import './ProviderBody.scss';

const ProviderBody = ({provider: p}) => {
    return (
        <div className={'ProviderBody'}>
            <div className="ProviderBody__details">
                <h2 className={'ProviderBody__name'}>{p?.name && p.name}</h2>
                <p className={'ProviderBody__city'}>{p?.city && p?.city}</p>
            </div>
            <p className={'ProviderBody__msg'}>{p?.productsCountMsg && p.productsCountMsg}</p>
            <p className={'ProviderBody__rating'}><i className="fa-solid fa-star"></i><span>{p?.ratingMsg && p.ratingMsg}</span></p>
        </div>
    );
};

export default ProviderBody;