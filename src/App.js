import './App.scss';
import {Routes, Route, useNavigate, useLocation} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import {connect} from "react-redux";
import {endLoadingAssets, fetchAssets} from "./store/actions/assets.actions";
import history from "./history/history";
import About from "./screens/About/About";
import Contract from "./screens/contract/Contract";
import Login from "./screens/Login/Login";
import Register from "./screens/Register/Register";
import {loadUser, loadProvider} from "./store/actions/login.action";
import {createOrder} from "./store/actions/order.actions";
import Forget from "./screens/Forget/Forget";
import {changePlatform} from "./store/actions/assets.actions";
import ProductPopup from "./components/ProductPopup/ProductPopup";
import Navbar from "./components/HOC/Navbar/Navbar";
import {changeBackBtn} from "./store/actions/ui.actions";
// import Gallery from "./screens/Product/Provider/ProviderProducts/ProviderProduct/Gallery/Gallery";
import ProductsDetails from "./screens/Home/Body/BodyContainer/ProductList/Products/ProductsDetails/ProductsDetails";
import NotMobile from "./components/NotMobile/NotMobile";
import {Suspense, lazy} from "react";
import SpinnerComponent from "./components/Spinner/Spinner.Component";
import {KeepAlive} from "react-activation";
import FallBack from "./components/FallBack/FallBack";
import Home from './screens/Home/Home';
import {fetchMarketStores} from "./store/actions/categories.action";
// import Product from './screens/Product/Product';
// import ProviderScreen from './screens/Provider/ProviderScreen';
// import SearchScreen from "./screens/SearchScreen/SearchScreen";
// import Intro from './components/Intro/Intro';

// const Home = lazy(() => import(/* webpackChunkName: "Home" */ './screens/Home/Home'));
const Gallery = lazy(() => import(/* webpackChunkName: "Gallery" */ './screens/Product/Provider/ProviderProducts/ProviderProduct/Gallery/Gallery'));
// const Home = lazy(() => import('./screens/Home/Home'));
const Product = lazy(() => import(/* webpackChunkName: "Product" */ "./screens/Product/Product"));
const ProviderScreen = lazy(() => import(/* webpackChunkName: "ProviderScreen" */ "./screens/Provider/ProviderScreen"));
const SearchScreen = lazy(() => import(/* webpackChunkName: "SearchScreen" */ "./screens/SearchScreen/SearchScreen"));
const Intro = lazy(() => import(/* webpackChunkName: "Intro" */ "./components/Intro/Intro"));

