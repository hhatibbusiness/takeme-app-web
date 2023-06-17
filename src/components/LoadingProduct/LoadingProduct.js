import React from 'react';
import './LoadingProduct.scss';
import {useTranslation} from "react-i18next";


const LoadingProduct = ({btn, details}) => {
    const {t} = useTranslation();

    return (
        <div className={'LoadingProduct'} style={{paddingTop: `${details ? '50px' : 0}`, padding: `${details ? '10px' : '0'}`}}>
            <div className="LoadingProduct__image" style={{minHeight: `${details ? '200px' : '100%'}`}}></div>
            {
                details && (
                    <>
                        <div className="LoadingProduct__header"></div>
                        <div className="LoadingProduct__msg"></div>
                        <div className="LoadingProduct__price"></div>
                    </>
                )
            }
            {
                btn && <button className="ProductsDetails__btn">{t('show products')}</button>
            }

        </div>
    );
};

export default LoadingProduct;