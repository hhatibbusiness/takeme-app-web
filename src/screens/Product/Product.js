import React, {useEffect, useRef, useState} from 'react';
import './Product.scss';
import {fetchProductDetails, fetchProductTypeDetails, resetProductData, closeGallery, openGallery} from "../../store/actions/product.actions";
import {connect} from "react-redux";
import {Outlet, useLocation, useNavigate, useParams} from "react-router-dom";
import Provider from "./Provider/Provider";
import Failure from "./Provider/ProviderProducts/Failure/Failure";
import SpinnerComponent from "../../components/Spinner/Spinner.Component";
import InfiniteScroll from "react-infinite-scroller";
import Loader from "../../components/Loader/Loader";
import {useTranslation} from "react-i18next";
import {openPopup, togglePopup, changePopupProduct, changeNavbarAssets} from "../../store/actions/ui.actions";
import {KeepAlive, useAliveController} from 'react-activation';
import {changeCurrentProductTypeId} from "../../store/actions/product.actions";

const Product = ({galleryProduct, takemeUserToken, currentUser, changeNavbarAssets, currentProductTypeId, changeCurrentProductTypeId, openPopup, togglePopup, changePopupProduct, filter, closeGallery, fetchProductDetails, more, page, lan, providers, resetProductData, fetchProductTypeDetails, productType, loadingProductsProviders, openGallery}) => {
    const [moreLoading, setMoreLoading] = useState(true);
    const productRef = useRef();
    const params = useParams();
    const navigate = useNavigate();
    const history = useLocation();

    const {t} = useTranslation('product');

    useEffect(() => {
        setMoreLoading(more);
    }, [more]);

    useEffect(() => {
        if(productType.id == params.productId) {
            return;
        }
        resetProductData();
        fetchProductTypeDetails(params.productId, lan, navigate);
        fetchProductDetails(params.productId, 0, lan, filter, navigate);
    }, [params.productId]);

    useEffect(() => {
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
            changeNavbarAssets(data);
        }
    }, []);

    useEffect(() => {
        const home = document.querySelector('body');

        const freezeStyles = () => {
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

    const location = useLocation();

    return (
        <>
            <KeepAlive cacheKey={'Products'}>
                <div ref={productRef} className={'ProductScreen'}>
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
                                        fetchProductDetails(params.productId, page, lan, filter);
                                    }}
                                    hasMore={moreLoading}
                                    loader={<Loader />}
                                    className={'ProductScreen__container'}
                                    id={'ProductScreen__container'}
                                    useWindow={false}
                                >
                                    {
                                        providers.map((p, i) => (
                                            <>
                                                <Provider currentUser={currentUser} takemeUserToken={takemeUserToken} url={location.pathname} closeGallery={closeGallery} galleryProduct={galleryProduct} providerOrNot={false} link provider={p} key={p.id} openGallery={openGallery} />
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
                </div>
            </KeepAlive>
            <Outlet />
        </>
    );
};

const mapStateToProps = state => ({
    providers: state.product.providers,
    page: state.product.page,
    lan: state.categories.lan,
    productType: state.product.product,
    loadingProductsProviders: state.product.loadingProducts,
    more: state.product.more,
    galleryProduct: state.product.galleryProduct,
    filter: state.categories.filter,
    currentProductTypeId: state.product.currentProductTypeId,
    currentUser: state.login.takemeUserData,
    takemeUserToken: state.login.takemeUserToken
});

export default connect(mapStateToProps, {changeNavbarAssets, resetProductData, changeCurrentProductTypeId, fetchProductDetails, fetchProductTypeDetails, togglePopup, closeGallery, openGallery, openPopup, changePopupProduct}) (React.memo(Product));