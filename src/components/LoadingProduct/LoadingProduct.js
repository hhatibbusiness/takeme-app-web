import React from 'react';
import './LoadingProduct.scss';
import {useTranslation} from "react-i18next";


const LoadingProduct = ({btn, imgLoaderRef, moreDetails, moreAndMoreDetails, rentDetails, details, imgLoaded, priceTitle, priceStartFrom}) => {
    const {t} = useTranslation();

    return (
        <div className={'LoadingProduct'} style={{paddingTop: `${details ? '30px' : 0}`, padding: `${details ? '0' : '0'}`, display: `${imgLoaded ? 'none' : 'block'}`}}>
            <div ref={imgLoaderRef} className="LoadingProduct__image" style={{minHeight: `${details ? '200px' : '100%'}`}}></div>
            {
                details && (
                    <div className={'LoadingProduct__details'}>
                        <h3 className="LoadingProduct__header"></h3>
                        {
                            priceStartFrom && <p className="LoadingProduct__price"></p>
                        }
                        {
                            rentDetails && <p className="LoadingProduct__price"></p>
                        }
                        {
                            priceTitle && <h5 className="LoadingProduct__msg"></h5>
                        }
                        {
                            moreDetails && <h5 className="LoadingProduct__msg"></h5>
                        }
                        {
                            moreAndMoreDetails && <h5 className="LoadingProduct__msg"></h5>
                        }

                    </div>
                )
            }
            {
                btn && <button className="ProductsDetails__btn">{t('show products')}</button>
            }

        </div>
    );
};

export default LoadingProduct;