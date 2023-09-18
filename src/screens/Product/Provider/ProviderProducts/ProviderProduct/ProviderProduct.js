import React, {useEffect, useRef, useState} from 'react';
import './ProviderProduct.scss';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Img from "../../../../Home/Body/BodyContainer/ProductList/Products/Product/Img/Img";
import RenderImgError from "../../../../../components/RenderImgError/RenderImgError";
import LoadingProduct from "../../../../../components/LoadingProduct/LoadingProduct";
import {connect} from "react-redux";
import {useTranslation} from "react-i18next";
import ProviderProductListItem from "./ProviderProductListItem/ProviderProductListItem";
import ProviderProductTags from "./ProviderProductTags/ProviderProductTags";
import ProviderProductComments from "./ProviderProductComments/ProviderProductComments";
import ProviderProductVariables from "./ProviderProductVariables/ProviderProductVariables";
import {togglePopup} from "../../../../../store/actions/ui.actions";
import {changePopupProduct} from "../../../../../store/actions/ui.actions";

const ProviderProduct = ({imgRef, togglePopup, product, changePopupProduct, sliding, openGallery, term}) => {
    const [imgLoaded, setImgLoaded] = useState(false);
    const [imgUI, setImgUI] = useState(null);
    const [detailed, setDetailed] = useState(false);
    const [short, setShort] = useState(true);
    const navigate = useNavigate();
    const descRef = useRef();
    const {t} = useTranslation();

    const renderImage = async () => {
        try{
            const res = await axios.get(product?.images[0]?.imagePath);
            if(res.status === 200) {
                const img = <Img setImgLoaded={setImgLoaded} imgUrl={product?.images[0]?.imagePath}/>;
                setImgUI(img);
            }
        }catch(e) {
            console.error(e);
            const imgUI =  <RenderImgError />;
            setImgLoaded(true);
            setImgUI(prevState => imgUI);
        }
    }

    useEffect(() => {
        // convertMarkup();
        renderImage()
    }, []);

    useEffect(() => {
        setDetailed(prevState => sliding && false);
    }, [sliding]);

    function createMarkup() {
        return {__html: product?.description && product.description};
    }

    const renderName = () => {
        var innerHTML = product.name;
        var index = innerHTML.indexOf(term);
        if (index >= 0) {
            // innerHTML = <p onClick={() => setDetailed(!detailed)} className={'ProviderProduct__title'}>{innerHTML.substring(0,index)}<span class='highlight'>{innerHTML.substring(index,index+term.length) }</span>{innerHTML.substring(index + term.length)}</p>;
            innerHTML = <p className={'ProviderProduct__title'}>{innerHTML.substring(0,index)}<span class='highlight'>{innerHTML.substring(index,index+term.length) }</span>{innerHTML.substring(index + term.length)}</p>;
            return innerHTML;
        } else {
            return innerHTML;
        }
    }

    return (
        <div ref={imgRef} className={'ProviderProduct'}>
                {
                    imgUI && (
                        <div className={`ProviderProduct__container ${imgLoaded ? 'ProviderProduct__visible' : 'ProviderProduct__hidden'}`}>
                            <div onClick={() => openGallery(product)} className={'ProviderProduct__body--container'}>
                                <div className="ProviderProduct__image--container">
                                    {
                                        imgUI
                                    }
                                </div>
                            </div>
                            <div className={'ProviderProduct__details'}>
                                {
                                    renderName()
                                }
                                <div className="ProviderProduct__details--prices">
                                    {
                                        product?.saleDetails && (
                                            <div className={'ProviderProduct__details--sale'}>
                                                {
                                                    product?.saleDetails?.comment && (
                                                        <div className="ProviderProduct__details--sale-icon">
                                                            <i className="fa-solid fa-circle-exclamation"></i>
                                                        </div>
                                                    )
                                                }
                                                <div className="ProviderProduct__details--sale-price">
                                                    {t('price')}
                                                </div>
                                                <div className="ProviderProduct__details--sale-pricenum">
                                                    {
                                                        product?.saleDetails?.price && <span>{product?.saleDetails?.price}</span>
                                                    }
                                                </div>
                                                <div className="ProviderProduct__details--sale-shekel">
                                                    <i className="fa-solid fa-shekel-sign"></i>
                                                </div>
                                            </div>
                                        )
                                    }
                                    {
                                        product?.rentDetails && (
                                            <div className={'ProviderProduct__details--rent'}>
                                                {
                                                    product?.rentDetails?.comment && (
                                                        <div className="ProviderProduct__details--sale-icon">
                                                            <i className="fa-solid fa-circle-exclamation"></i>
                                                        </div>
                                                    )
                                                }

                                                <div className="ProviderProduct__details--rent-price">
                                                    {t('rentPrice')}
                                                </div>
                                                <div className="ProviderProduct__details--rent-pricenum">
                                                    {
                                                        product?.rentDetails?.price && <span>{product?.rentDetails?.price}</span>
                                                    }
                                                </div>
                                                <div className="ProviderProduct__details--rent-shekel">
                                                    <i className="fa-solid fa-shekel-sign"></i>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                                {
                                    product?.description && (
                                        <div className="ProviderProduct__details--desc">
                                            {/*{product?.description?.text && <p className="ProviderProduct__details--text">{product?.description?.text && ((short ? `${product?.description?.text.substr(0, 50)}` : product?.description?.text))}  <span onClick={e => setShort(!short)} className={'ProviderProduct__details--text-short'}>{product?.description?.text && (short ? `...${t('more')}` : t('less'))}</span></p>}*/}
                                            {product?.description?.text && <p className="ProviderProduct__details--text">{product?.description?.text && ((short ? `${product?.description?.text.substr(0, 50)}` : product?.description?.text))}  <span onClick={e => {
                                                changePopupProduct(product);
                                                togglePopup()
                                            }} className={'ProviderProduct__details--text-short'}>{product?.description?.text && (short ? `...${t('more')}` : t('less'))}</span></p>}
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    )
                }
            <LoadingProduct priceStartFrom={true} priceTitle={true} imgLoaded={imgLoaded} details={true} btn={false} />
        </div>
    );
};

const mapStateToProps = state => ({
    term: state.search.term
})

export default connect(mapStateToProps, {togglePopup, changePopupProduct}) (ProviderProduct);