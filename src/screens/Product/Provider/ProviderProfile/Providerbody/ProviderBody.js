import React, {useEffect, useState} from 'react';
import './ProviderBody.scss';
import Socials from "../../Socials/Socials";
import copy from "copy-to-clipboard";
import {getAnalytics, logEvent} from "firebase/analytics";
import {useLocation} from "react-router-dom";
import {openPopup, changePopupProduct, changeDestination} from "../../../../../store/actions/ui.actions";
import {connect} from "react-redux";
import {closePopup} from "../../../../../store/actions/ui.actions";

const ProviderBody = ({provider: p, currentUser, takemeUserToken, activeProduct, isAuthenticated, changeDestination, socials, prov, openPopup, closePopup, changePopupProduct}) => {
    const [array, setArray] = useState([]);
    const [copied, setCopied] = useState('')
    const [currentLocation, setCurrentLocation] = useState('');

    const location = useLocation();

    useEffect(() => {
        const array = Array.from(Array(5).keys());
        setArray(array);
    }, []);

    useEffect(() => {
        setCurrentLocation(location.pathname);
    }, []);

    return (
        <div className={'ProviderBody'}>
            <div className="ProviderBody__details--container">
                <div className="ProviderBody__details">
                    <p onClick={e => {
                        if(prov) {
                            copy(window?.location?.href && window.location.href);
                            setCopied(
                                <div className={'ProviderLinkCopy__container'}>
                                    {/*<i className="fa-solid fa-clipboard-list"></i>*/}
                                    <p><span><i className="fa-solid fa-caret-left"></i></span>link copied</p>
                                </div>
                            );
                            setTimeout(() => {
                                setCopied('')
                            }, 1000);
                            const analytics = getAnalytics();
                            logEvent(analytics, 'link copied', {
                                providerName: p.name,
                                providerId: p.id
                            })
                        }
                    }} className={'ProviderBody__name'}>{p?.name && p.name} {copied}</p>
                </div>
            </div>
            <div className="ProviderBody__left">
                {
                    p?.productsCountMsg && <p className={'ProviderBody__msg'}>{p.productsCountMsg}</p>
                }
                <Socials activeProduct={activeProduct} currentUser={currentUser} takemeUserToken={takemeUserToken} provider={p} right={true}/>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.login.isAuthenticated
});

export default connect(mapStateToProps, {openPopup, changeDestination, changePopupProduct, closePopup}) (React.memo(ProviderBody));