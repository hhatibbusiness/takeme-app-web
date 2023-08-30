import React, {useEffect} from 'react';
import Navbar from "../../components/HOC/Navbar/Navbar";
import './ProviderSceen.scss';
import {connect} from "react-redux";
import {fetchProviderData, closeProviderGallery, openProviderGallery} from "../../store/actions/provider.actions";
import {useParams} from "react-router-dom";
import Gallery from "../Product/Provider/ProviderProducts/ProviderProduct/Gallery/Gallery";
import Provider from "../Product/Provider/Provider";
import SpinnerComponent from "../../components/Spinner/Spinner.Component";
import ProviderLinkCopy from "./ProviderLinkCopy/ProviderLinkCopy";

const ProviderScreen = ({fetchProviderData, loadingProvider, filter, lan, provider, gallery, galleryProduct, closeProviderGallery, openProviderGallery}) => {
    const params = useParams();
    useEffect(() => {
        fetchProviderData(lan, params.providerId, filter);
    }, [params.providerId]);


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
        <div className={'ProviderScreen'}>
            <Navbar backBtn={true} midText={provider.name} />
            {
                !loadingProvider ? (
                    <>
                        <Provider providerOrNot={true} prov={true} socials={true} provider={provider} link={false} openGallery={openProviderGallery}/>
                        {
                            gallery && <Gallery product={galleryProduct} closeGallery={closeProviderGallery}/>
                        }
                        <ProviderLinkCopy />
                    </>
                ) : <SpinnerComponent />
            }
        </div>
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

export default connect(mapStateToProps, {fetchProviderData, closeProviderGallery, openProviderGallery}) (ProviderScreen);