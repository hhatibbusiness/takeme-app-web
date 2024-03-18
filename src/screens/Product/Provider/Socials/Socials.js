import React, {useEffect, useState} from 'react';
import './Socials.scss';
import {connect} from "react-redux";
import {useNavigate, useLocation} from "react-router-dom";
import {createOrder} from "../../../../store/actions/order.actions";
import {getAnalytics, logEvent} from "firebase/analytics";
import phone from '../../../../assets/images/Phone.svg';
import whatsapp from '../../../../assets/images/whatsapp.svg';
import locationImage from '../../../../assets/images/location.svg';

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
        // console.log(location.pathname);
        setCurrentLocation(location.pathname);
    }, []);

    useEffect(() => {
        console.log(provider, activeProduct);
    }, []);

    return (
        <div onClick={e => {
            if(false) {
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
                    navigate,
                    lan
                }
                createOrder(order);
            }
        }} className={`Socials ${right ? 'Socials__right' : ''}`} style={{display: 'flex', marginTop: `${right && '10px'}`}}>
            {
                provider?.providerLocations?.length !== 0 && provider?.providerLocations && (
                    <div onClick={e => {
                        if(isAuthenticated) {

                        }
                    }} target={'_blank'} href={provider.navigateLink}  className="Socials__link  Socials__link--location">
                        {/*<i className="fa-solid fa-location-arrow"></i>*/}
                        <img className={'Socials__link--image'} src={locationImage} alt=""/>
                        <div className="Socials__location">
                            {
                                provider?.providerLocations?.filter(l => l.includes('waze')).length > 0 && (
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
                                    }} target={"_blank"} href={provider?.providerLocations?.filter(l => l.includes('www.waze.com'))[0]}  className="Socials__location--link">
                                    {/*}} target={"_blank"} href={`${!provider.wazeMapLink ? formatWazeLink(provider.latitude, provider.longitude) : provider.wazeMapLink}`}  className="Socials__location--link">*/}
                                        <span><i className="fa-brands fa-waze"></i></span>
                                        <span>waze</span>
                                    </a>
                                )
                            }

                            {
                                provider?.providerLocations?.filter(l => l.includes('maps')).length > 0 && (
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
                                    }} target={"_blank"} href={provider?.providerLocations?.filter(l => l.includes('maps'))[0]} className="Socials__location--link">
                                    {/*}} target={"_blank"} href={`${!provider.googleMapLink ? formateMapsLink() : provider.googleMapLink}`} className="Socials__location--link">*/}
                                        <span><i className="fa-solid fa-map-location-dot"></i></span>
                                        <span>maps</span>
                                    </a>

                                )
                            }

                        </div>
                    </div>

                )
            }
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
            }} target={'_blank'} className="Socials__link" href={assets?.platform != null && (assets?.platform == 0 ? `whatsapp://send?phone=+${provider?.phoneCountryCode && provider?.phoneCountryCode}${provider?.phone && provider.phone}&text=${!right ? `مرحبا ممكن تفاصيل اكتر عن ${activeProduct?.name}` : ''}` : `http://web.whatsapp.com/send?phone=${provider?.phoneCountryCode && provider?.phoneCountryCode}${provider?.phone && provider.phone}&text=${!right ? `مرحبا ممكن تفاصيل اكتر عن ${activeProduct?.name}` : ''}`)}>
                <img src={whatsapp} alt=""/>
                {/*<i className="fa-brands fa-whatsapp"></i>*/}
            </a>
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
                {/*<i className="fa-solid fa-phone"></i>*/}
                <img src={phone} alt=""/>
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