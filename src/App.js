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

const App = (props) => {
    useEffect(() => {
        props.fetchAssets();
    }, []);
    return (
        <div className={'App'}>
            <Routes history={history}>
                <Route path={'/'} exact element={<Home />} >
                    <Route path={'/product/:id'} exact element={<Product />} />
                    <Route path={'/provider/:providerId'} exact element={<ProviderScreen />} />
                    <Route path={'/search'} exact element={<SearchScreen />} />
                </Route>
            </Routes>
        </div>
    )
}

export default connect(null, {fetchAssets}) (App);
