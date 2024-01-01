import React, {useEffect, useRef, useState} from 'react';
import './Product.scss';
import Navbar from "../../components/HOC/Navbar/Navbar";
import {fetchProductDetails, fetchProductTypeDetails, resetProductData, closeGallery, openGallery} from "../../store/actions/product.actions";
import {connect} from "react-redux";
import {Outlet, useLocation, useNavigate, useParams} from "react-router-dom";
import Provider from "./Provider/Provider";
import Failure from "./Provider/ProviderProducts/Failure/Failure";
import SpinnerComponent from "../../components/Spinner/Spinner.Component";
import Gallery from "./Provider/ProviderProducts/ProviderProduct/Gallery/Gallery";
import InfiniteScroll from "react-infinite-scroller";
import Loader from "../../components/Loader/Loader";
import {useTranslation} from "react-i18next";
import ProductPopup from "../../components/ProductPopup/ProductPopup";
import {openPopup, togglePopup, changePopupProduct} from "../../store/actions/ui.actions";
import {KeepAlive, useAliveController , useActivate, useUnactivate} from 'react-activation';

import {changeCurrentProductTypeId} from "../../store/actions/product.actions";

const Product = ({galleryProduct, currentProductTypeId, changeCurrentProductTypeId, openPopup, togglePopup, changePopupProduct, filter, closeGallery, fetchProductDetails, more, page, lan, providers, resetProductData, fetchProductTypeDetails, productType, loadingProductsProviders, openGallery}) => {
    const [moreLoading, setMoreLoading] = useState(true);
    const productRef = useRef();
    const params = useParams();
    const scrollableParent = useRef();
    const navigate = useNavigate();
    const history = useLocation();
    const [activating, setActivating] = useState(false);

    const {t} = useTranslation()

    useEffect(() => {
        setMoreLoading(more);
    }, [more]);

    // useActivate(() => {
    //     setActivating(true);
    // });
    //
    // useUnactivate(() => {
    //     setActivating(false);
    // })

    const { drop, dropScope, clear, getCachingNodes, refresh } = useAliveController()


    // useEffect (() => {
    //     if(!currentProductTypeId) {
    //         changeCurrentProductTypeId(params.id);
    //     }
    //
    //     console.log(currentProductTypeId, productType.id);
    //
    //     if(!activating && !currentProductTypeId || (productType.id == currentProductTypeId || loadingProductsProviders)) {
    //         console.log('Logging!')
    //         return;
    //     } else {
    //         console.log(currentProductTypeId);
    //         console.log(params);
    //         resetProductData();
    //         fetchProductTypeDetails(currentProductTypeId, lan, navigate);
    //         fetchProductDetails(currentProductTypeId, 0, lan, filter, navigate);
    //     }
    // }, [activating]);

    useEffect(() => {
        if(productType.id == params.id) {
            return console.log('Hello!');
        }
        resetProductData();
        fetchProductTypeDetails(params.id, lan, navigate);
        fetchProductDetails(params.id, 0, lan, filter, navigate);
    }, [params.id]);

    useEffect(() => {
        console.log(params);
        if(!loadingProductsProviders && history?.state?.currentProduct) {
            changePopupProduct(history?.state?.currentProduct)
            openPopup();
        }
    }, []);



    useEffect(() => {
        const home = document.querySelector('body');

        const freezeStyles = () => {
            // home && (home.style.height = '100vh')
            home.classList.add('Home__hide')
        }
        const releaseStyles = () => {
            home.classList.remove('Home__hide')
        }

        freezeStyles();

        return () => {
            releaseStyles();
        }

    }, []);

    return (
        <KeepAlive cacheKey={'Products'}>
            <div ref={productRef} className={'ProductScreen'}>
                <Navbar backBtn={true} midText={productType?.title && productType.title} logoLink={'/'}/>
                {
                    !loadingProductsProviders ? (
                        providers?.length > 0 ? (
                            <InfiniteScroll
                                dataLength={providers.length}
                                pageStart={page}
                                loadMore={() => {
                                    if(providers.length === 0 && page === 0) return;
                                    if(!moreLoading) return;
                                    if(!more) return setMoreLoading(false);
                                    fetchProductDetails(params.id, page, lan, filter);
                                }}
                                hasMore={moreLoading}
                                loader={<Loader />}
                                className={'ProductScreen__container'}
                                useWindow={false}
                                // getScrollParent={() => productRef}
                            >
                                {
                                    providers.map((p, i) => (
                                        <>
                                            <Provider closeGallery={closeGallery} galleryProduct={galleryProduct} providerOrNot={false} link provider={p} key={p.id} openGallery={openGallery} />

                                        </>
                                    ))
                                }
                            </InfiniteScroll>

                        ): (
                            <Failure text={t('fail to load providers')} />
                        )

                    ) : (
                        <SpinnerComponent />
                    )
                }
                <Outlet />
            </div>
        </KeepAlive>
    );
};

const mapStateToProps = state => ({
    providers: state.product.providers,
    page: state.product.page,
    lan: state.categories.lan,
    productType: state.product.product,
    loadingProductsProviders: state.product.loadingProducts,
    // gallery: state.product.openGallery,
    more: state.product.more,
    galleryProduct: state.product.galleryProduct,
    filter: state.categories.filter,
    currentProductTypeId: state.product.currentProductTypeId
});

export default connect(mapStateToProps, {resetProductData, changeCurrentProductTypeId, fetchProductDetails, fetchProductTypeDetails, togglePopup, closeGallery, openGallery, openPopup, changePopupProduct}) (Product);