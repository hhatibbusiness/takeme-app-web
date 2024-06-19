import React, {lazy, Suspense, useEffect, useRef} from 'react';
// import Body from "./Body/Body";
import {connect} from "react-redux";
import {fetchCategories} from '../../store/actions/categories.action';
import './Home.scss';
import {useNavigate, useParams} from "react-router-dom";
import {changeHomePosition, changeNavbarAssets} from "../../store/actions/ui.actions";
import {KeepAlive} from "react-activation";
import SpinnerComponent from "../../components/Spinner/Spinner.Component";

const Body = lazy(() => import('./Body/Body'));

const Home = ({lan, match, currentProduct, coverLoaded, setCoverLoaded, setCurrentProduct, yPosition, setSidebar, searching, setSearching, sidebar, loadingCategoryProducts, changeNavbarAssets, changeHomePosition, fetchCategories, filter, categories}) => {
    const navigate = useNavigate();

    const homeRef = useRef();

    useEffect(() => {
        if(categories.length > 0) return;
        fetchCategories(lan, filter, navigate);
    }, []);
    const params = useParams();

    useEffect(() => {
        const data = {
            // assets: assets,
            setSidebar: null,
            searchPage: false,
            loadingSearchResults: null,
            searchResults: null,
            term: '',
            backBtn: false,
            step: null,
            setStep: null,
            search: !(params?.providerId || params?.id || window?.location?.href?.includes('contract') || window?.location?.href?.includes('about') || window?.location?.href?.includes('login') || window?.location?.href?.includes('register') || window?.location?.href?.includes('forget'))
        };
        changeNavbarAssets(data);
    }, []);

    return (
        <KeepAlive name={'home'}>
            <div ref={homeRef} className={'Home'}>
                <Suspense fallback={<SpinnerComponent />}>
                    <Body coverLoaded={coverLoaded} setCoverLoaded={setCoverLoaded} currentProduct={currentProduct} setCurrentProduct={setCurrentProduct} searching={searching} setSearching={setSearching} sidebar={sidebar} setSidebar={setSidebar} />
                </Suspense>
            </div>
        </KeepAlive>
    );
};

const mapStateToProps = state => ({
    lan: state.categories.lan,
    filter: state.categories.filter,
    categories: state.categories.categories,
    yPosition: state.ui.yPosition,
    loadingCategoryProducts: state.categories.loadingCategoryProducts
});

export default connect(mapStateToProps, {changeNavbarAssets, fetchCategories, changeHomePosition}) (React.memo(Home));