import './App.scss';
import {Routes, Route, useNavigate, useLocation} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import {connect} from "react-redux";
import {fetchAssets} from "./store/actions/assets.actions";
import history from "./history/history";
import About from "./screens/About/About";
import Contract from "./screens/contract/Contract";
import {loadUser, loadProvider} from "./store/actions/login.action";
import {createOrder} from "./store/actions/order.actions";
import Forget from "./screens/Forget/Forget";
import {changePlatform} from "./store/actions/assets.actions";
import ProductPopup from "./components/ProductPopup/ProductPopup";
import Navbar from "./components/HOC/NavbarWebsite/Navbar";
import {changeBackBtn} from "./store/actions/ui.actions";
import ProductsDetails from "./screens/Home/Body/BodyContainer/ProductList/Products/ProductsDetails/ProductsDetails";
import NotMobile from "./components/NotMobile/NotMobile"; 
import {Suspense, lazy} from "react";
import SpinnerComponent from "./components/Spinner/Spinner.Component";
import FallBack from "./components/FallBack/FallBack";
import Home from './screens/Home/Home';
import {fetchMarketStores} from "./store/actions/categories.action";
import StorePageShimmer from "./components/StorePageShimmer/StorePageShimmer";
import Authentication from './screens/Authentication/Authentication';
import Alert from './components/Alert/Alert';
import ConfirmEmail from './screens/Authentication/ConfirmEmail/ConfirmEmail';
import axios from 'axios';
import { BASE_URL } from './utls/assets';
import setToken from './utls/set.axios.headers';
import { addAlert } from './store/actions/alert.actions';
import Languages from './screens/Languages/Languages';
import LanguagesAdd from './screens/Languages/LanguagesAdd/LanguagesAdd.js';
import Locales from "./screens/Locales/Locales";
import LocalesAdd from "./screens/Locales/LocalesAdd/LocalesAdd";
import NavbarAdmin from './components/HOC/NavbarAdmin/Navbar';
import Countries from "./screens/Countries/Countries";
import CountriesAdd from "./screens/Countries/CountriesAdd/CountriesAdd";
import {useNavbarContext} from "./context/navbar.context";
import {getUserRoles, getUserProfile} from "./store/actions/auth.actions";
import {fetchLocales} from "./store/actions/categories.action";
import ProfilePage from './screens/ProfilePage/ProfilePage.js';
import Places from './screens/Places/PlacesPage.js';
import AddEditPlace from './screens/Places/AddEditPlace/AddEditPlace.js';
import {changeNavbarIcons} from "./store/actions/navbar.actions";
import Img from "./screens/Home/Body/BodyContainer/ProductList/Products/Product/Img/Img";
import profileDefaultImage from "./assets/images/defaults/default-provider-image.png";
import Icon from "./components/HOC/NavbarWebsite/IconsBar/Icon/Icon";
import Backup from './screens/Backup/Backup.js';
import Roles from "./screens/Roles/Roles";
import {fetchRoles} from "./store/actions/roles.actions";
import RolesAdd from "./screens/Roles/RolesAdd/RolesAdd";

