import './App.scss';
import {Routes, Route, useNavigate, useParams} from "react-router-dom";
import Home from "./screens/Home/Home";
import React, {useEffect, useRef, useState} from "react";
import {connect} from "react-redux";
import {fetchAssets} from "./store/actions/assets.actions";
import Product from "./screens/Product/Product";
import history from "./history/history";
import ProviderScreen from "./screens/Provider/ProviderScreen";
import SearchScreen from "./screens/SearchScreen/SearchScreen";
import {useTranslation} from "react-i18next";
import About from "./screens/About/About";
import Contract from "./screens/contract/Contract";
import Login from "./screens/Login/Login";
import Register from "./screens/Register/Register";
import {loadUser} from "./store/actions/login.action";
import {createOrder} from "./store/actions/order.actions";
import Forget from "./screens/Forget/Forget";
import {changePlatform} from "./store/actions/assets.actions";
import {analytics} from "./utls/firebase.auth";
import {logEvent} from "firebase/analytics";
import ProductPopup from "./components/ProductPopup/ProductPopup";
import ProviderRatings from "./screens/Provider/ProviderRatings/ProviderRatings";
import {openPopup} from "./store/actions/ui.actions";
import KeepAlive, {withActivation} from "react-activation";
import smoothscroll from 'smoothscroll-polyfill';
import Intro from "./components/Intro/Intro";
import i18n from './i18n';
import Navbar from "./components/HOC/Navbar/Navbar";
import {changeBackBtn} from "./store/actions/ui.actions";

const App = (props) => {
    const [sidebar, setSidebar] = useState(false);
    const [logoStart, setLogoStart] = useState(performance.getEntriesByType('navigation')[0].type != 'reload' ? null : localStorage.getItem('takemeFirstVisit'));
    const navigate = useNavigate();

    const homeRef = useRef();

    useEffect(() => {
        let timeOut;
        // console.log('Hello there!', logoStart, localStorage.getItem('takemeFirstVisit'));
        if(logoStart != '1') {
            // if(true){
            // console.log('Hello from intro');
            timeOut = setTimeout(() => {
                setLogoStart(1);
                localStorage.setItem("takemeFirstVisit", 1);
            }, 1000);
        }
        return () => {
            clearTimeout(timeOut);
        }
    }, []);

    // const resetHeight = () => {
    //     document.querySelector('.App').style.height = window.innerHeight + "px";
    // }

    // useEffect(() => {
    //     if(props.platform == 0) {
    //         resetHeight();
    //         window.addEventListener('resize', resetHeight);
    //         return () => {
    //             window.removeEventListener('resize', resetHeight);
    //         }
    //     }
    // }, [props.platform]);

    // useEffect(() => {
    //     console.log(performance.getEntriesByType('navigation'));
    //     return () => {
    //         localStorage.setItem('navigation', JSON.stringify(performance.getEntriesByType('navigation')[0]))
    //     }
    // }, []);

    const {t} = useTranslation();
    useEffect(() => {
        props.fetchAssets(navigate);
        props.loadUser(navigate, props.lan);
        // props.createOrder();
    }, []);

    useEffect(() => {
        function isMobile() {
            const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
            return regex.test(navigator.userAgent);
        }

        if (isMobile()) {
            props.changePlatform(0);
            const intro = document?.querySelector('.Intro img');
            if(intro) {
                intro.style.top = "370px";
            }
        } else {
            props.changePlatform(1);
        }
    }, []);

    useEffect(() => {
        const navbar = document?.querySelector('.Navbar');
        if(navbar) {
            if(window?.location.hash.length > 2) {
                // console.log(window.location.hash.includes('search'))
                if(window?.location?.hash?.includes('search')) {
                    props.changeBackBtn(true);
                    navbar.style.height = "75px";
                    navbar.style.display = "block";
                } else {
                    props.changeBackBtn(true);
                    navbar.style.height = '52px';
                    navbar.style.display = "block";
                }
            } else {
                props.changeBackBtn(false);
                navbar.style.height = "75px";
                navbar.style.display = "block";
            }
        }

    }, [window?.location.hash, logoStart, props.loadingAssets]);

    return (
        <div onClick={e => {
            // logEvent(analytics, 'web_clicked', {user: 'clicked'})
        }} className={'App'} >
            {
                !props.loadingAssets && (
                    !logoStart ? (
                        <Intro />
                    ) : (
                        <>
                            <Routes history={history}>
                                <Route path={'/'} exact element={<Home sidebar={sidebar} setSidebar={setSidebar} />} >
                                    <Route path={'/product/:id'} exact element={<Product />} />
                                    <Route path={'/provider/:providerId'} exact element={<ProviderScreen />} />
                                    {/*<Route exact path={'/provider/:provider_id/ratings'} element={<KeepAlive cacheKey={'Ratings'}><ProviderRatings /></KeepAlive>} />*/}
                                    <Route path={'/search'} exact element={<SearchScreen />} />
                                    <Route path={'/about'} exact element={<About />} />
                                    <Route path={'/contract'} exact element={<Contract />} />
                                    <Route path={'/login'} exact element={<Login />} />
                                    <Route path={'/register'} element={<Register />} />
                                    <Route path={'/forget/:email'} exact element={<Forget />} />
                                </Route>
                            </Routes>
                            <Navbar sidebar={sidebar} setSidebar={setSidebar} data={props.navbarData}/>
                        </>
                    )

                )
            }
            {props.openPopup && <ProductPopup />}
        </div>
    )
}

const mapStateToProps = state => ({
    openPopup: state.ui.openPopup,
    product: state.product.product,
    platform: state.assets.platform,
    navbarData: state.ui.navbar,
    loadingAssets: state.assets.loadingAssets,
    lan: state.categories.lan
});

export default connect(mapStateToProps, {fetchAssets, changeBackBtn, createOrder, loadUser, changePlatform}) (App);
