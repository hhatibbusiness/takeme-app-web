import React, {useEffect, useRef, useState} from 'react';
import './ProviderProduct.scss';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Img from "../../../../Home/Body/BodyContainer/ProductList/Products/Product/Img/Img";
import RenderImgError from "../../../../../components/RenderImgError/RenderImgError";
import LoadingProduct from "../../../../../components/LoadingProduct/LoadingProduct";
import Gallery from "./Gallery/Gallery";
import {openGallery} from "../../../../../store/actions/product.actions";
import {connect} from "react-redux";

const ProviderProduct = ({imgRef, product, sliding, openGallery}) => {
    const [imgLoaded, setImgLoaded] = useState(false);
    const [imgUI, setImgUI] = useState(null);
    const [detailed, setDetailed] = useState(false);
    const navigate = useNavigate();
    const descRef = useRef();

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
        convertMarkup();
        renderImage()
    }, []);

    useEffect(() => {
        setDetailed(prevState => sliding && false);
    }, [sliding]);

    function createMarkup() {
        return {__html: product?.description && product.description};
    }

    const convertMarkup = () => {
        const parser = new DOMParser();
        const html = parser.parseFromString(product?.description && product.description, 'text/html');
        const imgs = [];
        const keys = [];
        const values = [];
        const ul = [];
        html.querySelectorAll('li')?.forEach(li => ul.push(li.innerHTML));
        html.querySelectorAll('span-key')?.forEach(span => keys.push(span.innerHTML));
        html.querySelectorAll('img-key')?.forEach(img => imgs.push(img.innerText));
        html.querySelectorAll('span')?.forEach(span => values.push(span.innerHTML));
        const markupObject = {
            msg: html.querySelector('p')?.innerHTML,
            ul: ul,
            details: {
                imgs: imgs,
                key: keys,
                values: values,
            },
            comment: html.querySelector('p-comment')?.innerHTML
        };
        return <div className={`ProviderProduct__details-dropdown ${!detailed && 'ProviderProduct__details--dropdown-hidden'}`} >
            {
                markupObject.msg ? (
                    <>
                        <p className={'ProviderProduct__details--title'}>{markupObject?.msg && markupObject.msg}</p>
                        <ul className="ProviderProduct__details--dropdown-props">
                            {
                                markupObject?.ul?.map(li => (
                                    <li className={'ProviderProduct__details--dropdown-item'}>
                                        <i className="fa-solid fa-check"></i>
                                        <p>{li && li}</p>
                                    </li>
                                ))
                            }
                        </ul>
                        <div>
                            {
                                markupObject?.details['imgs']?.map((img, i) => (
                                    <div className={'ProviderProduct__details--dropdown-list'}>
                                        <img src={img} alt=""/>
                                        <p className={'ProviderProduct__details--dropdown-key'}>{markupObject?.details['key'][i]}</p>
                                        <p>{markupObject?.details['values'][i]}</p>
                                    </div>
                                ))
                            }
                        </div>
                        <p className={'ProviderProduct__details--dropdown-comment'}><span>**</span>{markupObject?.comment && markupObject?.comment}</p>
                    </>
                ) : (product?.description && product.description)
            }
        </div>;
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
                                <p className={'ProviderProduct__title'}>{product?.name && product.name}</p>
                                {
                                    convertMarkup()
                                }
                                <div className="ProviderProduct__details--rent">
                                    <p className="ProviderProduct__details--rent-msg">
                                        {product?.rentDetails?.title && product.rentDetails.title}
                                    </p>
                                    <p className="ProviderProduct__details--rent-priceMsg">
                                        {product?.rentDetails?.priceMsg && product.rentDetails.priceMsg}
                                    </p>
                                    <p className="ProviderProduct__details--rent-min">
                                        {product?.rentDetails?.minimumforRentMsg && product.rentDetails.minimumforRentMsg}
                                    </p>
                                    <p className="ProviderProduct__details--rent-comments">
                                        <sup>**</sup>{product?.comments && product.comments}
                                    </p>
                                </div>
                                <div className="ProviderProduct__details--sale">
                                    <p className="ProviderProduct__details--sale-msg">
                                        {product?.saleDetails?.title && product.saleDetails.title}
                                    </p>
                                    <p className="ProviderProduct__details--sale-priceMsg">
                                        {product?.saleDetails?.priceMsg && product.saleDetails.priceMsg}
                                    </p>
                                    <p className="ProviderProduct__details--sale-comments">
                                        <sup>**</sup>{product?.comments && product.comments}
                                    </p>
                                </div>
                                <div onClick={() => setDetailed(!detailed)} className="ProviderProduct__dropdown--btn">
                                    <i className={`fa-solid fa-caret-down ${detailed && 'rotate'}`}></i>
                                </div>
                            </div>
                        </div>
                    )
                }
            <LoadingProduct priceStartFrom={true} priceTitle={true} imgLoaded={imgLoaded} details={true} btn={false} />
        </div>
    );
};

export default connect(null, {openGallery}) (ProviderProduct);