const Gallery = lazy(() => import(/* webpackChunkName: "Gallery" */ './screens/Product/Provider/ProviderProducts/ProviderProduct/Gallery/Gallery'));
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
    const [navHeight, setNavHeight] = useState(0);
    const [filtersAcitve, setFiltersActive] = useState(false);
    const [navShow, setNavShow] = useState(false);
    const [showIcons, setShowIcons] = useState(true);
    const [showEye, setShowEye] = useState(true);
    const [searchShow, setSearchShow] = useState(false);
    const [showMidText,] = useState(false);
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
    const [admin, setAdmin] = useState(false);
    const {changeMidText} = useNavbarContext();

    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [isInstallable, setIsInstallable] = useState(false);

    useEffect(() => {
        changeMidText(location.pathname);
    }, [location]);

    useEffect(() => {
        const handler = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setIsInstallable(true);
        };

        window.addEventListener('beforeinstallprompt', handler);

        return () => {
            window.removeEventListener('beforeinstallprompt', handler);
        };
    }, []);

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
        const data = {
            lan: 'ar_SA',
            page: 0,
            navigate
        }
        // props.fetchAssets(navigate, props.locale?.id);
        props.fetchLocales(data);
        props.loadProvider();
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

    const confirmEmailAndChangePassword = async data => {
        try {
            navigate(`/login?email=${data.email}&code=${data.code}&reset=${true}`);
        } catch (e) {
            props.addAlert({
                msg: e?.response?.data?.message,
                alertType: 'danger'

            });
        }
    }

    const confirmEmailAndRegister = async data => {
        try {
            const userData = {
                localeId: data.localeId,
                userAuthenticationRequestDto: {
                    authType: data.authType,
                    authValue: data.email,
                    password: data.password,
                    accessToken: 'fldjaslkfj'
                }
            }

            const res = await axios.post(`${BASE_URL}endpoints/users/verify-email-and-register?mLocale=${props.locale?.locale}&code=${data.code}`, userData);
            if (res.status == 200 && res.data.status) {
                const token = res.data.output.userToken.split('=')[1].split(';')[0];
                localStorage.setItem('TAKEME_TOKEN', token);
                setToken(token);
                props.getUserRoles(token);
                const data = {
                    locale: props.locale?.locale,
                    localeId: props.locale?.id
                }
                props.getUserProfile(data);
                navigate('/profile');
            } else {
                props.addAlert({
                    msg: res.data.message
                });
            }
        } catch (e) {
            props.addAlert({
                msg: e?.response?.data?.message,
                alertType: 'danger'
            });
        }
    }

    return (
        <div className={'App'} style={{overflowY: `${(!logoStart && !coverLoaded) ? 'hidden' : 'auto'}`}} >
            {
                (!logoStart.firstTime) && <Suspense fallback={<FallBack full={true} />}><Intro /></Suspense>
            }
            {
                !props.loadingAssets && (
                    isMobile ? (
                        <>
                            {
                                admin ? (
                                    <NavbarAdmin />
                                ) : (
                                    <Navbar currentParams={currentParams} providerId={providerId} setProviderId={setProviderId} showMItemTypes={showMItemTypes} showSItemTypes={showSItemTypes} showMCategories={showMCategories} showSCategories={showSCategories} showItemTypes={showItemTypes} setShowItemTypes={setShowItemTypes} storeDetailsRef={storeDetailsRef} personActive={personActive} setPersonActive={setPersonActive} personAva={personAva} searchActive={searchActive} setSearchActive={setSearchActive} eyeDis={eyeDis} setEyeDis={setEyeDis} backupFilters={backupFilters} setBackupFilters={setBackupFilters} topValue={topValue} setTopValue={setTopValue} fixedNav={fixedNav} setFixedNav={setFixedNav} showSlider={showSlider} setShowSlider={setShowSlider} bodyContainerRef={bodyContainerRef} considerNav={considerNav} showMidText={showMidText} searchShow={searchShow} showIcons={showIcons} showEye={showEye} navShow={navShow} setNavShow={setNavShow} filtersActive={filtersAcitve} setFiltersActive={setFiltersActive} navHeight={navHeight} setNavHeight={setNavHeight} searching={searching} setSearching={setSearching} sidebar={sidebar} setSidebar={setSidebar} />
                                )
                            }
                            {
                                props.alert && (
                                    <Alert />
                                )
                            }
                            <Suspense fallback={logoStart.isFirstTime ? <Intro /> : <SpinnerComponent full={true} />}>
                                <Routes history={history}>
                                    <Route path={'/'} element={<Home searchActive={searchActive} setSearchActive={setSearchActive} backupFilters={backupFilters} setBackupFilters={setBackupFilters} personActive={personActive} setPersonActive={setPersonActive} filtersActive={filtersAcitve} setFiltersActive={setFiltersActive} currentParams={currentParams} setCurrentParams={setCurrentParams} y={y} setY={setY} topValue={topValue} setTopValue={setTopValue} fixedNav={fixedNav} setFixedNav={setFixedNav} navShow={navShow} considerNav={considerNav} setConsiderNav={setConsiderNav} bodyContainerRef={bodyContainerRef} setNavShow={setNavShow} navHeight={navHeight} setNavHeight={setNavHeight} coverLoaded={coverLoaded} setCoverLoaded={setCoverLoaded} currentProduct={currentProduct} setCurrentProduct={setCurrentProduct} searching={searching} setSearching={setSearching} sidebar={sidebar} setSidebar={setSidebar} />} />
                                    <Route path={'/provider/:providerId'} exact element={<Suspense fallback={<StorePageShimmer />}><ProviderScreen setProviderId={setProviderId} setShowMItemTypes={setShowMItemTypes} setShowSItemTypes={setShowSItemTypes} setShowMCategories={setShowMCategories} setShowSCategories={setShowSCategories} setShowItemTypes={setShowItemTypes} setFiltersActive={setFiltersActive} setShowSlider={setShowSlider} setPersonActive={setPersonActive} bodyContainerRef={bodyContainerRef} topValue={topValue} storeDetailsRef={storeDetailsRef} setTopValue={setTopValue} personActive={personActive} setPersonAva={setPersonAva} navHeight={navHeight} searchActive={searchActive} setSearchActive={setSearchActive} eyeDis={eyeDis} setEyeDis={setEyeDis} currentProduct={currentProduct} setCurrentProduct={setCurrentProduct} /></Suspense>} >
                                        <Route path={'gallery'} element={<Suspense fallback={<SpinnerComponent />}><Gallery gallery={gallery} product={props.galleryProduct} closeGallery={props.closeGallery} setGallery={setGallery} /></Suspense>} />
                                        <Route path={`popup/:id`} element={<ProductPopup gallery={gallery} setGallery={setGallery} />} />
                                    </Route>
                                    <Route path={'/search'} exact element={<Suspense fallback={<SpinnerComponent full={true} />}><SearchScreen setShowItemTypes={setShowItemTypes} backupFilters={backupFilters} setBackupFilters={setBackupFilters} bodyContainerRef={bodyContainerRef} filtersActive={filtersAcitve} setFiltersActive={setFiltersActive} topValue={topValue} setTopValue={setTopValue} y={y} setY={setY} showSlider={showSlider} setShowSlider={setShowSlider} setIconsShow={setShowIcons} setSearchShow={setSearchShow} navHeight={navHeight} setShowEye={setShowEye} gallery={gallery} setGallery={setGallery} searching={searching} setSearching={setSearching} /></Suspense>} >
                                        <Route path={`popup/:id`} element={<ProductPopup gallery={gallery} setGallery={setGallery} />} >
                                            <Route path={'gallery'} element={<Suspense fallback={<SpinnerComponent />}><Gallery gallery={gallery} product={props.galleryProduct} closeGallery={props.closeGallery} setGallery={setGallery} /></Suspense>} />
                                        </Route>
                                    </Route>
                                    <Route path={'/search/:storeId'} exact element={<Suspense fallback={<SpinnerComponent full={true} />}><SearchScreen setShowItemTypes={setShowItemTypes} backupFilters={backupFilters} setBackupFilters={setBackupFilters} bodyContainerRef={bodyContainerRef} filtersActive={filtersAcitve} setFiltersActive={setFiltersActive} topValue={topValue} setTopValue={setTopValue} y={y} setY={setY} showSlider={showSlider} setShowSlider={setShowSlider} setIconsShow={setShowIcons} setSearchShow={setSearchShow}  navHeight={navHeight} setShowEye={setShowEye} gallery={gallery} setGallery={setGallery} searching={searching} setSearching={setSearching} /></Suspense>} >
                                        <Route path={`popup/:id`} element={<ProductPopup gallery={gallery} setGallery={setGallery} />} >
                                            <Route path={'gallery'} element={<Suspense fallback={<SpinnerComponent />}><Gallery gallery={gallery} product={props.galleryProduct} closeGallery={props.closeGallery} setGallery={setGallery} /></Suspense>} />
                                        </Route>
                                    </Route>
                                    <Route path={`main/popup/:id`} element={<ProductPopup gallery={gallery} setGallery={setGallery} />} >
                                        <Route path={'gallery'} element={<Suspense fallback={<SpinnerComponent />}><Gallery gallery={gallery} product={props.galleryProduct} closeGallery={props.closeGallery} setGallery={setGallery} /></Suspense>} />
                                    </Route>
                                    <Route path='/confirm/email/register/:email/:password' exact element={<ConfirmEmail bodyContainerRef={bodyContainerRef} y={y} setY={setY} topValue={topValue} setTopValue={setTopValue} navHeight={navHeight} confirmHandler={confirmEmailAndRegister} paddingTop={navHeight} showIcons={showIcons} setShowIcons={setShowIcons} />} />
                                    <Route path='/confirm/email/change/password/:email' exact element={<ConfirmEmail bodyContainerRef={bodyContainerRef} y={y} setY={setY} topValue={topValue} setTopValue={setTopValue} navHeight={navHeight} confirmHandler={confirmEmailAndChangePassword} paddingTop={navHeight} showIcons={showIcons} setShowIcons={setShowIcons} />} />
                                    <Route path={'/login'} exact element={<Authentication bodyContainerRef={bodyContainerRef} y={y} setY={setY} topValue={topValue} setTopValue={setTopValue} navHeight={navHeight} paddingTop={navHeight} showIcons={showIcons} setShowIcons={setShowIcons} />} />
                                    <Route
                                        path={`product/popup/:id`}
                                        element={<ProductPopup gallery={gallery} setGallery={setGallery} />}
                                    />
                                    <Route
                                        path={'gallery'}
                                        element={<Suspense fallback={<SpinnerComponent />}><Gallery gallery={gallery} product={props.galleryProduct} closeGallery={props.closeGallery} setGallery={setGallery} /></Suspense>}
                                    />
                                    <Route
                                        path={'popup/:id'}
                                        exact
                                        element={<ProductsDetails currentProduct={currentProduct} popup={popup} setPopup={setPopup} setCurrentProduct={setCurrentProduct} />}
                                    />
                                    <Route
                                        path={'/about'}
                                        exact
                                        element={<About setShowIcons={setShowIcons} />}
                                    />
                                    <Route
                                        path={'/contract'}
                                        exact
                                        element={<Contract setShowIcons={setShowIcons} />}
                                    />
                                    <Route
                                        path={'/forget/:email'}
                                        exact
                                        element={<Forget />}
                                    />
                                    <Route
                                        path='/profile'
                                        exact element={<ProfilePage paddingTop={navHeight} admin={admin} setAdmin={setAdmin} />}
                                    />
                                    {
                                        props.roles?.includes('ROLE_Admin') && (
                                            <>
                                                <Route
                                                    path='/languages'
                                                    element={<Languages paddingTop={navHeight} admin={admin} setAdmin={setAdmin} />}
                                                />
                                                <Route
                                                    path='/languages/add'
                                                    exact
                                                    element={<LanguagesAdd paddingTop={navHeight} admin={admin} setAdmin={setAdmin} />}
                                                />
                                                <Route
                                                    path='/languages/add/duplicate/:lanId'
                                                    exact
                                                    element={<LanguagesAdd paddingTop={navHeight} admin={admin} setAdmin={setAdmin} />}
                                                />
                                                <Route
                                                    path='/languages/edit/:editId'
                                                    exact
                                                    element={<LanguagesAdd paddingTop={navHeight} admin={admin} setAdmin={setAdmin} />}
                                                />
                                                <Route
                                                    path='/locales'
                                                    exact
                                                    element={<Locales paddingTop={navHeight} admin={admin} setAdmin={setAdmin} />}
                                                />
                                                <Route
                                                    path="/locales/add"
                                                    exact
                                                    element={<LocalesAdd paddingTop={navHeight} admin={admin} setAdmin={setAdmin} />}
                                                />
                                                <Route
                                                    path='/locales/add/duplicate/:lanId'
                                                    exact
                                                    element={<LocalesAdd paddingTop={navHeight} admin={admin} setAdmin={setAdmin} />}
                                                />
                                                <Route
                                                    path='/locales/edit/:editId'
                                                    exact
                                                    element={<LocalesAdd paddingTop={navHeight} admin={admin} setAdmin={setAdmin} />}
                                                />
                                                <Route
                                                    path='/countries'
                                                    exact
                                                    element={<Countries admin={admin} setAdmin={setAdmin} />}
                                                />
                                                <Route
                                                    path='/countries/add'
                                                    exact
                                                    element={<CountriesAdd admin={admin} setAdmin={setAdmin} />}
                                                />
                                                <Route
                                                    path='/countries/add/duplicate/:lanId'
                                                    exact
                                                    element={<CountriesAdd admin={admin} setAdmin={setAdmin} />}
                                                />
                                                <Route
                                                    path='/countries/edit/:editId'
                                                    exact
                                                    element={<CountriesAdd admin={admin} setAdmin={setAdmin} />}
                                                />
                                                <Route
                                                    path='/roles'
                                                    exact
                                                    element={<Roles admin={admin} setAdmin={setAdmin} />}
                                                />
                                                <Route
                                                    path='/roles/add'
                                                    exact
                                                    element={<RolesAdd admin={admin} setAdmin={setAdmin} />}
                                                />
                                                <Route
                                                    path='/roles/add/duplicate/:roleId'
                                                    exact
                                                    element={<RolesAdd admin={admin} setAdmin={setAdmin} />}
                                                />
                                                <Route
                                                    path='/roles/edit/:editId'
                                                    exact
                                                    element={<RolesAdd admin={admin} setAdmin={setAdmin} />}
                                                />
                                                <Route
                                                    path='/places'
                                                    exact
                                                    element={<Places admin={admin} setAdmin={setAdmin} />}
                                                />
                                                <Route
                                                    path='/places/add'
                                                    exact
                                                    element={<AddEditPlace admin={admin} setAdmin={setAdmin} />}
                                                />
                                                <Route
                                                    path='/places/edit/:id'
                                                    exact
                                                    element={<AddEditPlace mode={'edit'} admin={admin} setAdmin={setAdmin} />}
                                                />
                                                <Route
                                                    path='/places/duplicate/:id'
                                                    exact
                                                    element={<AddEditPlace mode={'duplicate'} admin={admin} setAdmin={setAdmin} />}
                                                />
                                                <Route
                                                    path='/backup'
                                                    exact element={<Backup setAdmin={setAdmin} />}
                                                />
                                            </>
                                        )
                                    }
                                </Routes>
                            </Suspense>
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
    assets: state.assets,
    alert: state.alert,
    locale: state.categories.selectedLocale,
    roles: state.auth.roles,
    isAuthenticated: state.auth.isAuthenticated,
    profile: state.auth.profile,
});

export default connect(mapStateToProps, {fetchRoles, changeNavbarIcons, fetchAssets, fetchLocales, getUserRoles, getUserProfile, fetchMarketStores, loadProvider, addAlert, changeBackBtn, createOrder, loadUser, changePlatform}) (React.memo(App));