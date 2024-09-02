import React, {useEffect, useRef, useState} from 'react';
import './ProductPopup.scss';
import {connect} from "react-redux";
import {togglePopup, openPopup as Opopup, closePopup} from "../../store/actions/ui.actions";
import {useTranslation} from "react-i18next";
import ProviderProductListItem
    from "../../screens/Product/Provider/ProviderProducts/ProviderProduct/ProviderProductListItem/ProviderProductListItem";
import ProviderProductVariables
    from "../../screens/Product/Provider/ProviderProducts/ProviderProduct/ProviderProductVariables/ProviderProductVariables";
import ProviderProductTags
    from "../../screens/Product/Provider/ProviderProducts/ProviderProduct/ProviderProductTags/ProviderProductTags";
import ProviderProductComments
    from "../../screens/Product/Provider/ProviderProducts/ProviderProduct/ProviderProductComments/ProviderProductComments";
import history from '../../history/history';
import {getAnalytics, logEvent} from "firebase/analytics";
import {fetchProviderRatigs} from "../../store/actions/ratings.actions";
import ProviderProduct from "../../screens/Product/Provider/ProviderProducts/ProviderProduct/ProviderProduct";
import ProviderProfile from "../../screens/Product/Provider/ProviderProfile/ProviderProfile";
import {openGallery} from "../../store/actions/product.actions";
import {Outlet, useLocation, useParams} from "react-router-dom";
import {changePopupProduct, changeCurrentProvider} from "../../store/actions/ui.actions";
import {openSearchPopup} from "../../store/actions/ui.actions";

