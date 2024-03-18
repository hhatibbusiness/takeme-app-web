import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
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
import {openPopup, togglePopup, changePopupProduct, changeNavbarAssets} from "../../store/actions/ui.actions";
import {KeepAlive, useAliveController , useActivate, useUnactivate} from 'react-activation';

import {changeCurrentProductTypeId} from "../../store/actions/product.actions";
import loadingProduct from "../../components/LoadingProduct/LoadingProduct";

// const navbar = document?.querySelector('.Navbar');
// navbar.style.height = '52px';


const Product = ({galleryProduct, changeNavbarAssets, currentProductTypeId, changeCurrentProductTypeId, openPopup, togglePopup, changePopupProduct, filter, closeGallery, fetchProductDetails, more, page, lan, providers, resetProductData, fetchProductTypeDetails, productType, loadingProductsProviders, openGallery}) => {
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
            return;
        }
        resetProductData();
        fetchProductTypeDetails(params.id, lan, navigate);
        fetchProductDetails(params.id, 0, lan, filter, navigate);
    }, [params.id]);

    useEffect(() => {
        // console.log(params);
        if(!loadingProductsProviders && history?.state?.currentProduct) {
            changePopupProduct(history?.state?.currentProduct)
            openPopup();
        }
    }, []);

    useEffect(() => {
        const data = {
            searchPage: false,
            backBtn: true,
            step: null,
            setStep: null,
            search: false,
            midText: productType?.title && productType.title,
            logoLink: '/'
        }
        changeNavbarAssets(data);
    }, [productType]);

    useEffect(() => {
        return () => {
            const data = {
                // assets: assets,
                searchPage: false,
                term: '',
                backBtn: false,
                step: null,
                setStep: null,
                search: true,
                logoLink: '/'
            };
            // console.log(data);
            changeNavbarAssets(data);
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

    // useEffect(() => {
    //     const navbar = document?.querySelector('.Navbar');
    //     navbar.style.height = '52px';
    //
    //     return () => {
    //         navbar.style.height = '75px';
    //     }
    // }, []);

    // const navbar = document?.querySelector('.Navbar');
    // navbar.style.height = '52px';

    // return () => {
    //     navbar.style.height = '75px';
    // }

    // useLayoutEffect(() => {
    //     const navbar = document?.querySelector('.Navbar');
    //     navbar.style.height = '52px';
    //
    //     return () => {
    //         navbar.style.height = '75px';
    //     }
    // }, [])

    return (
        <KeepAlive cacheKey={'Products'}>
            <div ref={productRef} className={'ProductScreen'}>
                {/*<Navbar backBtn={true} midText={productType?.title && productType.title} logoLink={'/'}/>*/}
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
                                id={'ProductScreen__container'}
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
    currentProductTypeId: state.product.currentProductTypeId,
});

export default connect(mapStateToProps, {changeNavbarAssets, resetProductData, changeCurrentProductTypeId, fetchProductDetails, fetchProductTypeDetails, togglePopup, closeGallery, openGallery, openPopup, changePopupProduct}) (Product);