const App = (props) => {
    const [sidebar, setSidebar] = useState(false);
    const [logoStart, setLogoStart] = useState({
        firstTime: performance.getEntriesByType('navigation')[0].type != 'reload' ? null : localStorage.getItem('takemeFirstVisit'),
        isFirstTime: performance.getEntriesByType('navigation')[0].type != 'reload' ? true : false
    });
    const navigate = useNavigate();
    const [searching, setSearching] = useState(false);
    const location = useLocation();
    const [gallery, setGallery] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [popup, setPopup] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [coverLoaded, setCoverLoaded] = useState(false);

    const homeRef = useRef();


    // useEffect(() => {
    //     console.log(location.pathname);
    //     if(logoStart != '1' && coverLoaded) {
    //         setLogoStart(1);
    //         localStorage.setItem("takemeFirstVisit", 1);
    //     }
    // }, [coverLoaded, logoStart]);

    useEffect(() => {
        let timeOut;
        // console.log('Hello there!', logoStart, localStorage.getItem('takemeFirstVisit'));
        if(logoStart != '1') {
            // if(true){
            // console.log('Hello from intro');
            timeOut = setTimeout(() => {
                setLogoStart(prev => {
                    return {
                        ...prev,
                        firstTime: 1
                    }
                });
                localStorage.setItem("takemeFirstVisit", 1);
            }, 1000);
        }
        return () => {
            clearTimeout(timeOut);
        }
    }, [props.loadingAssets]);


    useEffect(async () => {
        await props.loadUser(navigate, props.lan);
        props.fetchAssets(navigate);
        props.loadProvider()
    }, []);

    // useEffect(() => {
    //     const data = {
    //         lan: 'ar',
    //         page: 0,
    //         filter: 'ALL',
    //         categoryId: 0
    //     };
    //
    //     props.fetchMarketStores(data);
    // }, []);

    useEffect(() => {
        function isMobile() {
            const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
            return regex.test(navigator.userAgent);
        }

        window.addEventListener('resize', e => {
            if (isMobile() || document?.body?.offsetWidth == 430) {
                props.changePlatform(0);
                const intro = document?.querySelector('.Intro img');
                if(intro) {
                    intro.style.top = "370px";
                }
                setIsMobile(true);
            } else {
                props.changePlatform(1);
                setIsMobile(false);
            }
        });

        if (isMobile() || document?.body?.offsetWidth == 500) {
            props.changePlatform(0);
            const intro = document?.querySelector('.Intro img');
            if(intro) {
                intro.style.top = "370px";
            }
            setIsMobile(true);
        } else {
            props.changePlatform(1);
            setIsMobile(false);
        }
    }, []);

    useEffect(() => {
        const navbar = document?.querySelector('.Navbar');
        if(navbar) {
            if(window?.location.hash.length > 2) {
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
        <div className={'App'} style={{overflowY: `${(!logoStart && !coverLoaded) ? 'hidden' : 'auto'}`}} >
            {
                // true  && <Suspense fallback={<SpinnerComponent />}><Intro /></Suspense>
                (!logoStart.firstTime)  && <Suspense fallback={<FallBack full={true} />}><Intro /></Suspense>
            }
            {
                !props.loadingAssets && (
                    isMobile ? (
                        <>
                            <Suspense fallback={logoStart.isFirstTime ? <Intro /> : <SpinnerComponent full={true} />}>
                                <Routes history={history}>
                                    <Route path={'/'} element={<Home coverLoaded={coverLoaded} setCoverLoaded={setCoverLoaded} currentProduct={currentProduct} setCurrentProduct={setCurrentProduct} searching={searching} setSearching={setSearching} sidebar={sidebar} setSidebar={setSidebar} />} >
                                        {/*<Route path={'/product/:productId'} exact element={<Product />} >*/}
                                        {/*    <Route path={'popup/:id'} exact element={<ProductPopup gallery={gallery} setGallery={setGallery} />} />*/}
                                        {/*    <Route path={'gallery'} exact={true} element={<Gallery gallery={gallery} product={props.galleryProduct} closeGallery={props.closeGallery} setGallery={setGallery} />} />*/}
                                        {/*</Route>*/}
                                        <Route path={'/product/:productId'} exact element={<Suspense fallback={<SpinnerComponent full={true} />}><Product /></Suspense>} >
                                            <Route path={'gallery'} element={<Suspense fallback={<SpinnerComponent />}><Gallery gallery={gallery} product={props.galleryProduct} closeGallery={props.closeGallery} setGallery={setGallery} /></Suspense>} />
                                            <Route path={`popup/:id`} element={<ProductPopup gallery={gallery} setGallery={setGallery} />} />
                                        </Route>
                                        <Route path={'/provider/:providerId'} exact element={<Suspense fallback={<SpinnerComponent full={true} />}><ProviderScreen /></Suspense>} >
                                            <Route path={'gallery'} element={<Suspense fallback={<SpinnerComponent />}><Gallery gallery={gallery} product={props.galleryProduct} closeGallery={props.closeGallery} setGallery={setGallery} /></Suspense>} />
                                            <Route path={`popup/:id`} element={<ProductPopup gallery={gallery} setGallery={setGallery} />} />
                                        </Route>
                                        {/*<Route exact path={'/provider/:provider_id/ratings'} element={<KeepAlive cacheKey={'Ratings'}><ProviderRatings /></KeepAlive>} />*/}
                                        <Route path={'/search'} exact element={<Suspense fallback={<SpinnerComponent full={true} />}><SearchScreen gallery={gallery} setGallery={setGallery} searching={searching} setSearching={setSearching} /></Suspense>} >
                                            <Route path={`popup/:id`} element={<ProductPopup gallery={gallery} setGallery={setGallery} />} >
                                                <Route path={'gallery'} element={<Suspense fallback={<SpinnerComponent />}><Gallery gallery={gallery} product={props.galleryProduct} closeGallery={props.closeGallery} setGallery={setGallery} /></Suspense>} />
                                            </Route>
                                        </Route>
                                        <Route path={'popup/:id'} exact element={<ProductsDetails currentProduct={currentProduct} popup={popup} setPopup={setPopup} setCurrentProduct={setCurrentProduct} />} />
                                        <Route path={'/about'} exact element={<About />} />
                                        <Route path={'/contract'} exact element={<Contract />} />
                                        <Route path={'/login'} exact element={<Login />} />
                                        <Route path={'/register'} element={<Register />} />
                                        <Route path={'/forget/:email'} exact element={<Forget />} />
                                    </Route>
                                </Routes>
                            </Suspense>
                            <Navbar searching={searching} setSearching={setSearching} sidebar={sidebar} setSidebar={setSidebar} data={props.navbarData}/>
                        </>
                    ) : (
                        <NotMobile />
                    )
                )
            }
        </div>
    )
}

const mapStateToProps = state => ({
    openPopup: state.ui.openPopup,
    product: state.product.product,
    platform: state.assets.platform,
    navbarData: state.ui.navbar,
    loadingAssets: state.assets.loadingAssets,
    lan: state.categories.lan,
    closeGallery: state.ui.closeGallery,
    galleryProduct: state.product.galleryProduct,
    token: state.login.takemeUserToken,
    assets: state.assets
});

export default connect(mapStateToProps, {fetchAssets, fetchMarketStores, loadProvider, changeBackBtn, createOrder, loadUser, changePlatform}) (React.memo(App));