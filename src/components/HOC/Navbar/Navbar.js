import React, {useEffect, useRef, useState} from 'react';
import './Navbar.scss';
import {connect} from "react-redux";
import Search from "./Search/Search";
import Burger from "./Burger/Burger";
import Mid from "./Mid/Mid";
import BackBtn from "./BackBtn/BackBtn";
import {useLocation, useNavigate} from "react-router-dom";
import logo from '../../../assets/images/defaults/logo-default-image.svg';
import Img from "../../../screens/Home/Body/BodyContainer/ProductList/Products/Product/Img/Img";
import marketGray from '../../../assets/images/market-gray.svg';
import marketGreen from '../../../assets/images/market-green.svg';
import storeGray from '../../../assets/images/store-gray.svg';
import storeGreen from '../../../assets/images/store-green.svg';
import mapGray from '../../../assets/images/map-gray.svg';
import {switchMarketStore} from "../../../store/actions/categories.action";

const Navbar = ({data, store, assets, ui, switchMarketStore, searching, setSearching, sidebar, setSidebar}) => {
    const [inputFocus, setInputFocus] = useState(false);
    const [error, setError] = useState(false);
    const [hidden, setHidden] = useState(true);
    const [loaded, setLoaded] = useState(false);
    const imgRefDub = useRef(null);
    const [containerLoaded, setContainerLoaded] = useState(false);
    const [imgLoaded, setImgLoaded] = useState(true);
    const [viewOpen, setViewOpen] = useState(false);
    const [eyeOpen, setEyeOpen] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if(location.pathname.split('/').filter(item => item).length == 0) {
            setEyeOpen(true);
            console.log(location.pathname.replace(/\s+/g, '').split('/').length);
            console.log(location.pathname.split('/').filter(item => item));
        }else {
            setViewOpen(false);
            setEyeOpen(false);
        }
    }, [location]);

    return (
        <div className={'Navbar'}>
            <div className={'Navbar__container'}>
                <div onClick={() => data?.backBtn && navigate('/')} style={{cursor: `${data?.backBtn && 'pointer'}`}} className="Navbar__logo">
                    <Img logo={true} setError={setError} hidden={hidden} setHidden={setHidden} setLoaded={setLoaded} imgRefDub={imgRefDub} setContainerLoaded={setContainerLoaded} setImgLoaded={setImgLoaded} imgUrl={(assets?.logoPath && assets.logoPath) || logo}/>
                </div>
                {
                    data?.search && <Search searching={searching} setSearching={setSearching} inputFocus={inputFocus} setInputFocus={setInputFocus} loadingSearchResults={data?.loadingSearchResults} searchResults={data?.searchResults} term={data?.term} search={data?.search} searchPage={data?.searchPage} />
                }
                {
                    data?.midText && <Mid midText={data.midText} />
                }
                {
                    eyeOpen && (
                        <div onClick={e => {
                            setViewOpen(!viewOpen)
                        }} className={'Navbar__eye'}>
                            <i className="fa-solid fa-eye"></i>
                            {
                                viewOpen && (
                                    <div className={'Navbar__view'}>
                                        <div className="Navbar__view--triangle"></div>
                                        <div onClick={e => {
                                            switchMarketStore(false);
                                            setViewOpen(false)
                                        }} className="Navbar__view--house">
                                            {
                                                store ? (
                                                    <img src={marketGray}/>
                                                ) : (
                                                    <img src={marketGreen} alt=""/>
                                                )
                                            }
                                            <p style={{color: `${store ? '#D0D0D0' : "#03ac84"}`}}>عرض الحاجيات</p>
                                        </div>
                                        <div className={'Navbar__view--ver'}></div>
                                        <div onClick={e => {
                                            switchMarketStore(true);
                                            setViewOpen(false);
                                        }} className="Navbar__view--house">
                                            {
                                                store ? (
                                                    <img src={storeGreen} />
                                                ) : (
                                                    <img src={storeGray} alt=""/>
                                                )
                                            }
                                            <p style={{color: `${!store ? '#D0D0D0' : "#03ac84"}`}}>عرض المتاجر</p>
                                        </div>
                                        {/*<div className={'Navbar__view--ver'}></div>*/}
                                        {/*<div className="Navbar__view--house">*/}
                                        {/*    <img src={mapGray} />*/}
                                        {/*    <p>عرض الخريطة</p>*/}
                                        {/*</div>*/}
                                    </div>
                                )
                            }
                        </div>
                    )
                }
                {
                    ui?.backBtn ? (
                        <>
                            <BackBtn step={data.step} setStep={data.setStep} />
                        </>
                    ) : (
                        <>
                            <Burger setSidebar={setSidebar} />
                        </>
                    )
                }

                {
                    viewOpen && <div onClick={e => setViewOpen(false)} className={'Navbar__view--backdrop'}></div>
                }
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    assets: state.assets,
    ui: state.ui,
    store: state.categories.store
});

export default connect(mapStateToProps, {switchMarketStore}) (Navbar);