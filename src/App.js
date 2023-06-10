import logo from './logo.svg';
import './App.css';
import {Routes, Route} from "react-router-dom";
import Home from "./screens/Home/Home";
import {useEffect} from "react";
import {connect} from "react-redux";
import {fetchAssets} from "./store/actions/assets.actions";

const App = (props) => {
    useEffect(() => {
        props.fetchAssets();
    }, []);
    return (
        <div className={'App'}>
            <Routes>
                <Route path={'/'} exact element={<Home />} />
            </Routes>
        </div>
    )
}

export default connect(null, {fetchAssets}) (App);
