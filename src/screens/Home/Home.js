import React, {lazy, Suspense, useEffect, useRef} from 'react';
// import Body from "./Body/Body";
import {connect} from "react-redux";
import {fetchCategories} from '../../store/actions/categories.action';
import './Home.scss';
import {Outlet, useNavigate, useParams} from "react-router-dom";
import {changeHomePosition, changeNavbarAssets} from "../../store/actions/ui.actions";
import {KeepAlive} from "react-activation";
import SpinnerComponent from "../../components/Spinner/Spinner.Component";
import FallBack from "../../components/FallBack/FallBack";
import Intro from "../../components/Intro/Intro";

const Body = lazy(() => import('./Body/Body'));

const Home = ({lan, match, setY, currentParams, setCurrentParams, y, fixedNav, setFixedNav, topValue, setTopValue, setNavHeight, bodyContainerRef, considerNav, setConsiderNav, navHeight, navShow, setNavShow, setFiltersActive, filtersActive, currentProduct, coverLoaded, setCoverLoaded, setCurrentProduct, yPosition, setSidebar, searching, setSearching, sidebar, loadingCategoryProducts, changeNavbarAssets, changeHomePosition, fetchCategories, filter, categories}) => {
    const navigate = useNavigate();

    const homeRef = useRef();

    useEffect(() => {
        if(categories.length > 0) return;
        fetchCategories(lan, filter, navigate, 0);
    }, []);

    const params = useParams();

    useEffect(() => {
        setCurrentParams(prevParams => {
            if (JSON.stringify(prevParams) !== JSON.stringify(params)) {
                return params; // Update only if params have changed
            }
            return prevParams
        })
    }, [params]);

    // useEffect(() => {
    //     const data = {
    //         // assets: assets,
    //         setSidebar: null,
    //         searchPage: false,
    //         loadingSearchResults: null,
    //         searchResults: null,
    //         term: '',
    //         backBtn: false,
    //         step: null,
    //         setStep: null,
    //         search: !(params?.providerId || params?.id || window?.location?.href?.includes('contract') || window?.location?.href?.includes('about') || window?.location?.href?.includes('login') || window?.location?.href?.includes('register') || window?.location?.href?.includes('forget'))
    //     };
    //     changeNavbarAssets(data);
    // }, []);

    return (
        <>
            {/*<KeepAlive name={'home'}>*/}
                <div ref={homeRef} className={'Home'}>
                    <Suspense fallback={<FallBack full={true} />}>
                        <Body y={y} setY={setY} fixedNav={fixedNav} topValue={topValue} setTopValue={setTopValue} setFixedNav={setFixedNav} bodyContainerRef={bodyContainerRef} considerNav={considerNav} setConsiderNav={setConsiderNav} setNavHeight={setNavHeight} navShow={navShow} setNavShow={setNavShow} filtersActive={filtersActive} setFiltersActive={setFiltersActive} navHeight={navHeight} coverLoaded={coverLoaded} setCoverLoaded={setCoverLoaded} currentProduct={currentProduct} setCurrentProduct={setCurrentProduct} searching={searching} setSearching={setSearching} sidebar={sidebar} setSidebar={setSidebar} />
                    </Suspense>
                </div>
            {/*</KeepAlive>*/}
            <Outlet />
        </>
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