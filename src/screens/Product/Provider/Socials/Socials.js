import React, {useEffect, useState} from 'react';
import './Socials.scss';
import {connect} from "react-redux";
import {useNavigate, useLocation} from "react-router-dom";
import {createOrder} from "../../../../store/actions/order.actions";
import {getAnalytics, logEvent} from "firebase/analytics";

const Socials = ({right, assets, platform, isAuthenticated, provider, createOrder, currentUser, activeProduct, lan}) => {
    const [currentLocation, setCurrentLocation] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const formatWazeLink = (lat, long) => {
        const linkArray = assets.waze_template.split('%');
        let finalLink = `${linkArray[0]}${lat}%${linkArray[1]}${long}`;
        return finalLink;
    }

    const formateMapsLink = (lat, long) => {
        return `${assets.maps_template}${provider.latitude},${provider.longitude}`
    }

    useEffect(() => {
        console.log(location.pathname);
        setCurrentLocation(location.pathname);
    }, []);

    return (
        <div onClick={e => {
            if(!isAuthenticated) {
                navigate('/login', {state: {previousLocation: currentLocation}});
            }else {
                const order = {
                    // orderId:`${Date.now()}-${activeProduct?.name}_${currentUser?.name}-${currentUser?.phone}_${provider?.name}-${provider?.phone}` ,
                    orderId: `${currentUser?.name && currentUser.name}-${currentUser?.phone && currentUser.phone}_${provider?.name && provider.name}-${provider?.phone && provider.phone}_${activeProduct?.name && activeProduct?.name}_${Date.now()}`,
                    // orderId: `${currentUser.phone}${currentUser.name}_${provider.phone}-${provider.name}-${activeProduct.name}-${Date.now()}`,
                    locale: lan,
                    customerId: currentUser?.id,
                    providerId: activeProduct?.providerId,
                    productId: activeProduct?.id,
                    status: 'started',
                    "acceptedTermsAndConditions": 0,
                    invoiceLink: 'test',
                    // "sort_index": 15,
                    "statusDetails": 'started',
                    "price": activeProduct?.saleDetails?.price || activeProduct?.rentDetails?.price,
                    // "comments": activeProduct?.comments
                }
                createOrder(order);
            }
        }} className={`Socials`} style={{marginleft: `${right && 'auto'}`, display: 'flex', alignItems: `${right && 'left'}`, marginRight: `${right && '10px'}`, marginTop: `${right && '10px'}`}}>
            <div onClick={e => {
                if(isAuthenticated) {

                }
            }} target={'_blank'} href={provider.navigateLink}  className="Socials__link  Socials__link--location">
                <i className="fa-solid fa-location-arrow"></i>
                <div className="Socials__location">
                    <a onClick={e => {
                        const analytics = getAnalytics();
                        !isAuthenticated && e.preventDefault();
                        if(isAuthenticated) {
                            logEvent(analytics, 'location-event', {
                                latitude: provider?.latitude,
                                longtude: provider?.longtude,
                                providerId: provider?.id,
                                providerName: provider?.name,
                                providerPhone: provider?.name,
                                method: 'waze'
                            })
                        }
                    }} target={"_blank"} href={`${!provider.wazeMapLink ? formatWazeLink(provider.latitude, provider.longitude) : provider.wazeMapLink}`}  className="Socials__location--link">
                        <span><i className="fa-brands fa-waze"></i></span>
                        <span>waze</span>
                    </a>
                    <a onClick={e => {
                        !isAuthenticated && e.preventDefault();
                        const analytics = getAnalytics();
                        if(isAuthenticated) {
                            logEvent(analytics, 'location-event', {
                                latitude: provider?.latitude,
                                longtude: provider?.longtude,
                                providerId: provider?.id,
                                providerName: provider?.name,
                                providerPhone: provider?.name,
                                method: 'maps'
                            })
                        }
                    }} target={"_blank"} href={`${!provider.googleMapLink ? formateMapsLink() : provider.googleMapLink}`} className="Socials__location--link">
                        <span><i className="fa-solid fa-map-location-dot"></i></span>
                        <span>maps</span>
                    </a>
                </div>
            </div>
            <a onClick={e => {
                !isAuthenticated && e.preventDefault();
                const analytics = getAnalytics();
                if(isAuthenticated) {
                    logEvent(analytics, 'WhatsApp', {
                        ProviderId: provider?.id,
                        ProviderName: provider?.name,
                        ProviderPhone: provider?.phone
                    });
                }
            }} target={'_blank'} className="Socials__link" href={assets?.platform != null && (assets?.platform == 0 ? `whatsapp://send?phone=+${provider?.phoneCountryCode && provider?.phoneCountryCode}${provider?.phone && provider.phone}&text=hello` : `http://web.whatsapp.com/send?phone=${provider?.phoneCountryCode && provider?.phoneCountryCode}${provider?.phone && provider.phone}`)}><i className="fa-brands fa-whatsapp"></i></a>
            {/* <a onClick={e => {
                !isAuthenticated && e.preventDefault();
            }} target={'_blank'} className="Socials__link" href={`whatsapp://send?phone=${provider.phoneCountryCode}${provider.phone}`}><i className="fa-brands fa-whatsapp"></i></a> */}
            <a onClick={e => {
                !isAuthenticated && e.preventDefault();
                const analytics = getAnalytics();
                if(isAuthenticated) {
                    logEvent(analytics, 'call_button', {
                        PhoneNumber: provider?.phone,
                        ProviderName: provider?.name
                    })
                }
            }} href={`tel:${provider.phoneCountryCode}${provider.phone}`} className="Socials__link">
                <i className="fa-solid fa-phone"></i>
            </a>
        </div>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.login.isAuthenticated,
    lan: state.categories.lan,
    currentUser: state.login.data,
    assets: state.assets,
    platform: state.assets.platform
})

export default connect(mapStateToProps, {createOrder}) (Socials);