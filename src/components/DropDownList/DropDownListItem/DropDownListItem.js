import React, {useEffect, useRef, useState} from 'react';
import './DropDownListItem.css';
import {useTranslation} from "react-i18next";
import {useLocation} from "react-router-dom";
import history from '../../../history/history';
import Img from "../../../screens/Home/Body/BodyContainer/ProductList/Products/Product/Img/Img";
import categoryAlt from "../../../assets/images/categoryalt.jpg";
import LoadingProduct from "../../LoadingProduct/LoadingProduct";
import providerDefaultImage from '../../../assets/images/defaults/default-provider-image.png';
import productDefaultImage from '../../../assets/images/defaults/default-product-image.png';

const DropDownListItem = ({result, term, setInputFocus, inputRef}) => {
    const [error, setError] = useState(false);
    const [hidden, setHidden] = useState(true);
    const [loaded, setLoaded] = useState(false);
    const imgRefDub = useRef(null);
    const [containerLoaded, setContainerLoaded] = useState(false);
    const [imgLoaded, setImgLoaded] = useState(true);
    const imgLoaderRef = useRef(null);
    const [errorProduct, setErrorProduct] = useState(false);
    const [hiddenProduct, setHiddenProduct] = useState(true);
    const [loadedProduct, setLoadedProduct] = useState(false);
    const imgRefDubProduct = useRef(null);
    const [containerLoadedProduct, setContainerLoadedProduct] = useState(false);
    const [imgLoadedProduct, setImgLoadedProduct] = useState(true);
    const imgLoaderRefProduct = useRef(null);


    const {t} = useTranslation();

    const {hash} = useLocation();

    useEffect(() => {

    }, []);

    const getSubString = (string) => {
        const lowercaseTitle = result?.products[Object.keys(result?.products)[0]][0]?.name?.toLowerCase()
        const lowercaseTerm = term?.toLowerCase();
        // console.log(lowercaseTitle?.indexOf(lowercaseTerm), lowercaseTerm, lowercaseTitle);
        // return lowercaseTitle?.indexOf(lowercaseTerm);
        return lowercaseTitle.indexOf(lowercaseTerm);
    }

    const renderName = () => {
        var innerHTML = result?.products[Object.keys(result?.products)[0]][0]?.name;
        var index = innerHTML.indexOf(term);
        if (getSubString(term) != -1) {
            // innerHTML = <p onClick={() => setDetailed(!detailed)} className={'ProviderProduct__title'}>{innerHTML.substring(0,index)}<span class='highlight'>{innerHTML.substring(index,index+term.length) }</span>{innerHTML.substring(index + term.length)}</p>;
            innerHTML = <p className={'DropDownListItem__header--text-text'}>{innerHTML.substring(0,getSubString(term))}<span class='DropDownListItem__header--text-highlight'>{innerHTML.substring(getSubString(term),getSubString(term) + term.length)}</span>{innerHTML.substring(getSubString(term) + term.length)}</p>;
            return innerHTML;
        } else {
            return innerHTML;
        }
    }

    const getOffset = (parentPosition, elementPosition) => {
        if(parentPosition > 0) {
            return elementPosition + Math.abs(parentPosition) - 335;
        } else if(parentPosition < 0 && elementPosition > 0) {
            return elementPosition + Math.abs(parentPosition) ;
        }else if(parentPosition < 0 && elementPosition < 0) {
            // console.log(Math.abs(parentPosition) + elementPosition)
            return Math.abs(parentPosition) + elementPosition;
        }
    }

    return (
        <div onClick={e => {
            e.stopPropagation()
            e.preventDefault();
            const element = document?.getElementById(result?.id);
            if(element) {
                const elementPosition = element.getBoundingClientRect().top;
                const parent = document.querySelector('.SearchScreen');
                const container = document.querySelector('.SearchScreen__container');
                const parentPosition = container.getBoundingClientRect().top;
                if(parent) {
                    // console.log(elementPosition, element.getBoundingClientRect().top, parentPosition);
                    if(window) {
                        // console.log('Heelo from the window');
                        setTimeout(() => {
                            parent.scrollTo(0, getOffset(parentPosition, elementPosition));
                        }, 10);
                    }
                }
            }
            setInputFocus(false);
            history.back();

        }} className={'DropDownListItem'}>
            <div className="DropDownListItem__images">
                <div className="DropDownListItem__images--product">
                    <Img provider={true} setError={setErrorProduct} hidden={hiddenProduct} setHidden={setHiddenProduct} setLoaded={setLoadedProduct} imgRefDub={imgRefDubProduct} setContainerLoaded={setContainerLoadedProduct} setImgLoaded={setImgLoadedProduct} imgUrl={(result?.products[Object.keys(result?.products)[0]][0]?.images[0]?.imagePath && result?.products[Object.keys(result?.products)[0]][0]?.images[0]?.imagePath) || productDefaultImage}/>
                    {(!loadedProduct || hiddenProduct) && <LoadingProduct imgLoaderRef={imgLoaderRefProduct} priceStartFrom={false} priceTitle={false} imgLoaded={false} details={false} btn={false} />}
                    {/*{true && <LoadingProduct imgLoaderRef={imgLoaderRefProduct} priceStartFrom={false} priceTitle={false} imgLoaded={false} details={false} btn={false} />}*/}

                    {/*<img className={'DropDownListItem__images--product-img'} src={result?.products[Object.keys(result?.products)[0]][0]?.images[0]?.imagePath} alt=""/>*/}
                    <div className="DropDownListItem__images--provider">
                        {/*<img className={'DropDownListItem__images--provider-img'} src={result?.imagePath} alt=""/>*/}
                        <Img provider={true} setError={setError} hidden={hidden} setHidden={setHidden} setLoaded={setLoaded} imgRefDub={imgRefDub} setContainerLoaded={setContainerLoaded} setImgLoaded={setImgLoaded} imgUrl={(result?.imagePath && result?.imagePath) || providerDefaultImage}/>
                        {(!loaded || hidden) && <LoadingProduct imgLoaderRef={imgLoaderRef} priceStartFrom={false} priceTitle={false} imgLoaded={false} details={false} btn={false} />}
                    </div>
                </div>
            </div>
            <div className="DropDownListItem__container">
                <div className="DropDownListItem__header">
                    <h4 className="DropDownListItem__header--text">{renderName()}</h4>
                </div>
                <div className="DropDownListItem__prices">
                    {
                        result?.products[Object.keys(result?.products)[0]][0]?.saleDetails && (
                            <div className="DropDownListItem__prices--sale">
                                <p className="DropDownListItem__prices--sale-paragraph"><span className={'DropDownListItem__prices--sale-message'}>{t('salestartsfrom')}</span><span className={'Product__details--sale-starts'}>{result?.products[Object.keys(result?.products)[0]][0]?.saleDetails?.price}</span><span className={'Product__details--icon'}><i className="fa-solid fa-shekel-sign"></i></span></p>
                            </div>
                        )
                    }
                    {
                        result?.products[Object.keys(result?.products)[0]][0]?.rentDetails && (
                            <div className="DropDownListItem__prices--sale">
                                <p className="DropDownListItem__prices--sale-paragraph"><span className={'DropDownListItem__prices--sale-message'}>{t('rentstartsfrom')}</span><span className={'Product__details--sale-starts'}>{result?.products[Object.keys(result?.products)[0]][0]?.rentDetails?.price}</span><span className={'Product__details--icon'}><i className="fa-solid fa-shekel-sign"></i></span></p>
                            </div>
                        )
                    }
                </div>
                {
                    result?.products[Object.keys(result?.products)[0]][0]?.description?.text && (
                        <div className="DropDownListItem__desc">
                            <p>{result?.products[Object.keys(result?.products)[0]][0]?.description?.text.slice(0, 80)}</p>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default DropDownListItem;