import React, {useEffect, useState} from 'react';
import Navbar from "../../components/HOC/Navbar/Navbar";
import './ProviderSceen.scss';
import {connect} from "react-redux";
import {fetchProviderData, closeProviderGallery, openProviderGallery} from "../../store/actions/provider.actions";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import Gallery from "../Product/Provider/ProviderProducts/ProviderProduct/Gallery/Gallery";
import Provider from "../Product/Provider/Provider";
import SpinnerComponent from "../../components/Spinner/Spinner.Component";
import ProviderLinkCopy from "./ProviderLinkCopy/ProviderLinkCopy";
import Failure from "../Product/Provider/ProviderProducts/Failure/Failure";
import {useTranslation} from "react-i18next";
import {getAnalytics, logEvent} from "firebase/analytics";
import {openPopup, changePopupProduct} from "../../store/actions/ui.actions";
import {KeepAlive} from "react-activation";

const ProviderScreen = ({fetchProviderData, loadingProvider, filter, lan, provider, gallery, galleryProduct, closeProviderGallery, openProviderGallery, changePopupProduct, openPopup}) => {
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
        if(Object.keys(provider).length == 0 && loadingProvider) return;
        const analytics = getAnalytics();
        logEvent(analytics, 'provider-screen', {
            providerName: provider.name,
            providerId: provider.id
        })
    }, [provider]);

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

    return (
        <KeepAlive cacheKey={'Provider'}>
            <div className={'ProviderScreen'}>
                <Navbar backBtn={true} midText={provider.name} />
                {
                    !loadingProvider ? (
                        Object.keys(provider).length !== 0 ? (
                            <div>
                                <Provider closeGallery={closeProviderGallery} galleryProduct={galleryProduct} provider={provider} providerOrNot={true} prov={true} socials={true} link={false} openGallery={openProviderGallery}/>
                                {/*{*/}
                                {/*    gallery && <Gallery product={galleryProduct} closeGallery={closeProviderGallery}/>*/}
                                {/*}*/}
                                {/*<ProviderLinkCopy />*/}
                            </div>
                        ) : (
                            <Failure text={t('fail to load providers')}/>
                        )
                    ) : (
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
    filter: state.categories.filter
});

export default connect(mapStateToProps, {fetchProviderData, closeProviderGallery, openProviderGallery, changePopupProduct, openPopup}) (ProviderScreen);