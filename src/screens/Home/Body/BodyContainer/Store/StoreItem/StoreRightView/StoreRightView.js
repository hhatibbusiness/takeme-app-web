import React, {useRef, useState} from 'react';
import './StoreRightView.css';
import Img from "../../../ProductList/Products/Product/Img/Img";
import ProviderDefaultImage from "../../../../../../../assets/images/defaults/default-provider-image.png";
import LoadingProduct from "../../../../../../../components/LoadingProduct/LoadingProduct";
import verifiedImage from "../../../../../../../assets/images/verifiedImage.svg";
import {getAnalytics, logEvent} from "firebase/analytics";
import whatsapp from "../../../../../../../assets/images/store/WhatsApp.png";
import {connect} from "react-redux";
import {useNavigate} from "react-router-dom";
import PhoneImage from '../../../../../../../assets/images/store/Phone.png';
import locationImage from '../../../../../../../assets/images/store/location.png';
import callImg from "../../../../../../../assets/images/socials/call.png";
const StoreRightView = ( {store, assets, setPopup, popup} ) => {
    const [error, setError] = useState(false);
    const [hidden, setHidden] = useState(true);
    const [loaded, setLoaded] = useState(false);
    const imgLoaderRef = useRef(null);
    const imgRefDub = useRef(null);
    const [containerLoaded, setContainerLoaded] = useState(false);
    const [imgLoaded, setImgLoaded] = useState(true);
    const [social, setSocial] = useState(false);
    const [location, setLocation] = useState(false);

    const navigate = useNavigate();

    return (
        <div className={'StoreRightView'}>
            <div className="StoreRightView__avatar" onClick={e => {
                navigate(`/provider/${store?.providerId}`)
            }}>
                <Img provider={true} setError={setError} hidden={hidden} setHidden={setHidden} setLoaded={setLoaded} imgRefDub={imgRefDub} setContainerLoaded={setContainerLoaded} setImgLoaded={setImgLoaded} imgUrl={store?.imagePath || ProviderDefaultImage}/>
                {(!loaded || hidden) && <LoadingProduct imgLoaderRef={imgLoaderRef} priceStartFrom={false} priceTitle={false} imgLoaded={false} details={false} btn={false} />}
                {/*{true && <LoadingProduct imgLoaderRef={imgLoaderRef} priceStartFrom={false} priceTitle={false} imgLoaded={false} details={false} btn={false} />}*/}
            </div>
            <div className="StoreRightView__details">
                <div className="StoreRightView__name" onClick={e => {
                    navigate(`/provider/${store?.providerId}`);
                }}>
                    <div className="StoreRightView__name--text">{store?.name}</div>
                    <img src={verifiedImage} alt="" className={`ProviderImage__verified`}/>

                </div>
                {/*<div className={'StoreRightView__products'}>*/}
                {/*    <div className="StoreRightView__products--element">*/}
                {/*        <div className="StoreRightView__products--product-text">منتج</div>*/}
                {/*        <p>20</p>*/}
                {/*    </div>*/}
                {/*    <div className="StoreRightView__products--element">*/}
                {/*        <div className="StoreRightView__service--text">خدمة</div>*/}
                {/*        <p>12</p>*/}
                {/*    </div>*/}
                {/*    <div className="StoreRightView__products--element">*/}
                {/*        <div className="StoreRightView__activity--text">فعالية</div>*/}
                {/*        <p>3</p>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div className="StoreRightView__contact">
                    {
                        popup && (
                            <div className={'StoreRightView__contact--socials'}>
                                <div className="StoreRightView__contact--triangle"></div>
                                <div className={'StoreRightView__contact--container'}>
                                    {
                                        store?.phone && <div className={'StoreRightView__contact--socials-element'}>
                                            <a href={`tel:${store?.phoneCountryCode}${store.phone}`} className="SocialsNew__link">
                                                <img src={PhoneImage} alt=""/>
                                            </a>
                                        </div>
                                    }
                                    {
                                        store?.phone && <div className={'StoreRightView__contact--socials-element'}>
                                            <a target={'_blank'}  className="" href={assets?.platform != null && (assets?.platform == 0 ? `whatsapp://send?phone=+${store?.phoneCountryCode && store?.phoneCountryCode}${store?.phone && store.phone}&text=''` : `http://web.whatsapp.com/send?phone=${store?.phoneCountryCode && store?.phoneCountryCode}${store?.phone && store.phone}&text=''`)}>
                                                <img src={whatsapp} alt=""/>
                                            </a>
                                        </div>
                                    }
                                    {
                                        store?.providerLocations?.length > 0 && <div onClick={e => {
                                            setLocation(!location);
                                        }} className={'StoreRightView__contact--socials-element'}>
                                            <img src={locationImage} alt=""/>
                                            {
                                                location && <div className="SocialsNew__location">
                                                    {
                                                        store?.providerLocations?.filter(l => l.includes('waze')).length > 0 && (
                                                            <a target={"_blank"} href={store?.providerLocations?.filter(l => l.includes('www.waze.com'))[0]}  className="SocialsNew__location--link">
                                                                <span><i className="fa-brands fa-waze"></i></span>
                                                            </a>
                                                        )
                                                    }
                                                    {
                                                        store?.providerLocations?.filter(l => l.includes('maps')).length > 0 && (
                                                            <a target={"_blank"} href={store?.providerLocations?.filter(l => l.includes('maps'))[0]} className="SocialsNew__location--link">
                                                                <span><i className="fa-solid fa-map-location-dot"></i></span>
                                                            </a>
                                                        )
                                                    }
                                                </div>
                                            }
                                        </div>
                                    }
                                </div>
                                {/*<div onClick={e => {*/}
                                {/*    setSocial(false);*/}
                                {/*    setLocation(false);*/}
                                {/*}} className="StoreRightView__contact--close">*/}
                                {/*    <i className="fa-regular fa-circle-xmark"></i>*/}
                                {/*</div>*/}
                            </div>
                        )
                    }
                    <p onClick={e => {
                        setPopup(!popup);
                    }} className={'StoreRightView__contact--button'}>
                        <p>تواصل</p>
                    </p>
                </div>
                {/*{*/}
                {/*    social && <div className={'StoreRightView__contact--backdrop'}></div>*/}
                {/*}*/}
            </div>

        </div>
    );
};

const mapStateToProps = state => ({
    assets: state.assets
})

export default connect(mapStateToProps) (StoreRightView);