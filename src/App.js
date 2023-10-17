import './App.scss';
import {Routes, Route, useNavigate} from "react-router-dom";
import Home from "./screens/Home/Home";
import {useEffect} from "react";
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

const App = (props) => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    useEffect(() => {
        props.fetchAssets(navigate);
        props.loadUser();
        // props.createOrder();
    }, []);

    useEffect(() => {
        function isMobile() {
            const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
            return regex.test(navigator.userAgent);
        }

        if (isMobile()) {
            props.changePlatform(0);
        } else {
            props.changePlatform(1);
        }
    }, []);

    return (
        <div onClick={e => {
            // logEvent(analytics, 'web_clicked', {user: 'clicked'})
        }} className={'App'} style={{font: `${t('font')}`}}>
            <Routes history={history}>
                <Route path={'/'} exact element={<Home />} >
                    <Route path={'/product/:id'} exact element={<Product />} />
                    <Route path={'/provider/:providerId'} exact element={<ProviderScreen />} />
                    <Route exact path={'/provider/:provider_id/ratings'} element={<ProviderRatings />} />
                    <Route path={'/search'} exact element={<SearchScreen />} />
                    <Route path={'/about'} exact element={<About />} />
                    <Route path={'/contract'} exact element={<Contract />} />
                    <Route path={'/login'} exact element={<Login />} />
                    <Route path={'/register'} exact element={<Register />} />
                    <Route path={'/forget/:email'} exact element={<Forget />} />
                </Route>
            </Routes>
            <ProductPopup />
        </div>
    )
}

export default connect(null, {fetchAssets, createOrder, loadUser, changePlatform}) (App);
