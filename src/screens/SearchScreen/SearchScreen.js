import React, {useEffect, useState} from 'react';
import './SearchScreen.scss';
import Navbar from "../../components/HOC/Navbar/Navbar";
import {connect} from "react-redux";
import {fetchSearchResults, openSearchGallery, closeSearchGallery, changeSearchCategoryId} from "../../store/actions/search.actions";
import Categories from "../Home/Body/BodyContainer/CategoriesBar/Categories";
import SpinnerComponent from "../../components/Spinner/Spinner.Component";
import Provider from "../Product/Provider/Provider";
import Gallery from "../Product/Provider/ProviderProducts/ProviderProduct/Gallery/Gallery";
import Failure from "../Product/Provider/ProviderProducts/Failure/Failure";

const SearchScreen = ({
    fetchSearchResults,
    lan,
    loadingCategories,
    categories,
    term,
    categoryId,
    loadingSearchResults,
    searchResults,
    galleryProduct,
    gallery,
    closeSearchGallery,
    openSearchGallery,
    changeSearchCategoryId
}) => {
    useEffect(() => {
        const home = document.querySelector('body');
        const freezeStyles = () => {
            home.classList.add('Home__hide')
        }
        const releaseStyles = () => {
            home.classList.remove('Home__hide');
        }

        freezeStyles();

        return () => {
            releaseStyles();

        }
    }, []);

    useEffect(() => {
        if(!loadingCategories && categories.length > 0) {
            changeSearchCategoryId(categories[0]?.id && categories[0].id);
        }
    }, [categories]);

    useEffect(() => {
        if(!loadingCategories && categoryId) {
            fetchSearchResults(lan, categoryId, 'All', term, 0);
        }
    }, [term, categoryId]);

    return (
        <div className={'SearchScreen'}>
            <Navbar backBtn={true} search/>
            {
                !loadingCategories ? (
                    <>
                        <Categories search />
                        {
                            !loadingSearchResults ? (
                                searchResults.length > 0 ? (
                                    searchResults.map((p, i) => (
                                        <>
                                            <Provider link provider={p} key={p.id} openGallery={openSearchGallery}/>
                                            {
                                                gallery && <Gallery product={galleryProduct} closeGallery={closeSearchGallery} openGallery={openSearchGallery} />
                                            }
                                        </>
                                    ))
                                ): (
                                    <Failure />
                                )
                            ) : (
                                <SpinnerComponent />
                            )
                        }
                    </>
                ):(
                    <SpinnerComponent />
                )
            }
        </div>
    );
};

const mapStateToProps = state => ({
    lan: state.categories.lan,
    loadingCategories: state.categories.loadingCategories,
    categories: state.categories.categories,
    term: state.search.term,
    categoryId: state.search.categoryId,
    loadingSearchResults: state.search.loadingSearchResults,
    searchResults: state.search.results,
    gallery: state.search.searchGalleryOpen,
    galleryProduct: state.search.searchGalleryProduct
});

export default connect(mapStateToProps, {fetchSearchResults, closeSearchGallery, openSearchGallery, changeSearchCategoryId}) (SearchScreen);