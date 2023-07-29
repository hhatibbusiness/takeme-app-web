import './App.scss';
import {Routes, Route} from "react-router-dom";
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

const App = (props) => {
    const {t} = useTranslation();
    useEffect(() => {
        props.fetchAssets();
        props.loadUser();
        // props.createOrder();
    }, []);
    return (
        <div className={'App'} style={{font: `${t('font')}`}}>
            <Routes history={history}>
                <Route path={'/'} exact element={<Home />} >
                    <Route path={'/product/:id'} exact element={<Product />} />
                    <Route path={'/provider/:providerId'} exact element={<ProviderScreen />} />
                    <Route path={'/search'} exact element={<SearchScreen />} />
                    <Route path={'/about'} exact element={<About />} />
                    <Route path={'/contract'} exact element={<Contract />} />
                    <Route path={'/login'} exact element={<Login />} />
                    <Route path={'/register'} exact element={<Register />} />
                </Route>
            </Routes>
        </div>
    )
}

export default connect(null, {fetchAssets, createOrder, loadUser}) (App);
