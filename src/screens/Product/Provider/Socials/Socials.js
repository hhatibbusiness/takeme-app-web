import React from 'react';
import './Socials.scss';
import {connect} from "react-redux";
import {useNavigate} from "react-router-dom";
import {createOrder} from "../../../../store/actions/order.actions";
import {getAnalytics, logEvent} from "firebase/analytics";
import phone from '../../../../assets/images/Phone.svg';
import whatsapp from '../../../../assets/images/whatsapp.svg';
import locationImage from '../../../../assets/images/location.svg';

const Socials = ({right, assets, token, takemeUserToken, isAuthenticated, provider, createOrder, currentUser, activeProduct, lan}) => {
    const navigate = useNavigate();

    return (
        <div onClick={e => {
            e.stopPropagation();
            if(false) {

            }else {
                console.log(token, currentUser, activeProduct);
                const order = {
                    orderId: `${currentUser?.name && currentUser.name}-${currentUser?.phone && currentUser.phone}_${provider?.name && provider.name}-${provider?.phone && provider.phone}_${activeProduct?.name && activeProduct?.name}_${Date.now()}`,
                    locale: lan,
                    customerId: currentUser?.id,
                    providerId: activeProduct?.providerId,
                    productId: activeProduct?.id,
                    status: 'started',
                    "acceptedTermsAndConditions": 0,
                    invoiceLink: 'test',
                    "statusDetails": 'started',
                    "price": activeProduct?.saleDetails?.price || activeProduct?.rentDetails?.price,
                    navigate,
                    lan,
                    token: takemeUserToken
                }
                createOrder(order);
            }
        }} className={`Socials ${right ? 'Socials__right' : ''}`} style={{display: 'flex', marginTop: `${right && '10px'}`}}>
            {
                provider?.providerLocations?.length !== 0 && provider?.providerLocations && (
                    <div target={'_blank'} className="Socials__link  Socials__link--location">
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
            }} target={'_blank'} className="Socials__link" href={assets?.platform != null && (assets?.platform == 0 ? `whatsapp://send?phone=+${provider?.phoneCountryCode && provider?.phoneCountryCode}${provider?.phone && provider?.phone}&text=${!right ? `مرحبا ممكن تفاصيل اكتر عن ${activeProduct?.name}` : ''}` : `http://web.whatsapp.com/send?phone=${provider?.phoneCountryCode && provider?.phoneCountryCode}${provider?.phone && provider?.phone}&text=${!right ? `مرحبا ممكن تفاصيل اكتر عن ${activeProduct?.name}` : ''}`)}>
                <img src={whatsapp} alt=""/>
            </a>
            <a onClick={e => {
                !isAuthenticated && e.preventDefault();
                const analytics = getAnalytics();
                if(isAuthenticated) {
                    logEvent(analytics, 'call_button', {
                        PhoneNumber: provider?.phone,
                        ProviderName: provider?.name
                    })
                }
            }} href={`tel:${provider?.phoneCountryCode}${provider?.phone}`} className="Socials__link">
                <img src={phone} alt=""/>
            </a>
        </div>
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.login.isAuthenticated,
    lan: state.categories.lan,
    assets: state.assets,
    platform: state.assets.platform,
})

export default connect(mapStateToProps, {createOrder}) (React.memo(Socials));