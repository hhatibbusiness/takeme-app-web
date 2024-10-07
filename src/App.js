import './App.scss';
import {Routes, Route, useNavigate} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import {connect} from "react-redux";
import {fetchAssets} from "./store/actions/assets.actions";
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
import ProductsDetails from "./screens/Home/Body/BodyContainer/ProductList/Products/ProductsDetails/ProductsDetails";
import NotMobile from "./components/NotMobile/NotMobile"; 
import {Suspense, lazy} from "react";
import SpinnerComponent from "./components/Spinner/Spinner.Component";
import FallBack from "./components/FallBack/FallBack"; 
import Home from './screens/Home/Home';
import {fetchMarketStores} from "./store/actions/categories.action";
import StorePageShimmer from "./components/StorePageShimmer/StorePageShimmer";
import {RouterParamsProvider} from "./contexts/RouterParamsContext";

const Gallery = lazy(() => import(/* webpackChunkName: "Gallery" */ './screens/Product/Provider/ProviderProducts/ProviderProduct/Gallery/Gallery'));
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
    const [gallery, setGallery] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [popup, setPopup] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [coverLoaded, setCoverLoaded] = useState(false);
    const [navHeight, setNavHeight] = useState(0);
    const [filtersAcitve, setFiltersActive] = useState(false);
    const [navShow, setNavShow] = useState(false);
    const [showIcons, setShowIcons] = useState(true);
    const [showEye, setShowEye] = useState(true);
    const [backBtn, setBackBtn] = useState(false);
    const [searchShow, setSearchShow] = useState(false);
    const [showMidText, setShowMidText] = useState(false);
    const [considerNav, setConsiderNav] = useState(true);
    const [showSlider, setShowSlider] = useState(true);
    const [fixedNav, setFixedNav] = useState(false);
    const [topValue, setTopValue] = useState(0);
    const bodyContainerRef = useRef();
    const [y, setY] = useState(null);
    const [backupFilters, setBackupFilters] = useState(false);
    const [eyeDis, setEyeDis] = useState(false);
    const [searchActive, setSearchActive] = useState(true);
    const [personAva, setPersonAva] = useState(false);
    const [personActive, setPersonActive] = useState(false);
    const storeDetailsRef= useRef();
    const [showItemTypes, setShowItemTypes] = useState(true);
    const [showMCategories, setShowMCategories] = useState(true);
    const [showSCategories, setShowSCategories] = useState(false);
    const [showMItemTypes, setShowMItemTypes] = useState(true);
    const [showSItemTypes, setShowSItemTypes] = useState(false);
    const [providerId, setProviderId] = useState(null);
    const [currentParams, setCurrentParams] = useState({});

    useEffect(() => {
        let timeOut;
        if(logoStart != '1') {
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

    return (
        <RouterParamsProvider>
            <div className={'App'} style={{overflowY: `${(!logoStart && !coverLoaded) ? 'hidden' : 'auto'}`}} >
                {
                    (!logoStart.firstTime)  && <Suspense fallback={<FallBack full={true} />}><Intro /></Suspense>
                }
                {
                    !props.loadingAssets && (
                        isMobile ? (
                            <>
                                <Navbar currentParams={currentParams} providerId={providerId} setProviderId={setProviderId} showMItemTypes={showMItemTypes} showSItemTypes={showSItemTypes} showMCategories={showMCategories} showSCategories={showSCategories} showItemTypes={showItemTypes} setShowItemTypes={setShowItemTypes} storeDetailsRef={storeDetailsRef} personActive={personActive} setPersonActive={setPersonActive} personAva={personAva} searchActive={searchActive} setSearchActive={setSearchActive} eyeDis={eyeDis} setEyeDis={setEyeDis} backupFilters={backupFilters} setBackupFilters={setBackupFilters} topValue={topValue} setTopValue={setTopValue} fixedNav={fixedNav} setFixedNav={setFixedNav} showSlider={showSlider} setShowSlider={setShowSlider} bodyContainerRef={bodyContainerRef} considerNav={considerNav} showMidText={showMidText} backBtn={backBtn} searchShow={searchShow} showIcons={showIcons} showEye={showEye} navShow={navShow} setNavShow={setNavShow} filtersActive={filtersAcitve} setFiltersActive={setFiltersActive} navHeight={navHeight} setNavHeight={setNavHeight} searching={searching} setSearching={setSearching} sidebar={sidebar} setSidebar={setSidebar} />
                                <Suspense fallback={logoStart.isFirstTime ? <Intro /> : <SpinnerComponent full={true} />}>
                                    <Routes history={history}>
                                        <Route path={'/'} element={<Home currentParams={currentParams} setCurrentParams={setCurrentParams} y={y} setY={setY} topValue={topValue} setTopValue={setTopValue} fixedNav={fixedNav} setFixedNav={setFixedNav} navShow={navShow} considerNav={considerNav} setConsiderNav={setConsiderNav} bodyContainerRef={bodyContainerRef} setNavShow={setNavShow} navHeight={navHeight} setNavHeight={setNavHeight} filtersActive={filtersAcitve} setFiltersActive={setFiltersActive} coverLoaded={coverLoaded} setCoverLoaded={setCoverLoaded} currentProduct={currentProduct} setCurrentProduct={setCurrentProduct} searching={searching} setSearching={setSearching} sidebar={sidebar} setSidebar={setSidebar} />} >
                                            <Route path={'/product/:productId'} exact element={<Suspense fallback={<SpinnerComponent full={true} />}><Product setBackBtn={setBackBtn} /></Suspense>} >
                                                <Route path={'gallery'} element={<Suspense fallback={<SpinnerComponent />}><Gallery gallery={gallery} product={props.galleryProduct} closeGallery={props.closeGallery} setGallery={setGallery} /></Suspense>} />
                                                <Route path={`popup/:id`} element={<ProductPopup gallery={gallery} setGallery={setGallery} />} />
                                            </Route>
                                            <Route path={'/provider/:providerId'} exact element={<Suspense fallback={<StorePageShimmer />}><ProviderScreen setProviderId={setProviderId} setShowMItemTypes={setShowMItemTypes} setShowSItemTypes={setShowSItemTypes} setShowMCategories={setShowMCategories} setShowSCategories={setShowSCategories} setShowItemTypes={setShowItemTypes} setFiltersActive={setFiltersActive} setShowSlider={setShowSlider} setPersonActive={setPersonActive} bodyContainerRef={bodyContainerRef} topValue={topValue} storeDetailsRef={storeDetailsRef} setTopValue={setTopValue} personActive={personActive} setPersonAva={setPersonAva} navHeight={navHeight} searchActive={searchActive} setSearchActive={setSearchActive} eyeDis={eyeDis} setEyeDis={setEyeDis} setshowMidText={setShowMidText} setBackBtn={setBackBtn} currentProduct={currentProduct} setCurrentProduct={setCurrentProduct} /></Suspense>} >
                                                <Route path={'gallery'} element={<Suspense fallback={<SpinnerComponent />}><Gallery gallery={gallery} product={props.galleryProduct} closeGallery={props.closeGallery} setGallery={setGallery} /></Suspense>} />
                                                <Route path={`popup/:id`} element={<ProductPopup gallery={gallery} setGallery={setGallery} />} />
                                            </Route>
                                            {/*<Route exact path={'/provider/:provider_id/ratings'} element={<KeepAlive cacheKey={'Ratings'}><ProviderRatings /></KeepAlive>} />*/}
                                            <Route path={'/search'} exact element={<Suspense fallback={<SpinnerComponent full={true} />}><SearchScreen setShowItemTypes={setShowItemTypes} backupFilters={backupFilters} setBackupFilters={setBackupFilters} bodyContainerRef={bodyContainerRef} filtersActive={filtersAcitve} setFiltersActive={setFiltersActive} topValue={topValue} setTopValue={setTopValue} y={y} setY={setY} showSlider={showSlider} setShowSlider={setShowSlider} setshowMidText={setShowMidText} setIconsShow={setShowIcons} setSearchShow={setSearchShow} setBackBtn={setBackBtn} navHeight={navHeight} setShowEye={setShowEye} gallery={gallery} setGallery={setGallery} searching={searching} setSearching={setSearching} /></Suspense>} >
                                                <Route path={`popup/:id`} element={<ProductPopup gallery={gallery} setGallery={setGallery} />} >
                                                    <Route path={'gallery'} element={<Suspense fallback={<SpinnerComponent />}><Gallery gallery={gallery} product={props.galleryProduct} closeGallery={props.closeGallery} setGallery={setGallery} /></Suspense>} />
                                                </Route>
                                            </Route>
                                            <Route path={'/search/:storeId'} exact element={<Suspense fallback={<SpinnerComponent full={true} />}><SearchScreen setShowItemTypes={setShowItemTypes} backupFilters={backupFilters} setBackupFilters={setBackupFilters} bodyContainerRef={bodyContainerRef} filtersActive={filtersAcitve} setFiltersActive={setFiltersActive} topValue={topValue} setTopValue={setTopValue} y={y} setY={setY} showSlider={showSlider} setShowSlider={setShowSlider} setshowMidText={setShowMidText} setIconsShow={setShowIcons} setSearchShow={setSearchShow} setBackBtn={setBackBtn} navHeight={navHeight} setShowEye={setShowEye} gallery={gallery} setGallery={setGallery} searching={searching} setSearching={setSearching} /></Suspense>} >
                                                <Route path={`popup/:id`} element={<ProductPopup gallery={gallery} setGallery={setGallery} />} >
                                                    <Route path={'gallery'} element={<Suspense fallback={<SpinnerComponent />}><Gallery gallery={gallery} product={props.galleryProduct} closeGallery={props.closeGallery} setGallery={setGallery} /></Suspense>} />
                                                </Route>
                                            </Route>
                                            <Route path={`main/popup/:id`} element={<ProductPopup gallery={gallery} setGallery={setGallery} />} >
                                                <Route path={'gallery'} element={<Suspense fallback={<SpinnerComponent />}><Gallery gallery={gallery} product={props.galleryProduct} closeGallery={props.closeGallery} setGallery={setGallery} /></Suspense>} />
                                            </Route>
                                            <Route path={`product/popup/:id`} element={<ProductPopup gallery={gallery} setGallery={setGallery} />} />
                                            <Route path={'gallery'} element={<Suspense fallback={<SpinnerComponent />}><Gallery gallery={gallery} product={props.galleryProduct} closeGallery={props.closeGallery} setGallery={setGallery} /></Suspense>} />
                                            <Route path={'popup/:id'} exact element={<ProductsDetails currentProduct={currentProduct} popup={popup} setPopup={setPopup} setCurrentProduct={setCurrentProduct} />} />
                                            <Route path={'/about'} exact element={<About setBackBtn={setBackBtn} setShowIcons={setShowIcons} setshowMidText={setShowMidText} />} />
                                            <Route path={'/contract'} exact element={<Contract setShowIcons={setShowIcons} setBackBtn={setBackBtn} setshowMidText={setShowMidText} />} />
                                            <Route path={'/login'} exact element={<Login setBackBtn={setBackBtn} setShowIcons={setShowIcons} />} setshowMidText={setShowMidText} />
                                            <Route path={'/register'} element={<Register setBackBtn={setBackBtn} />} setshowMidText={setShowMidText} />
                                            <Route path={'/forget/:email'} exact element={<Forget setBackBtn={setBackBtn} />} setshowMidText={setShowMidText} />
                                        </Route>
                                    </Routes>
                                </Suspense>
                            </>
                        ) : (
                            <NotMobile />
                        )
                    )
                }
            </div>
        </RouterParamsProvider>
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