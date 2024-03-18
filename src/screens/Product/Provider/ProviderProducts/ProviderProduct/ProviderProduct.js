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
import {togglePopup, changeDestination} from "../../../../../store/actions/ui.actions";
import {changePopupProduct} from "../../../../../store/actions/ui.actions";
import {getAnalytics, logEvent} from "firebase/analytics";
import {closeGallery} from "../../../../../store/actions/product.actions";
import productDefault from '../../../../../assets/images/defaults/default-product-image.png'
import {editProviderProduct} from "../../../../../store/actions/provider.actions";
import SpinnerComponent from "../../../../../components/Spinner/Spinner.Component";

const ProviderProduct = ({imgRef,searchPage, user, isSearch, editProviderProduct, provider, setGallery, lan, changeDestination, arrayRef, providerOrNot, productTypesCount, search, providerRef, togglePopup, product, changePopupProduct, sliding, openGallery, term}) => {
    const [error, setError] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [imgLoaded, setImgLoaded] = useState(true);
    const [imgUI, setImgUI] = useState(true);
    const [detailed, setDetailed] = useState(false);
    const [short, setShort] = useState(true);
    const [containerLoaded, setContainerLoaded] = useState(false);
    const navigate = useNavigate();
    // const descRef = useRef();
    const {t} = useTranslation();
    const imgRefDub = useRef(null);
    const imgLoaderRef = useRef(null);
    const containerRef = useRef(null);
    const failureRef = useRef(null);
    const imgContainerRef = useRef(null);
    const [hidden, setHidden] = useState(true);
    const [more, setMore] = useState(false);
    const productRef = useRef();
    const [charCount, setCharCount] = useState(0);
    const [titleEdit, setTitleEdit] = useState(false);
    const [title, setTitle] = useState('');
    const [salePrice, setSalePrice] = useState('');
    const [salePriceEdit, setSalePriceEdit] = useState(false);
    const [rentPrice, setRentPrice] = useState('');
    const [rentPriceEdit, setRentPriceEdit] = useState(false);
    const [rentDuration, setRentDuration] = useState('');
    const [rentUnit, setRentUnit] = useState('');
    const [desEdit, setDescEdit] = useState(false);
    const [desc, setDesc] = useState('');
    const titleRef = useRef();
    const priceRef = useRef();
    const rentRef = useRef();
    const descRef = useRef();
    const [editing, setEditing] = useState(false);
    const [status, setStatus] = useState(null);

    useEffect(() => {
        let timer;
        let duration = 1500;
        if(titleRef?.current) {
            console.log('Hello title!')
            titleRef?.current?.addEventListener('touchstart', e=> {
                console.log('Hello starting!')
                timer = setTimeout(() => {
                    if (user?.uType == 'customer' || user?.providerId != product?.providerId) return;
                    // console.log('proceed');
                    console.log('Heello form holding!')
                    console.log(user?.providerId, product?.providerId);
                    setTitleEdit(true);
                    setTitle(product?.name);
                    setStatus(product?.saleDetails?.status);
                    setRentPriceEdit(false);
                    setSalePriceEdit(false);
                    setDescEdit(false);
                }, duration);
            });

            titleRef?.current?.addEventListener('touchend', e => {
                clearInterval(timer);
                timer = null;
            });
        }

        return () => {
            clearInterval(timer);
            timer = null;
        }
    }, [titleRef?.current]);

    useEffect(() => {
        let timer;
        let duration = 2000;
        if(descRef?.current) {
            console.log('Hello title!')
            descRef?.current?.addEventListener('touchstart', e=> {
                console.log('Hello starting!')
                timer = setTimeout(() => {
                    if (user?.uType == 'customer' || user?.providerId != product?.providerId) return;
                    // console.log('proceed');
                    console.log('Heello form holding!')
                    console.log(user?.providerId, product?.providerId);
                    setDescEdit(true);
                    setDesc(product?.description?.text);
                    setTitleEdit(false);
                    setSalePriceEdit(false);
                    setRentPriceEdit(false);
                }, duration);
            });

            descRef?.current?.addEventListener('touchend', e => {
                clearInterval(timer);
                timer = null;
            });
        }

        return () => {
            clearInterval(timer);
            timer = null;
        }
    }, [descRef?.current]);

    useEffect(() => {
        let timer;
        let duration = 2000;
        if(priceRef?.current) {
            console.log('Hello title!')
            priceRef?.current?.addEventListener('touchstart', e=> {
                console.log('Hello starting!')
                timer = setTimeout(() => {
                    if (user?.uType == 'customer' || user?.providerId != product?.providerId) return;
                    // console.log('proceed');
                    console.log('Heello form holding!')
                    console.log(user?.providerId, product?.providerId);
                    setSalePriceEdit(true);
                    setSalePrice(product?.saleDetails?.price);
                    setRentPriceEdit(false);
                    setTitleEdit(false);
                    setDescEdit(false);
                }, duration);
            });

            priceRef?.current?.addEventListener('touchend', e => {
                clearInterval(timer);
                timer = null;
            });
        }

        return () => {
            clearInterval(timer);
            timer = null;
        }
    }, [priceRef?.current]);

    useEffect(() => {
        let timer;
        let duration = 2000;
        if(rentRef?.current) {
            console.log('Hello title!')
            rentRef?.current?.addEventListener('touchstart', e=> {
                console.log('Hello starting!')
                timer = setTimeout(() => {
                    if (user?.uType == 'customer' || user?.providerId != product?.providerId) return;
                    // console.log('proceed');
                    console.log('Heello form holding!')
                    console.log(user?.providerId, product?.providerId);
                    setRentPriceEdit(true);
                    setRentPrice(product?.rentDetails?.price);
                    setRentDuration(product?.rentDetails?.minTimForRent);
                    setRentUnit(product?.rentDetails?.rentUnit);
                    setTitleEdit(false);
                    setDescEdit(false);
                    setSalePriceEdit(false);
                }, duration);
            });

            rentRef?.current?.addEventListener('touchend', e => {
                clearInterval(timer);
                timer = null;
            });
        }

        return () => {
            clearInterval(timer);
            timer = null;
        }
    }, [rentRef?.current]);

    const formateMinDuration = (duration, unit) => {
        switch (unit) {
            case "Days":
                if(duration == 0) return;
                if(duration == 1) return t("rentDurationDay");
                if(duration == 2) return t("twoDays");
                else return `${duration}${t("multipleDays")}`;
                break;
            case "Hours":
                if(duration == 0) return;
                if(duration == 1) return t("rentDurationHour");
                if(duration == 2) return t("twoHours");
                else return `${duration} ${t("MultipleHours")}`;
                break;
        }
    }

    const renderImage = () => {
        const img = <Img imgRefDub={imgRefDub} setContainerLoaded={setContainerLoaded} setImgLoaded={setImgLoaded} imgUrl={product?.images[0]?.imagePath}/>;
    }

    useEffect(() => {
        renderImage()
    }, []);

    useEffect(() => {
        setDetailed(prevState => sliding && false);
    }, [sliding]);

    function createMarkup() {
        return {__html: product?.description && product.description};
    }

    const getSubString = (string) => {
        let lowercaseTitle = product?.name?.toLowerCase();
        const lowercaseTerm = term?.toLowerCase();
        // console.log(lowercaseTitle?.indexOf(lowercaseTerm), lowercaseTerm, lowercaseTitle);
        // return lowercaseTitle?.indexOf(lowercaseTerm);
        // const indexes = [];
        // if(lowercaseTerm.length > 0) {
        //     for (let i = 0; i < lowercaseTitle.length; i = i + lowercaseTerm.length) {
        //         // console.log(i, lowercaseTitle);
        //         const index = lowercaseTitle.indexOf(lowercaseTerm);
        //         if(index !== -1) {
        //             indexes.push(index + ((indexes[indexes.length - 1] + 1)  || 0));
        //             lowercaseTitle = lowercaseTitle.slice(index, lowercaseTerm);
        //         }
        //     }
        // }
        // console.log(indexes);
        return lowercaseTitle.indexOf(lowercaseTerm);
    }

    const renderName = () => {
        var innerHTML = product?.name;
        var index = innerHTML.indexOf(term);
        // console.log(term);
        if (getSubString(term) != -1) {
            // console.log(true)
            // innerHTML = <p onClick={() => setDetailed(!detailed)} className={'ProviderProduct__title'}>{innerHTML.substring(0,index)}<span class='highlight'>{innerHTML.substring(index,index+term.length) }</span>{innerHTML.substring(index + term.length)}</p>;
            innerHTML = <p className={'ProviderProduct__title'}>{innerHTML.substring(0,getSubString(term))}<span class='highlight'>{innerHTML.substring(getSubString(term),getSubString(term) + term.length)}</span>{innerHTML.substring(getSubString(term) + term.length)}{product?.saleDetails?.status && <span className={'ProviderProduct__title--status'}>({product?.saleDetails?.status})</span>}</p>;
            return innerHTML;
        } else {
            return innerHTML;
        }

        // const span = document.createElement('span');
        // span.className = 'highlight';
        // span.innerHTML = term;
        // const paragraph = document.createElement('p');
        // paragraph.className = 'ProviderProduct__title';
        // paragraph.innerHTML = product?.name?.toLowerCase().replace(term , span );
        //
        // // return <p className={'ProviderProduct__title'}>{product?.name?.toLowerCase().replace(term , span )}</p>;
        //
        // return paragraph;

        // return <p className={'ProviderProduct__title'}>{product?.name?.toLowerCase().replace(term.toLowerCase(), <span className={'highlight'}>{term}</span>)}</p>
    }
    //
    // useEffect(() => {
    //     if(!imgContainerRef?.current || !imgRef?.current) return;
    //     window.addEventListener('resize', () => {
    //         imgContainerRef.current.style.height = `${imgRef.current.getBoundingClientRect().height}px`;
    //     })
    //     console.log(imgContainerRef, imgRef);
    // }, []);

    const changeHeightToWidth = () => {
        const imgElement = containerRef.current;
        const imgLoader = imgLoaderRef.current
        const imgContainer = imgContainerRef.current;
        const providerElem = providerRef.current;
        const failureEle = failureRef.current;
        const productContainer = arrayRef?.current;
        if(!imgElement) return;
        const containerHeight = productContainer?.getBoundingClientRect().width;
        // if(providerElem && !providerOrNot) providerElem.style.height = `${750 + (containerHeight - 400)}px`;
        // if(providerElem && providerOrNot) providerElem.style.height = `${250 + 400 * productTypesCount + productTypesCount * 200 + (containerHeight - 400) * productTypesCount}px`;
        if(imgLoader) imgLoader.style.height = `${containerHeight}px`;
        if(imgContainer) imgContainer.style.height = `${containerHeight}px`;
        if(failureEle) failureEle.style.height = `${containerHeight}px`;
        if(productContainer || failureEle || imgContainer || imgLoader || imgElement && containerHeight) {
            // productContainer.style.height = `${imgLoader?.getBoundingClientRect().height + 150}px`
        }
    }

    useEffect(() => {
        changeHeightToWidth();
    }, [loaded, providerOrNot, error, containerRef, imgLoaderRef, imgContainerRef, providerRef, failureRef, arrayRef]);

    useEffect(() => {
        window.addEventListener('resize', () => {
            changeHeightToWidth();
        });
    }, []);

    useEffect(() => {
        console.log(provider);
    }, []);


    const checkLineCount = (ele) => {
        if(isSearch) {
            console.log('Searching!', product?.description?.text?.length)
            setMore(false);
            return setCharCount(product?.description?.text?.length);
        }
        const productWidth = imgRef?.current?.getBoundingClientRect().width;
        const lineHeight = 15;
        const lines = 2.5;
        const charWidth = 9;
        console.log(lines, lineHeight);
        const descLength = (productWidth * lines) / (charWidth);

        console.log(Math.floor(descLength), product?.description?.text?.length);
        if(descLength < product?.description?.text?.length) {
            setMore(true);
            setCharCount(Math.floor(descLength));
        }else {
            setMore(false);
            setCharCount(product?.description?.text?.length);
        }
    }

    useEffect(() => {
        const ele = descRef?.current;
        if(imgRef?.current) {
            const resizeEvent = window.addEventListener('resize', (e) => {
                checkLineCount(ele);
            })
        }
    }, [imgRef]);

    useEffect(() => {
        const ele = descRef?.current;
        if(imgRef?.current) {
            console.log(imgRef)
            checkLineCount(ele);
        }
    }, [imgRef]);

    return (
        <div onClick={e => {
            const analytics = getAnalytics();
            logEvent(analytics, 'search', {
                productId: product.id
            })
        }} ref={imgRef} className={'ProviderProduct'}>
            <div ref={containerRef} className={`ProviderProduct__container`}>
                {
                    imgUI && (
                            <div className={`${imgLoaded ? 'ProviderProduct__visible' : 'ProviderProduct__hidden'}`}>
                                <div onClick={() => {
                                    openGallery(product);
                                    setGallery(true);
                                }} className={'ProviderProduct__body--container'}>
                                    <div ref={imgContainerRef} className="ProviderProduct__image--container">
                                        <Img product={true} setError={setError} hidden={hidden} setHidden={setHidden} setLoaded={setLoaded} imgRefDub={imgRefDub} setContainerLoaded={setContainerLoaded} setImgLoaded={setImgLoaded} imgUrl={product?.images.length !== 0 ? (product?.images[0]?.imagePath || productDefault) : productDefault}/>
                                        {loaded && error && <RenderImgError hidden={hidden} setHidden={setHidden} imgLoaderRef={imgLoaderRef} failureRef={failureRef} elemRef={imgContainerRef} /> }
                                    </div>
                                </div>
                                {
                                    (
                                        <div className={'ProviderProduct__details'}>
                                            <div ref={titleRef} onDoubleClick={e => {
                                                console.log(e);
                                                if (user?.uType == 'customer' || user?.providerId != product?.providerId) return;
                                                // console.log('proceed');
                                                console.log(user?.providerId, product?.providerId);
                                                setTitleEdit(true);
                                                setTitle(product?.name);
                                                setRentPriceEdit(false);
                                                setDescEdit(false);
                                                setSalePriceEdit(false);
                                            }} className="ProviderProduct__details--title-container">
                                                {
                                                    titleEdit ? (
                                                        <div className={'ProviderProduct__details--title-edit'}>
                                                            <div className="ProviderProduct__details--title-form">
                                                                <input onChange={e => setTitle(e.target.value)}
                                                                       className="ProviderProduct__details--title-input"
                                                                       type={'text'} value={title}/>
                                                                <select
                                                                    value={status}
                                                                    onChange={e => {
                                                                        setStatus(e.target.value);
                                                                    }}
                                                                    className="ProviderProduct__details--title-selector">
                                                                    <option value={'جديد'}>(جديد)</option>
                                                                    <option value={'مستعمل'}>(مستعمل)</option>
                                                                    <option value={'غير متاح'}>(غير متاح)</option>
                                                                </select>
                                                            </div>
                                                            <div className="ProviderProduct__details--title-btns">
                                                                <div onClick={async e => {
                                                                    console.log('Hello There!');
                                                                    setEditing(true);
                                                                    const data = {
                                                                        lan,
                                                                        product: {
                                                                            ...product,
                                                                            name: title
                                                                        },
                                                                        productNameSeparated: null
                                                                    };
                                                                    await editProviderProduct(data);
                                                                    setEditing(false);
                                                                    setTitleEdit(false);
                                                                }} className="ProviderProduct__details--title-check">
                                                                    {
                                                                        editing ? (
                                                                            <SpinnerComponent />
                                                                        ) : (
                                                                            <i className="fa-solid fa-check"></i>
                                                                        )
                                                                    }
                                                                </div>
                                                                <div onClick={e => {
                                                                    console.log('cancel clicked!');
                                                                    setTitleEdit(false);
                                                                }} className="ProviderProduct__details--title-cancel"><i
                                                                    className="fa-solid fa-x"></i></div>
                                                            </div>
                                                        </div>
                                                    ) : renderName()
                                                }
                                            </div>
                                            <div className="ProviderProduct__details--prices">
                                                {
                                                    (product?.saleDetails) && (
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
                                                            <div ref={priceRef} onDoubleClick={e => {
                                                                if (user?.uType == 'customer' || user?.providerId != product?.providerId) return;
                                                                setSalePriceEdit(true);
                                                                setSalePrice(product?.saleDetails?.price);
                                                                setRentPriceEdit(false);
                                                                setDescEdit(false);
                                                                setTitleEdit(false);
                                                            }} className="ProviderProduct__details--sale-pricenum">
                                                                {
                                                                    salePriceEdit ? (
                                                                        <div
                                                                            className={'ProviderProduct__details--sale-edit'}>
                                                                            <div
                                                                                className="ProviderProduct__details--sale-form">
                                                                                <input
                                                                                    onChange={e => setSalePrice(e.target.value)}
                                                                                    className="ProviderProduct__details--title-input"
                                                                                    type={'text'} value={salePrice}/>
                                                                            </div>
                                                                            <div
                                                                                className="ProviderProduct__details--sale-btns">
                                                                                <div onClick={async e => {
                                                                                    console.log('Hello There!');
                                                                                    setEditing(true);
                                                                                    const data = {
                                                                                        lan,
                                                                                        product: {
                                                                                            ...product,
                                                                                            saleDetails: {
                                                                                                ...product?.saleDetails,
                                                                                                price: salePrice
                                                                                            }
                                                                                        }
                                                                                    };
                                                                                    await editProviderProduct(data);
                                                                                    setEditing(false);
                                                                                    setSalePriceEdit(false);
                                                                                }}
                                                                                     className="ProviderProduct__details--sale-check">
                                                                                    {
                                                                                        editing ? (
                                                                                            <SpinnerComponent />
                                                                                        ) : (
                                                                                            <i className="fa-solid fa-check"></i>
                                                                                        )
                                                                                    }
                                                                                </div>
                                                                                <div onClick={e => {
                                                                                    console.log('cancel clicked!');
                                                                                    setSalePriceEdit(false);
                                                                                }}
                                                                                     className="ProviderProduct__details--sale-cancel">
                                                                                    <i
                                                                                        className="fa-solid fa-x"></i></div>
                                                                            </div>
                                                                        </div>

                                                                    ) : product?.saleDetails?.price &&
                                                                        <span>{product?.saleDetails?.price}</span>
                                                                }
                                                            </div>
                                                            <div className="ProviderProduct__details--sale-shekel">
                                                                <i className="fa-solid fa-shekel-sign"></i>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                                {
                                                    (product?.rentDetails) && (
                                                        <div ref={rentRef} onDoubleClick={e => {
                                                            if (user?.uType == 'customer' || user?.providerId != product?.providerId) return;
                                                            setRentPriceEdit(true);
                                                            setRentPrice(product?.rentDetails?.price);
                                                            setRentDuration(product?.rentDetails?.minTimForRent);
                                                            setTitleEdit(false);
                                                            setSalePriceEdit(false);
                                                            setDescEdit(false);
                                                        }} className={'ProviderProduct__details--rent'}>
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
                                                            {
                                                                (rentPriceEdit) ? (
                                                                    <div className={'ProviderProduct__details--rent-edit'}>
                                                                        <input type="text"
                                                                               className={'ProviderProduct__details--rent-input'}
                                                                               value={rentPrice}
                                                                               onChange={e => setRentPrice(e.target.value)}/>
                                                                        <div
                                                                            className="ProviderProduct__details--rent-shekel">
                                                                            <i className="fa-solid fa-shekel-sign"></i>
                                                                        </div>
                                                                        <div
                                                                            className={'ProviderProduct__details--rent-min'}>{t("minRentTimeMessage")}</div>
                                                                        <input type="number" value={rentDuration}
                                                                               onChange={e => setRentDuration(e.target.value)}
                                                                               className={'ProviderProduct__details--rent-duration'}/>
                                                                        <select name="" id="">
                                                                            <option value="day">يوم</option>
                                                                            <option value="hour">ساعة</option>
                                                                        </select>
                                                                        <div className="ProviderProduct__details--rent-btns">
                                                                            <div onClick={async e => {
                                                                                console.log('Hello There!');
                                                                                setEditing(true);
                                                                                const data = {
                                                                                    lan,
                                                                                    product: {
                                                                                        ...product,
                                                                                        rentDetails: {
                                                                                            ...product?.rentDetails,
                                                                                            price: rentPrice,
                                                                                            rentUnit: rentUnit,
                                                                                            minTimForRent: rentDuration
                                                                                        }
                                                                                    }
                                                                                };
                                                                                await editProviderProduct(data);
                                                                                setEditing(false);
                                                                                setRentPriceEdit(false);
                                                                            }} className="ProviderProduct__details--rent-check">
                                                                                {
                                                                                    editing ? (
                                                                                        <SpinnerComponent />
                                                                                    ) : (
                                                                                        <i className="fa-solid fa-check"></i>
                                                                                    )
                                                                                }
                                                                            </div>
                                                                            <div onClick={e => {
                                                                                console.log('cancel clicked!');
                                                                                setRentPriceEdit(false);
                                                                            }}
                                                                                 className="ProviderProduct__details--rent-cancel">
                                                                                <i
                                                                                    className="fa-solid fa-x"></i></div>
                                                                        </div>
                                                                    </div>
                                                                ) : (
                                                                    <>
                                                                        <div
                                                                            className="ProviderProduct__details--rent-pricenum">
                                                                            {
                                                                                product?.rentDetails?.price &&
                                                                                <span>{product?.rentDetails?.price}</span>
                                                                            }
                                                                        </div>
                                                                        <div
                                                                            className="ProviderProduct__details--rent-shekel">
                                                                            <i className="fa-solid fa-shekel-sign"></i>
                                                                        </div>
                                                                        {product?.rentDetails?.minTimForRent &&
                                                                            <p className={'ProviderProduct__details--rent-min'}>({t("minRentTimeMessage")}{formateMinDuration(product?.rentDetails?.minTimForRent, product?.rentDetails?.rentUnit)})</p>}

                                                                    </>
                                                                )
                                                            }
                                                            {/*<div className="ProviderProduct__details--rent-pricenum">*/}
                                                            {/*    {*/}
                                                            {/*        product?.rentDetails?.price && <span>{product?.rentDetails?.price}</span>*/}
                                                            {/*    }*/}
                                                            {/*</div>*/}
                                                            {/*<div className="ProviderProduct__details--rent-shekel">*/}
                                                            {/*    <i className="fa-solid fa-shekel-sign"></i>*/}
                                                            {/*</div>*/}
                                                        </div>
                                                    )
                                                }
                                            </div>
                                            {
                                                product?.description && (
                                                    <div ref={descRef} onDoubleClick={e => {
                                                        if (user?.uType == 'customer' || user?.providerId != product?.providerId) return;
                                                        setDescEdit(true);
                                                        setDesc(product?.description?.text);
                                                        setRentDuration(product?.description?.text);
                                                        setSalePriceEdit(false);
                                                        setTitleEdit(false);
                                                        setRentPriceEdit(false);
                                                    }} className="ProviderProduct__details--desc">
                                                        {/*{product?.description?.text && <p className="ProviderProduct__details--text">{product?.description?.text && ((short ? `${product?.description?.text.substr(0, 50)}` : product?.description?.text))}  <span onClick={e => setShort(!short)} className={'ProviderProduct__details--text-short'}>{product?.description?.text && (short ? `...${t('more')}` : t('less'))}</span></p>}*/}
                                                        {
                                                            desEdit ? (
                                                                <div className={'ProviderProduct__details--desc-edit'}>
                                                                    <textarea name="" id="" rows={3}
                                                                              className={'ProviderProduct__details--desc-textarea'}
                                                                              value={desc}
                                                                              onChange={e => setDesc(e.target.value)}></textarea>
                                                                    <div className="ProviderProduct__details--desc-btns">
                                                                        <div onClick={async e => {
                                                                            console.log('Hello There!');
                                                                            setEditing(true);
                                                                            const data = {
                                                                                lan,
                                                                                product: {
                                                                                    ...product,
                                                                                    description: {
                                                                                        ...product?.description,
                                                                                        text: desc
                                                                                    }
                                                                                }
                                                                            };
                                                                            await editProviderProduct(data);
                                                                            setEditing(false);
                                                                            setDescEdit(false);
                                                                        }} className="ProviderProduct__details--desc-check">
                                                                            <i className="fa-solid fa-check"></i></div>
                                                                        <div onClick={e => {
                                                                            console.log('cancel clicked!');
                                                                            setDescEdit(false);
                                                                        }}
                                                                             className="ProviderProduct__details--desc-cancel">
                                                                            <i
                                                                                className="fa-solid fa-x"></i></div>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <>
                                                                    <p className="ProviderProduct__details--text">
                                                                        <span
                                                                            className={'ProviderProduct__details--text-ellipsis'}>{product?.description?.text && product?.description?.text.slice(0, charCount)}</span>
                                                                        {more && <span onClick={e => {
                                                                            changePopupProduct(product);
                                                                            togglePopup();
                                                                            changeDestination(false);
                                                                            const analytics = getAnalytics();
                                                                            logEvent(analytics, 'expand', {
                                                                                productName: product.name,
                                                                                productId: product.id,
                                                                                screen: search && 'search' || 'provider'
                                                                            });
                                                                        }}
                                                                              className={'ProviderProduct__details--text-short'}>{(more || (product?.description?.variables.length > 0 || product?.description?.tags?.length > 0 || product?.description?.list?.length > 0 || product?.description?.comments.length > 0) ? `...${t('more')}` : '')}</span>}
                                                                    </p>
                                                                </>
                                                            )
                                                        }
                                                    </div>
                                                )
                                            }
                                        </div>
                                    )
                                }

                            </div>
                    )
                }
                {/*{true && <LoadingProduct imgLoaderRef={imgLoaderRef} rentDetails={product?.rentDetails} priceStartFrom={true} priceTitle={true} imgLoaded={false} details={true} btn={false} />}*/}
                {(!loaded || hidden) && <LoadingProduct rentDetails={product?.rentDetails} moreDetails={more} imgLoaderRef={imgLoaderRef} priceStartFrom={true} priceTitle={true} imgLoaded={false} details={true} btn={false} />}
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    term: state.search.term,
    user: state.login.data,
    lan: state.categories.lan
})

export default connect(mapStateToProps, {togglePopup, editProviderProduct, changeDestination, changePopupProduct}) (ProviderProduct);