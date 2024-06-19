import React, {useEffect, useRef, useState} from 'react';
import './ProviderProduct.scss';
import {useNavigate, useParams} from "react-router-dom";
import Img from "../../../../Home/Body/BodyContainer/ProductList/Products/Product/Img/Img";
import RenderImgError from "../../../../../components/RenderImgError/RenderImgError";
import LoadingProduct from "../../../../../components/LoadingProduct/LoadingProduct";
import {connect} from "react-redux";
import {useTranslation} from "react-i18next";
import {togglePopup, changeDestination, openPopup} from "../../../../../store/actions/ui.actions";
import {changePopupProduct} from "../../../../../store/actions/ui.actions";
import {getAnalytics, logEvent} from "firebase/analytics";
import productDefault from '../../../../../assets/images/defaults/default-product-image.png'
import {editProviderProduct} from "../../../../../store/actions/provider.actions";
import SpinnerComponent from "../../../../../components/Spinner/Spinner.Component";

const ProviderProduct = ({imgRef,searchPage, takemeProviderToken, openPopup, services, productStatus, user, url, isSearch, editProviderProduct, provider, setGallery, lan, changeDestination, arrayRef, providerOrNot, productTypesCount, search, providerRef, togglePopup, product, changePopupProduct, sliding, openGallery, term}) => {
    const [error, setError] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [imgLoaded, setImgLoaded] = useState(true);
    const [imgUI, setImgUI] = useState(true);
    const [detailed, setDetailed] = useState(false);
    const [containerLoaded, setContainerLoaded] = useState(false);
    const navigate = useNavigate();
    const {t} = useTranslation();
    const imgRefDub = useRef(null);
    const imgLoaderRef = useRef(null);
    const containerRef = useRef(null);
    const failureRef = useRef(null);
    const imgContainerRef = useRef(null);
    const [hidden, setHidden] = useState(true);
    const [more, setMore] = useState(false);
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
        if (ProviderProduct) {
            setStatus(product?.status);
        }
    }, [ProviderProduct]);

    useEffect(() => {
        let timer;
        let duration = 1500;
        if(titleRef?.current) {
            titleRef?.current?.addEventListener('touchstart', e=> {
                timer = setTimeout(() => {
                    if (user?.uType == 'customer' || user?.providerId != product?.providerId) return;
                    setTitleEdit(true);
                    setTitle(product?.name);
                    setStatus(product?.status);
                    setRentPriceEdit(false);
                    setSalePriceEdit(false);
                    setDescEdit(false);
                }, duration);
            });

            titleRef?.current?.addEventListener('touchend', e => {
                clearInterval(timer);
                timer = null;
                titleRef?.current?.removeEventListener('touchstart', e => {
                    console.log(e.target);
                })
            });
        }

        return () => {
            clearInterval(timer);
            timer = null;
            if(titleRef?.current) {
                titleRef.current.removeEventListener('touchstart', e => {
                    console.log('Hello There!')
                });
            }
        }
    }, [titleRef?.current, titleEdit]);

    useEffect(() => {
        let timer;
        let duration = 2000;
        if(descRef?.current) {
            descRef?.current?.addEventListener('touchstart', e=> {
                timer = setTimeout(() => {
                    if (user?.uType == 'customer' || user?.providerId != product?.providerId) return;
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
            priceRef?.current?.addEventListener('touchstart', e=> {
                timer = setTimeout(() => {
                    if (user?.uType == 'customer' || user?.providerId != product?.providerId) return;
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
            rentRef?.current?.addEventListener('touchstart', e=> {
                timer = setTimeout(() => {
                    if (user?.uType == 'customer' || user?.providerId != product?.providerId) return;
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

    useEffect(() => {
        setDetailed(prevState => sliding && false);
    }, [sliding]);

    const getSubString = (string) => {
        let lowercaseTitle = product?.name?.toLowerCase();
        const lowercaseTerm = term?.toLowerCase();
        return lowercaseTitle?.indexOf(lowercaseTerm);
    }

    const renderName = () => {
        var innerHTML = product?.name;
        var index = innerHTML?.indexOf(term);
        if (getSubString(term) != -1) {
            innerHTML = <p className={'ProviderProduct__title'}>{innerHTML?.substring(0,getSubString(term))}<span class='highlight'>{innerHTML?.substring(getSubString(term),getSubString(term) + term.length)}</span>{innerHTML?.substring(getSubString(term) + term.length)}{product?.status?.name && product?.status?.visible && <span className={'ProviderProduct__title--status'}> ({product?.status?.name})</span>}</p>;
            return innerHTML;
        } else {
            return innerHTML;
        }
    }

    const changeHeightToWidth = () => {
        const imgElement = containerRef.current;
        const imgLoader = imgLoaderRef.current
        const imgContainer = imgContainerRef.current;
        const failureEle = failureRef.current;
        const productContainer = arrayRef?.current;
        if(!imgElement) return;
        const containerHeight = productContainer?.getBoundingClientRect().width;
        if(imgLoader) imgLoader.style.height = `${containerHeight}px`;
        if(imgContainer) imgContainer.style.height = `${containerHeight}px`;
        if(failureEle) failureEle.style.height = `${containerHeight}px`;
    }

    useEffect(() => {
        changeHeightToWidth();
    }, [loaded, providerOrNot, error, containerRef, imgLoaderRef, imgContainerRef, providerRef, failureRef, arrayRef]);

    useEffect(() => {
        window.addEventListener('resize', () => {
            changeHeightToWidth();
        });
    }, []);

    const checkLineCount = (ele) => {
        if(isSearch) {
            setMore(false);
            return setCharCount(product?.description?.text?.length);
        }
        const productWidth = imgRef?.current?.getBoundingClientRect().width;
        const lines = 2.5;
        const charWidth = 9;
        const descLength = (productWidth * lines) / (charWidth);

        if(descLength < product?.description?.text?.length) {
            setMore(true);
            setCharCount(Math.floor(descLength));
        }else if(descLength > product?.description?.text?.length) {
            setMore(false);
            setCharCount(product?.description?.text?.length);
        }
        if(product?.description?.list?.length > 0){
            return setMore(true);
        }
        if(product?.description?.variables?.length > 0) {
            return setMore(true);
        }
        if(product?.description?.tags?.length > 0) {
            return setMore(true);
        }
        if(product?.description?.comments?.length > 0) {
            return setMore(true);
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
            checkLineCount(ele);
        }
    }, [imgRef]);

    const params = useParams();

    useEffect(() => {
        console.log(window?.location);
    }, []);

    return (
        <div
            style={{direction: 'rtl'}}
            onClick={e => {
            const analytics = getAnalytics();
            logEvent(analytics, 'search', {
                productId: product.id
            });
        }} ref={imgRef} className={'ProviderProduct'}>
            <div ref={containerRef} className={`ProviderProduct__container`}>
                {
                    imgUI && (
                            <div className={`${imgLoaded ? 'ProviderProduct__visible' : 'ProviderProduct__hidden'}`}>
                                <div onClick={(e) => {
                                    e.preventDefault();
                                    openGallery(product);
                                    setGallery(true);
                                    navigate(`${url}/gallery`);
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
                                                if (user?.uType == 'customer' || user?.providerId != product?.providerId) return;
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
                                                                    onChange={e => {
                                                                        setStatus(s => {
                                                                            if(product?.action == 'SERVICE') {
                                                                                return services?.filter(s => s.name == e.target.value)[0];
                                                                            } else {
                                                                                return productStatus?.filter(s => s.name == e.target.value)[0];
                                                                            }
                                                                        })
                                                                    }}
                                                                    className="ProviderProduct__details--title-selector">
                                                                    {
                                                                        product?.action == 'SERVICE' ? (
                                                                            services?.map((s, i) => (
                                                                                <option style={{background: `${s?.name == product?.status?.name ? 'white' : '#FFEBCC'}`}} selected={s?.name == product?.status?.name} value={s?.name}>({s?.name})</option>
                                                                            ))
                                                                        ) : (
                                                                            productStatus?.map((s, i) => (
                                                                                <option style={{background: `${s?.name == product?.status?.name ? 'white' : '#FFEBCC'}`}} selected={s?.name == product?.status?.name} value={s?.name}>({s?.name})</option>
                                                                            ))
                                                                        )
                                                                    }
                                                                </select>
                                                            </div>
                                                            <div className="ProviderProduct__details--title-btns">
                                                                <div onClick={async e => {
                                                                    setEditing(true);
                                                                    const data = {
                                                                        lan,
                                                                        product: {
                                                                            ...product,
                                                                            name: title,
                                                                            status: status || (product?.action == 'SERVICE' ? services[0] : productStatus[0]),
                                                                        },
                                                                        productNameSeparated: null,
                                                                        token: takemeProviderToken,
                                                                        navigate
                                                                    };
                                                                    console.log(status, data);
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
                                                    ((product?.saleDetails?.price) && (product?.saleDetails?.price > 0)) ? (
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
                                                                                    setEditing(true);
                                                                                    const data = {
                                                                                        lan,
                                                                                        product: {
                                                                                            ...product,
                                                                                            saleDetails: {
                                                                                                ...product?.saleDetails,
                                                                                                price: salePrice
                                                                                            },
                                                                                            salePrice
                                                                                        },
                                                                                        token: takemeProviderToken,
                                                                                        navigate
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
                                                                                    setSalePriceEdit(false);
                                                                                }}
                                                                                     className="ProviderProduct__details--sale-cancel">
                                                                                    <i
                                                                                        className="fa-solid fa-x"></i></div>
                                                                            </div>
                                                                        </div>
                                                                    ) : product?.saleDetails && product?.saleDetails?.price > 0 && <span>{product?.saleDetails?.price}</span>
                                                                }
                                                            </div>
                                                            <div className="ProviderProduct__details--sale-shekel">
                                                                <i className="fa-solid fa-shekel-sign"></i>
                                                            </div>
                                                        </div>
                                                    ) : ''
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
                                                            <div className="ProviderProduct__details--rent-price">
                                                                {t('rentPrice')}
                                                            </div>
                                                            {
                                                                (rentPriceEdit) ? (
                                                                    <div className={'ProviderProduct__details--rent-edit'}>
                                                                        <div className={'ProviderProduct__details--rent-price--num'}>
                                                                            <input type="text"
                                                                                   className={'ProviderProduct__details--rent-input'}
                                                                                   value={rentPrice}
                                                                                   onChange={e => setRentPrice(e.target.value)}/>
                                                                            <div
                                                                                className="ProviderProduct__details--rent-shekel">
                                                                                <i className="fa-solid fa-shekel-sign"></i>
                                                                            </div>
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
                                                                                // console.log('Hello There!');
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
                                                                                        },
                                                                                        rentUnit,
                                                                                        minTimeForRent: rentDuration,
                                                                                        rentPrice
                                                                                    },
                                                                                    token: takemeProviderToken,
                                                                                    navigate
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
                                                                                // console.log('cancel clicked!');
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
                                                        {
                                                            desEdit ? (
                                                                <div className={'ProviderProduct__details--desc-edit'}>
                                                                    <textarea name="" id="" rows={3}
                                                                      className={'ProviderProduct__details--desc-textarea'}
                                                                      value={desc}
                                                                      onChange={e => setDesc(e.target.value)}></textarea>
                                                                    <div className="ProviderProduct__details--desc-btns">
                                                                        <div onClick={async e => {
                                                                            setEditing(true);
                                                                            const data = {
                                                                                lan,
                                                                                product: {
                                                                                    ...product,
                                                                                    description: {
                                                                                        ...product?.description,
                                                                                        text: desc
                                                                                    },
                                                                                },
                                                                                token: takemeProviderToken,
                                                                                navigate
                                                                            };
                                                                            await editProviderProduct(data);
                                                                            setEditing(false);
                                                                            setDescEdit(false);
                                                                        }} className="ProviderProduct__details--desc-check">
                                                                            <i className="fa-solid fa-check"></i></div>
                                                                        <div onClick={e => {
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
                                                                            openPopup()
                                                                            navigate(`${window?.location?.hash.replace('#', '')}/popup/${product?.id}`);
                                                                            changeDestination(false);
                                                                            console.log(window?.location);
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
                {(!loaded || hidden) && <LoadingProduct rentDetails={false} moreDetails={false} imgLoaderRef={imgLoaderRef} priceStartFrom={false} priceTitle={false} imgLoaded={false} details={false} btn={false} />}
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    term: state.search.term,
    user: state.login.takemeProviderData,
    lan: state.categories.lan,
    services: state.assets.service,
    productStatus: state.assets.product,
});

export default connect(mapStateToProps, {togglePopup, editProviderProduct, changeDestination, changePopupProduct, openPopup}) (React.memo(ProviderProduct));