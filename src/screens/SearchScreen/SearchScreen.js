import React, {useEffect, useState} from 'react';
import './SearchScreen.scss';
import {connect} from "react-redux";
import {fetchSearchResults, openSearchGallery, closeSearchGallery, changeSearchCategoryId, resetAllSearchData} from "../../store/actions/search.actions";
import Categories from "../Home/Body/BodyContainer/CategoriesBar/Categories";
import SpinnerComponent from "../../components/Spinner/Spinner.Component";
import Failure from "../Product/Provider/ProviderProducts/Failure/Failure";
import InfiniteScroll from "react-infinite-scroller";
import Loader from "../../components/Loader/Loader";
import {useTranslation} from "react-i18next";
import {Outlet, useNavigate, useParams} from "react-router-dom";
import {KeepAlive} from "react-activation";
import {closeGallery} from "../../store/actions/product.actions";
import {changeNavbarAssets} from "../../store/actions/ui.actions";
import DropDownListItem from "../../components/DropDownList/DropDownListItem/DropDownListItem";

const SearchScreen = ({
    assets,
    fetchSearchResults,
    lan,
    loadingCategories,
    categories,
    term,
    categoryId,
    loadingSearchResults,
    searchResults,
    changeSearchCategoryId,
    searchPage,
    more,
    filter,
    curId,
    changeNavbarAssets,
    setSearching
}) => {

    const [moreLoading, setMoreLoading] = useState(true);
    const [searchCount, setSearchCount] = useState(0);

    const {t} = useTranslation();
    const navigate = useNavigate();

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

    }, []);

    useEffect(() => {
        // console.log(curId)
        if(!loadingCategories && categories.length > 0 && (searchCount == 0 && searchResults.length == 0)) {
            changeSearchCategoryId(curId);
        }
    }, [categories]);

    useEffect(() => {
        setSearchCount(searchPage);
    }, []);

    useEffect(() => {
        if((!loadingCategories && curId !== null)) {
            setSearchCount(searchCount + 1);
            fetchSearchResults(lan, curId, filter, term, 0, navigate);
        }
    }, [term, curId]);

    useEffect(() => {
        setMoreLoading(more);
    }, [more]);

    useEffect(() => {
        const data = {
            searchPage: true,
            loadingSearchResults,
            searchResults,
            term,
            backBtn: true,
            step: null,
            setStep: null,
            search: true
        }
        changeNavbarAssets(data);

    }, [assets, searchResults, term, loadingSearchResults]);

    useEffect(() => {
        return () => {
            const data = {
                searchPage: false,
                term: '',
                backBtn: false,
                step: null,
                setStep: null,
                search: true
            };
            changeNavbarAssets(data);
        }
    }, []);

    useEffect(() => {
        setSearching(true);
        return () => {
            setSearching(false);
        }
    }, []);

    return (
        <>
            <KeepAlive>
                <div className={'SearchScreen'}>
                    {
                        !loadingCategories ? (
                            <InfiniteScroll
                                dataLength={searchResults.length}
                                pageStart={searchPage}
                                loadMore={() => {
                                    if(searchResults.length === 0 && searchPage === 0) return;
                                    if(!moreLoading) return;
                                    if(!more) return setMoreLoading(false);
                                    fetchSearchResults(lan, categoryId, filter, term, searchPage)
                                }}
                                hasMore={moreLoading}
                                loader={<Loader />}
                                useWindow={false}
                            >
                                <>
                                    <Categories loadingCategories={loadingCategories} categories={categories} curId={curId} search />
                                    {
                                        !loadingSearchResults ? (
                                            searchResults.length > 0 ? (
                                                    <div className={'SearchScreen__container'}>
                                                            {
                                                                searchResults.map((p, i) => (
                                                                    <>
                                                                        {/*<Provider search={true} link provider={p} key={p.id} openGallery={openSearchGallery} closeGallery={closeSearchGallery} galleryProduct={galleryProduct} />*/}
                                                                        {/*{*/}
                                                                        {/*    gallery && <Gallery product={galleryProduct} closeGallery={closeSearchGallery} openGallery={openSearchGallery} />*/}
                                                                        {/*}*/}
                                                                        <DropDownListItem term={term} result={p} />
                                                                    </>
                                                                ))
                                                            }
                                                    </div>
                                            ) : (
                                                <Failure search={true} text={t('there\'s no search results')} />
                                            )
                                        ) : (
                                            <SpinnerComponent />
                                        )
                                    }
                                </>
                            </InfiniteScroll>
                        ):(
                            <SpinnerComponent />
                        )
                    }
                </div>
            </KeepAlive>
            <Outlet />

        </>
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
    galleryProduct: state.search.searchGalleryProduct,
    searchPage: state.search.searchPage,
    more: state.search.more,
    filter: state.categories.filter,
    assets: state.assets,
    curId: state.categories.curId
});

export default connect(mapStateToProps, {changeNavbarAssets, fetchSearchResults, closeSearchGallery, openSearchGallery, changeSearchCategoryId, resetAllSearchData, closeGallery}) (React.memo(SearchScreen));