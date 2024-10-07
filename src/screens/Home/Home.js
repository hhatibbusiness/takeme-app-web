import React, {lazy, Suspense, useEffect, useRef} from 'react';
import {connect} from "react-redux";
import {fetchCategories} from '../../store/actions/categories.action';
import './Home.scss';
import {Outlet, useNavigate, useParams} from "react-router-dom";
import {changeHomePosition, changeNavbarAssets} from "../../store/actions/ui.actions";
import FallBack from "../../components/FallBack/FallBack";

const Body = lazy(() => import('./Body/Body'));

const Home = ({lan, setY, setCurrentParams, y, fixedNav, setFixedNav, topValue, setTopValue, setNavHeight, bodyContainerRef, considerNav, setConsiderNav, navHeight, navShow, setNavShow, setFiltersActive, filtersActive, currentProduct, coverLoaded, setCoverLoaded, setCurrentProduct, setSidebar, searching, setSearching, sidebar, fetchCategories, filter, categories}) => {
    const navigate = useNavigate();

    const homeRef = useRef();

    //This will fetch categories if there are no categories in the store.
    useEffect(() => {
        if(categories.length > 0) return;
        fetchCategories(lan, filter, navigate, 0);
    }, []);

    const params = useParams();

    //This will make the state change when the the state when the params changes.
    useEffect(() => {
        setCurrentParams(prevParams => {
            if (JSON.stringify(prevParams) !== JSON.stringify(params)) {
                return params; // Update only if params have changed
            }
            return prevParams
        })
    }, [params]);

    return (
        <>
            <div ref={homeRef} className={'Home'}>
                <Suspense fallback={<FallBack full={true} />}>
                    <Body y={y} setY={setY} fixedNav={fixedNav} topValue={topValue} setTopValue={setTopValue} setFixedNav={setFixedNav} bodyContainerRef={bodyContainerRef} considerNav={considerNav} setConsiderNav={setConsiderNav} setNavHeight={setNavHeight} navShow={navShow} setNavShow={setNavShow} filtersActive={filtersActive} setFiltersActive={setFiltersActive} navHeight={navHeight} coverLoaded={coverLoaded} setCoverLoaded={setCoverLoaded} currentProduct={currentProduct} setCurrentProduct={setCurrentProduct} searching={searching} setSearching={setSearching} sidebar={sidebar} setSidebar={setSidebar} />
                </Suspense>
            </div>
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