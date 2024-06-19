import React, {useEffect, useRef, useState} from 'react';
import './DropDownListItem.css';
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import Img from "../../../screens/Home/Body/BodyContainer/ProductList/Products/Product/Img/Img";
import LoadingProduct from "../../LoadingProduct/LoadingProduct";
import providerDefaultImage from '../../../assets/images/defaults/default-provider-image.png';
import productDefaultImage from '../../../assets/images/defaults/default-product-image.png';
import {openSearchPopup, openPopup, changePopupProduct, changeCurrentProvider} from "../../../store/actions/ui.actions";
import {connect} from "react-redux";

const DropDownListItem = ({result, term, openPopup, changePopupProduct, changeCurrentProvider, openSearchPopup, setInputFocus, inputRef}) => {
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

    const titleRef = useRef();
    const navigate = useNavigate();

    const {t} = useTranslation();
    const selectAll = () => {
        const str = result?.productDTO?.name?.toLowerCase();
        const regex = /le/gi;
        const indices = [];
        let res = term?.toLowerCase();
        while ((res = regex.exec(str))) {
            indices.push(result.index);
        }
    }

    useEffect(() => {
        selectAll();
    }, []);

    const findAllOcc = (string, text) => {
        let index = [], i = -1;

        if(!term) return;

        while ((i = string.toLowerCase().indexOf(text.toLowerCase(), i + 1)) != -1) {
            index.push(i);
        }
        return index;
    }

    const renderName = () => {
        var innerHTML = result?.productDTO?.name;
        var index = innerHTML.indexOf(term);
        const occ = findAllOcc(result?.productDTO?.name, term);
        if(!term) {
            titleRef?.current.insertAdjacentHTML('beforeend', `<p className={'DropDownListItem__header--text-text'}>${result?.productDTO?.name}</p>`);
        } else {
            let title = document.createElement('p');
            title.classList.add('DropDownListItem__header--text-text');
            for(let i = 0; i < occ?.length; i++ ) {
                if(occ[i] != 0) {
                    if(i == 0) {
                        // console.log(innerHTML.substring(occ[i], term?.length));
                        title.insertAdjacentHTML('beforeend', `<span>${innerHTML?.substring(0, occ[i] )}</span>`);
                    } else {
                        title.insertAdjacentHTML('beforeend', `<span>${innerHTML.substring(occ[i - 1] + term?.length, occ[i])}</span>`)
                    }
                }
                title.insertAdjacentHTML('beforeend', `<span class="DropDownListItem__header--text-highlight">${result?.productDTO?.name?.substring(occ[i], occ[i] + term?.length)}</span>`)
                if(i == occ?.length -1) {
                    title.insertAdjacentHTML('beforeend', `<span>${innerHTML.substring(occ[i] + term?.length, innerHTML?.length)}</span>`)
                }
            }
            titleRef?.current.appendChild(title);
        }
    }

    useEffect(() => {
        if(titleRef?.current) {
            // console.log(titleRef?.current);
            renderName();
        }
    }, []);



    return (
        <div onClick={e => {
            e.stopPropagation()
            e.preventDefault();
            changePopupProduct(result.productDTO);
            changeCurrentProvider(result.provider);
            openPopup();
            navigate(`popup/${result?.productDTO?.id}`);
            openSearchPopup();
        }} className={'DropDownListItem'}>
            <div className="DropDownListItem__images">
                <div className="DropDownListItem__images--product">
                    <Img product={true} search={true} setError={setErrorProduct} hidden={hiddenProduct} setHidden={setHiddenProduct} setLoaded={setLoadedProduct} imgRefDub={imgRefDubProduct} setContainerLoaded={setContainerLoadedProduct} setImgLoaded={setImgLoadedProduct} imgUrl={(result?.productDTO?.images[0]?.imagePath && result?.productDTO?.images[0]?.imagePath) || productDefaultImage}/>
                    {(!loadedProduct || hiddenProduct) && <LoadingProduct imgLoaderRef={imgLoaderRefProduct} priceStartFrom={false} priceTitle={false} imgLoaded={false} details={false} btn={false} />}
                    {/*{true && <LoadingProduct imgLoaderRef={imgLoaderRefProduct} priceStartFrom={false} priceTitle={false} imgLoaded={false} details={false} btn={false} />}*/}

                    {/*<img className={'DropDownListItem__images--product-img'} src={result?.products[Object.keys(result?.products)[0]][0]?.images[0]?.imagePath} alt=""/>*/}
                    <div className="DropDownListItem__images--provider">
                        {/*<img className={'DropDownListItem__images--provider-img'} src={result?.imagePath} alt=""/>*/}
                        <Img provider={true} search={true} setError={setError} hidden={hidden} setHidden={setHidden} setLoaded={setLoaded} imgRefDub={imgRefDub} setContainerLoaded={setContainerLoaded} setImgLoaded={setImgLoaded} imgUrl={(result?.provider?.imagePath && result?.provider?.imagePath) || providerDefaultImage}/>
                        {(!loaded || hidden) && <LoadingProduct imgLoaderRef={imgLoaderRef} priceStartFrom={false} priceTitle={false} imgLoaded={false} details={false} btn={false} />}
                    </div>
                </div>
            </div>
            <div className="DropDownListItem__container">
                <div className="DropDownListItem__header">
                    <h4 ref={titleRef} className="DropDownListItem__header--text"></h4>
                </div>
                <div className="DropDownListItem__prices">
                    {
                        result?.productDTO?.saleDetails && (
                            <div className="DropDownListItem__prices--sale">
                                <p className="DropDownListItem__prices--sale-paragraph"><span className={'DropDownListItem__prices--sale-message'}>{t('price')}</span><span className={'Product__details--sale-starts'}>{result?.productDTO?.saleDetails?.price}</span><span className={'Product__details--icon'}><i className="fa-solid fa-shekel-sign"></i></span></p>
                            </div>
                        )
                    }
                    {
                        result?.productDTO?.rentDetails && (
                            <div className="DropDownListItem__prices--sale">
                                <p className="DropDownListItem__prices--sale-paragraph"><span className={'DropDownListItem__prices--sale-message'}>{t('rentPrice')}</span><span className={'Product__details--sale-starts'}>{result?.productDTO?.rentDetails?.price}</span><span className={'Product__details--icon'}><i className="fa-solid fa-shekel-sign"></i></span></p>
                            </div>
                        )
                    }
                </div>
                {
                    result?.productDTO?.description?.text && (
                        <div className="DropDownListItem__desc">
                            <p>{result?.productDTO?.description?.text.slice(0, 80)}</p>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default connect(null, {openPopup, changeCurrentProvider, changePopupProduct, openSearchPopup}) (DropDownListItem);