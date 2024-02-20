import React, {useEffect, useState} from 'react';
import Navbar from "../../components/HOC/Navbar/Navbar";
import './ProviderSceen.scss';
import {connect} from "react-redux";
import {fetchProviderData, closeProviderGallery, openProviderGallery, fetchProviderProductsTypes, resetProviderProductTypesData} from "../../store/actions/provider.actions";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import Gallery from "../Product/Provider/ProviderProducts/ProviderProduct/Gallery/Gallery";
import Provider from "../Product/Provider/Provider";
import SpinnerComponent from "../../components/Spinner/Spinner.Component";
import ProviderLinkCopy from "./ProviderLinkCopy/ProviderLinkCopy";
import Failure from "../Product/Provider/ProviderProducts/Failure/Failure";
import {useTranslation} from "react-i18next";
import {getAnalytics, logEvent} from "firebase/analytics";
import {openPopup, changePopupProduct, changeNavbarAssets} from "../../store/actions/ui.actions";
import {KeepAlive} from "react-activation";
import ProviderScreenProfile from "./ProviderScreenProfile/ProviderScreenProfile";
import ProviderProfile from "../Product/Provider/ProviderProfile/ProviderProfile";
import Categories from "../Home/Body/BodyContainer/CategoriesBar/Categories";
import category from "../Home/Body/BodyContainer/CategoriesBar/Category/Category";
import InfiniteScroll from "react-infinite-scroller";
import Loader from "../../components/Loader/Loader";
import {fetchProviderCategories} from "../../store/actions/provider.actions";

const ProviderScreen = ({fetchProviderData, fetchProviderCategories, categories, loadingCategories, curId, page, more, loadingProductTypes, productTypes, changeNavbarAssets, loadingProvider, filter, resetProviderProductTypesData, fetchProviderProductsTypes, lan, provider, gallery, galleryProduct, closeProviderGallery, openProviderGallery, changePopupProduct, openPopup, catId}) => {
    const [moreLoading, setMoreLoading] = useState(false);
    const params = useParams();
    const navigate = useNavigate();
    const history = useLocation();

    useEffect(() => {
        // if(provider.providerId == params.providerId) {
        //     return;
        // }
        if(params.providerId == provider?.providerId) return;
        fetchProviderData(lan, params.providerId, filter, navigate);
    }, [params.providerId]);

    useEffect(() => {
        console.log(params);
        if(!loadingProvider && history?.state?.currentProduct) {
            changePopupProduct(history?.state?.currentProduct)
            openPopup();
        }
    }, []);

    const {t} = useTranslation();

    useEffect(() => {
        // if(Object.keys(provider).length == 0 && loadingProvider) return;
        const analytics = getAnalytics();
        logEvent(analytics, 'provider-screen', {
            providerName: provider.name,
            providerId: provider.id
        });

        resetProviderProductTypesData();

        const data = {
            providerId: params.providerId,
            categoryListIds: catId === 0 ?  null : [catId],
            productTypeId: null,
            navigate,
            filter,
            lan,
            page: 0
        };

        fetchProviderProductsTypes(data);
    }, [params.providerId, curId]);

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

    useEffect(() => {
        const data = {
            searchPage: false,
            backBtn: true,
            step: null,
            setStep: null,
            search: false,
            midText: provider?.name,
            logoLink: '/'
        }
        changeNavbarAssets(data);
    }, [provider]);

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
            console.log(data);
            changeNavbarAssets(data);
        }
    }, []);

    useEffect(() => {
        setMoreLoading(more);
    }, [more]);

    useEffect(() => {
        const data = {
            providerId: params.providerId,
            lan
        };

        fetchProviderCategories(data);
    }, []);

    return (
        <KeepAlive cacheKey={'Provider'}>
            <div className={'ProviderScreen'}>
                {/*<Navbar backBtn={true} midText={provider.name} />*/}
                {
                    !loadingProvider && !loadingCategories ? (
                        // Object.keys(provider).length !== 0 ? (
                            <InfiniteScroll
                                dataLength={productTypes.length}
                                pageStart={page}
                                loadMore={() => {
                                    if(productTypes.length === 0 && page === 0) return;
                                    if(!moreLoading) return;
                                    if(!more) return setMoreLoading(false);
                                    if(loadingProductTypes) return;
                                    const data = {
                                        providerId: params.providerId,
                                        categoryListIds: catId === 0 ?  null : [catId],
                                        productTypeId: null,
                                        navigate,
                                        filter,
                                        lan,
                                        page
                                    };
                                    fetchProviderProductsTypes(data);
                                }}
                                hasMore={moreLoading}
                                loader={<Loader />}
                                className={'ProductScreen__container'}
                                id={'ProductScreen__container'}
                                useWindow={false}
                            >
                                <ProviderProfile prov={true} socials={false} link={false} provider={provider} />
                                <Categories loadingCategories={loadingCategories} categories={categories} provider={true} curId={curId} />
                                {
                                    loadingProductTypes ? (
                                        <SpinnerComponent />
                                    ) : (
                                        <Provider productTypes={productTypes} closeGallery={closeProviderGallery} galleryProduct={galleryProduct} provider={provider} providerOrNot={true} prov={true} socials={true} link={false} openGallery={openProviderGallery}/>
                                    )
                                }
                                {/*{*/}
                                {/*    gallery && <Gallery product={galleryProduct} closeGallery={closeProviderGallery}/>*/}
                                {/*}*/}
                                {/*<ProviderLinkCopy />*/}
                            </InfiniteScroll>
                        )
                        // : (
                        //     <Failure text={t('fail to load providers')}/>
                        // )
                    // ) :
                    :(
                        <SpinnerComponent />
                    )
                }
            </div>
        </KeepAlive>
    );
};

const mapStateToProps = state => ({
    lan: state.categories.lan,
    provider: state.provider.provider,
    gallery: state.provider.galleryOpen,
    galleryProduct: state.provider.galleryProduct,
    loadingProvider: state.provider.loadingProvider,
    filter: state.categories.filter,
    productTypes: state.provider.productTypes,
    loadingProductTypes: state.provider.loadingProductTypes,
    catId: state.categories.curId,
    page: state.provider.page,
    more: state.provider.more,
    categories: state.provider.categories,
    curId: state.provider.curId,
    loadingCategories: state.provider.loadingCategories
});

export default connect(mapStateToProps, {fetchProviderCategories, changeNavbarAssets, fetchProviderData, fetchProviderProductsTypes, closeProviderGallery, resetProviderProductTypesData, openProviderGallery, changePopupProduct, openPopup}) (ProviderScreen);