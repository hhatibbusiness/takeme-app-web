import React, {useEffect, useRef, useState} from 'react';
import Intro from "../../components/Intro/Intro";
import Body from "./Body/Body";
import {connect} from "react-redux";
import {fetchCategories} from '../../store/actions/categories.action';
import './Home.scss';
import {useNavigate, useParams} from "react-router-dom";
import {changeHomePosition, changeNavbarAssets} from "../../store/actions/ui.actions";
import smoothscroll from "smoothscroll-polyfill";

const Home = ({lan, yPosition, setSidebar, searching, setSearching, sidebar, loadingCategoryProducts, changeNavbarAssets, changeHomePosition, fetchCategories, filter, categories}) => {
    const [logoStart, setLogoStart] = useState(performance.getEntriesByType('navigation')[0].type != 'reload' ? null : localStorage.getItem('takemeFirstVisit'));
    const navigate = useNavigate();

    const homeRef = useRef();

    // useEffect(() => {
    //     let timeOut;
    //     console.log('Hello there!', logoStart, localStorage.getItem('takemeFirstVisit'));
    //     if(logoStart != '1') {
    //     // if(true){
    //         console.log('Hello from intro');
    //         timeOut = setTimeout(() => {
    //             setLogoStart(1);
    //             localStorage.setItem("takemeFirstVisit", 1);
    //         }, 100000);
    //     }
    //     return () => {
    //         clearTimeout(timeOut);
    //     }
    // }, []);
    //
    // useEffect(() => {
    //     console.log(performance.getEntriesByType('navigation'));
    //     return () => {
    //         localStorage.setItem('navigation', JSON.stringify(performance.getEntriesByType('navigation')[0]))
    //     }
    // }, []);

    // useEffect(() => {
    //     smoothscroll.polyfill();
    //     const handleBeforeUnload = e => {
    //         if(performance.navigation.type === 0) {
    //             setLogoStart(null);
    //             localStorage.removeItem('takemeFirstVisit');
    //         }
    //         console.log('Hello from the closed page!');
    //         alert('Hello There!');
    //     }
    //     window.addEventListener('beforeunload', handleBeforeUnload);
    //     return () => {
    //         window.removeEventListener('beforeunload', handleBeforeUnload)
    //     }
    // }, []);

    // useEffect(() => {
    //     localStorage.setItem("takemeFirstVisit", 1);
    // }, []);

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
        // console.log(data);
        changeNavbarAssets(data);
    }, []);

    return (
        <div ref={homeRef} className={'Home'}>
            <Body searching={searching} setSearching={setSearching} sidebar={sidebar} setSidebar={setSidebar} />
        </div>
    );
};

const mapStateToProps = state => ({
    lan: state.categories.lan,
    filter: state.categories.filter,
    categories: state.categories.categories,
    yPosition: state.ui.yPosition,
    loadingCategoryProducts: state.categories.loadingCategoryProducts
})

export default connect(mapStateToProps, {changeNavbarAssets, fetchCategories, changeHomePosition}) (Home);