const ProductPopup = ({togglePopup, openSearchPopup, results, changeCurrentProvider, changePopupProduct, openGallery, setGallery, currentProvider, search, galleryProduct, isRatings, currentProduct, lan, fetchProviderRatigs, openPopup}) => {
    const {t} = useTranslation();
    const containerRef = useRef();
    const providerRef = useRef();
    const imgRef = useRef();

    const params = useParams();


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
        if(openPopup && lan) {
            const data = {
                providerId: currentProduct?.providerId,
                lan
            }
            fetchProviderRatigs(data);
        }
        console.log(currentProduct)
    }, [openPopup, lan]);

    const contRef = useRef();
    const fullHeight = () => {
        if(!contRef.current) return;
        const ele = contRef.current;
        if(!ele.className.includes('ProductPopup__product--fullwidth')) {
            ele.className = ele.className + ' ProductPopup__product--fullwidth';
        }
    }

    const notFullHeight = () => {
        if(!contRef.current) return;
        const ele = contRef.current;
        if(ele.className.includes('ProductPopup__product--fullwidth')) {
            ele.className = ele.className.replace(' ProductPopup__product--fullwidth', '');
        }
    }

    useEffect(() => {
        if(!currentProduct && results?.length > 0) {
            const result = results?.filter(r => r?.productDTO?.id == params?.id)[0];
            console.log(results?.filter(r => r?.productDTO?.id == params?.id)[0], params.id);
            changePopupProduct(result?.productDTO);
            changeCurrentProvider(result?.provider);
            openSearchPopup();

        }
    }, [galleryProduct, results]);

    const location = useLocation();

    useEffect(() => {
        console.log(window?.location);
    }, []);

    return (
        <div className={`ProductPopup ${true ? 'ProductPopup__open' : 'ProductPopup__close'}`}>
            <div ref={contRef} className={`ProductPopup__product ${openPopup && 'ProductPopup__product--open'}`}>
                <div onScroll={e => {
                    fullHeight()
                }} className="ProductPopup__product--container">
                    <div onClick={e => {
                        notFullHeight()
                        togglePopup()
                        history.back();
                    }} className="ProductPopup__product--close">
                        <span><i className="fa-solid fa-xmark"></i></span>
                    </div>
                    {
                        search && (
                            <>
                                <ProviderProfile search={search} link provider={currentProvider || currentProduct?.storeDetails} prov={false} socials={false} />
                                <ProviderProduct url={location?.pathname} openGallery={openGallery} setGallery={setGallery} arrayRef={containerRef} providerOrNot={false}  providerRef={providerRef} sliding={false} imgRef={imgRef} product={currentProduct} isSearch={true} provider={currentProvider} />
                                <Outlet />
                            </>
                        )
                    }

                    {
                        !isRatings && (
                            <>
                                <div className="ProviderProduct__details--prices">
                                    {
                                        currentProduct?.saleDetails && !search && (
                                            <div className={'ProviderProduct__details--sale'}>
                                                {
                                                    currentProduct?.saleDetails?.comment && (
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
                                                        currentProduct?.saleDetails?.price && <span>{currentProduct?.saleDetails?.price}</span>
                                                    }
                                                </div>
                                                <div className="ProviderProduct__details--sale-shekel">
                                                    <i className="fa-solid fa-shekel-sign"></i>
                                                </div>
                                            </div>
                                        )
                                    }
                                    {
                                        currentProduct?.rentDetails && !search && (
                                            <div className={'ProviderProduct__details--rent'}>
                                                {
                                                    currentProduct?.rentDetails?.comment && (
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
                                                        currentProduct?.rentDetails?.price && <span>{currentProduct?.rentDetails?.price}</span>
                                                    }
                                                </div>
                                                <div className="ProviderProduct__details--rent-shekel">
                                                    <i className="fa-solid fa-shekel-sign"></i>
                                                </div>
                                                {currentProduct?.rentDetails?.minTimForRent && <p className={'ProductPopup__details--rent-min'}>({t("minRentTimeMessage")}{formateMinDuration(currentProduct?.rentDetails?.minTimForRent, currentProduct?.rentDetails?.rentUnit)})</p>}
                                            </div>
                                        )
                                    }
                                </div>
                                {
                                    currentProduct?.description && !search &&  (
                                        <div className="ProviderProduct__details--desc">
                                            {
                                                currentProduct?.description?.text && <p className={'ProviderProduct__details--text'}>{currentProduct?.description?.text}</p>
                                            }
                                        </div>
                                    )
                                }

                                <div className={`ProviderProduct__details-dropdown`} >
                                    <div className="ProviderProduct__details--list">
                                        {
                                            currentProduct?.description?.list && currentProduct?.description?.list.map((item, i) => (
                                                <ProviderProductListItem item={item} />
                                            ))
                                        }
                                    </div>
                                    {
                                        currentProduct?.description?.variables?.length > 0 && (currentProduct?.description?.variables?.length === 1 ? (
                                            currentProduct?.description?.variables[0]?.value && currentProduct?.description?.variables[0]?.key && <ProviderProductVariables variables={currentProduct?.description?.variables && currentProduct?.description?.variables} />
                                        ) : <ProviderProductVariables variables={currentProduct?.description?.variables && currentProduct?.description?.variables} />)
                                    }

                                    {
                                        currentProduct?.description?.comments?.length > 0 && <ProviderProductComments comments={currentProduct?.description?.comments && currentProduct?.description?.comments} />
                                    }

                                    {
                                        currentProduct?.description?.tags?.length > 0 && <ProviderProductTags tags={currentProduct?.description?.tags}  />
                                    }
                                </div>
                            </>
                        )
                    }
                </div>

            </div>
            <div className={`ProductPopup__backdrop ${true && 'ProductPopup__backdrop--open'}`} onClick={e => {
                togglePopup();
                notFullHeight();
                const analytics = getAnalytics();
                logEvent(analytics, 'collapse', {
                    productName: currentProduct?.name,
                    productId: currentProduct?.id,
                });
                history.back();
            }}></div>
        </div>
    );
};

const mapStateToProps = state => ({
    openPopup: state.ui.openPopup,
    currentProduct: state.ui.currentProduct,
    ratings: state.ratings.ratings,
    fetchingRatings: state.ratings.fetchingRatings,
    lan: state.categories.lan,
    isRatings: state.ui.rating,
    currentProvider: state.ui.currentProvider,
    search: state.ui.search,
    galleryProduct: state.product.galleryProduct,
    results: state.search.results
});

export default connect(mapStateToProps, {togglePopup, openSearchPopup, changeCurrentProvider, changePopupProduct, openGallery, Opopup, closePopup, fetchProviderRatigs}) (ProductPopup);