import React, {useCallback, useEffect, useRef, useState} from 'react';
import './SearchScreen.scss';
import {connect} from "react-redux";
import {fetchSearchResults, openSearchGallery, closeSearchGallery, changeSearchCategoryId, resetAllSearchData} from "../../store/actions/search.actions";
import SpinnerComponent from "../../components/Spinner/Spinner.Component";
import Failure from "../Product/Provider/ProviderProducts/Failure/Failure";
import InfiniteScroll from "react-infinite-scroller";
import {useTranslation} from "react-i18next";
import {Outlet, useNavigate, useParams} from "react-router-dom";
import {KeepAlive} from "react-activation";
import {closeGallery} from "../../store/actions/product.actions";
import {changeNavbarAssets} from "../../store/actions/ui.actions";
import DropDownListItem from "../../components/DropDownList/DropDownListItem/DropDownListItem";
import {fetchProviderCategories} from "../../store/actions/provider.actions";
import SearchShimmer from "../../components/SearchShimmer/SearchShimmer";
import {changeBackBtnState} from "../../store/actions/navbar.actions";

const SearchScreen = ({
      changeBackBtnState,
    setShowItemTypes,
    backupFilters,
    setBackupFilters,
    filtersActive,
    setFiltersActive,
    bodyContainerRef,
    topValue,
    setTopValue,
    showSlider,
    setShowSlider,
    setIconsShow,
    setSearchShow,
    setBackBtn,
    navHeight,
    setShowEye,
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
    setSearching,
    catId,
  fetchProviderCategories
}) => {
    const [moreLoading, setMoreLoading] = useState(true);
    const [searchCount, setSearchCount] = useState(0);
    const [y, setY] = useState(null);
    const [loading, setLoading] = useState(false);

    const {t} = useTranslation();
    const navigate = useNavigate();
    const searchRef = useRef();
    const searchContainerRef = useRef();
    const params = useParams();

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
        setBackupFilters(filtersActive);
        setShowEye(false);
        changeBackBtnState(true);
        setSearchShow(true);
        setIconsShow(false);
        setShowSlider(false);
        setFiltersActive(true);
        setShowItemTypes(false);
        return () => {
            setFiltersActive(backupFilters);
            changeBackBtnState(false);
            setShowEye(true);
            setSearchShow(false);
            setIconsShow(true);
            setShowSlider(true);
            setShowItemTypes(true);
        }
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
            fetchSearchResults(lan, params.storeId ? (catId || 0) : curId, filter, term, 0, navigate, params.storeId ? [params.storeId] : [null]);
        }
    }, [term, curId, catId]);

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

    const handleWindowScroll = useCallback( e => {
        const container = bodyContainerRef.current;
        const searchContainer = searchRef.current;
        const searchContainerEle = searchContainerRef?.current;
        const top = Math.abs(searchContainerEle.getBoundingClientRect()?.top);

        if(Math.floor(y) > Math.floor(top)) {
            setY(top);
            if(topValue + (y - top) > 0) {
                return setTopValue(0);
            }
            setTopValue(topValue + (y - top));
        } else if(Math.floor(y) < Math.floor(top)) {
            if(top - y > Math.abs(navHeight) - Math.abs(topValue)) {
                setY(top);
                return setTopValue(-navHeight);
            };
            if(top - y + topValue < -navHeight) {
                setY(top);
                return setTopValue(-navHeight);
            };
            setTopValue(topValue - (top - y));
            setY(top);
        }
    }, [y]);

    useEffect(() => {
        if(params.storeId) {
            const data = {
                providerId: params.storeId,
                lan
            };

            fetchProviderCategories(data);
        }
    }, []);

    useEffect(() => {
        const container = bodyContainerRef.current;
        const searchContainer = searchRef?.current;
        const searchContainerEle = searchContainerRef?.current;
        if(container && searchContainer && searchContainerEle) {
            console.log(Math.abs(searchContainerEle.getBoundingClientRect()?.top))

            setY(Math.abs(searchContainerEle.getBoundingClientRect()?.top));
            searchContainer.addEventListener('scroll', handleWindowScroll);
        }
        return () => {
            searchContainer?.removeEventListener('scroll', handleWindowScroll);
        }
    }, [handleWindowScroll, bodyContainerRef.current, searchRef?.current, searchContainerRef?.current]);

    return (
        <>
            <KeepAlive>
                <div ref={searchRef} className={'SearchScreen'}>
                    {
                        !loadingCategories ? (
                            <InfiniteScroll
                                className={'SearchScreen__list'}
                                dataLength={searchResults.length}
                                pageStart={searchPage}
                                loadMore={async () => {
                                    if(searchResults.length === 0 && searchPage === 0) return;
                                    if(loadingSearchResults) return;
                                    if(!moreLoading) return;
                                    setLoading(true);
                                    if(loading) return;
                                    if(!more) return setMoreLoading(false);
                                    await fetchSearchResults(lan, params.storeId ? (catId || 0) : curId, filter, term, searchPage, navigate, params.storeId ? [params.storeId] : [null])
                                    setLoading(false);
                                }}
                                hasMore={moreLoading}
                                loader={<SearchShimmer />}
                                useWindow={false}
                            >
                                <>
                                    {
                                        !loadingSearchResults ? (
                                            searchResults.length > 0 ? (
                                                    <div ref={searchContainerRef} style={{paddingTop: `${navHeight}px`}} className={'SearchScreen__container'}>
                                                            {
                                                                searchResults.map((p, i) => (
                                                                    <>
                                                                        <DropDownListItem term={term} result={p} />
                                                                    </>
                                                                ))
                                                            }
                                                    </div>
                                            ) : (
                                                <Failure search={true} text={t('there\'s no search results')} />
                                            )
                                        ) : (
                                            <SearchShimmer topValue={navHeight} />
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
    curId: state.categories.curId,
    catId: state.provider.curId
});

export default connect(mapStateToProps, {changeBackBtnState, fetchProviderCategories, changeNavbarAssets, fetchSearchResults, closeSearchGallery, openSearchGallery, changeSearchCategoryId, resetAllSearchData, closeGallery}) (React.memo(SearchScreen));