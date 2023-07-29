import React, {useEffect, useState} from 'react';
import './SearchScreen.scss';
import Navbar from "../../components/HOC/Navbar/Navbar";
import {connect} from "react-redux";
import {fetchSearchResults, openSearchGallery, closeSearchGallery, changeSearchCategoryId, resetAllSearchData} from "../../store/actions/search.actions";
import Categories from "../Home/Body/BodyContainer/CategoriesBar/Categories";
import SpinnerComponent from "../../components/Spinner/Spinner.Component";
import Provider from "../Product/Provider/Provider";
import Gallery from "../Product/Provider/ProviderProducts/ProviderProduct/Gallery/Gallery";
import Failure from "../Product/Provider/ProviderProducts/Failure/Failure";
import InfiniteScroll from "react-infinite-scroller";
import Loader from "../../components/Loader/Loader";
import {useTranslation} from "react-i18next";

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
    changeSearchCategoryId,
    resetAllSearchData,
    searchPage,
    more,
    filter
}) => {
    const [moreLoading, setMoreLoading] = useState(true);

    const {t} = useTranslation();

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
            fetchSearchResults(lan, categoryId, filter, term, 0);
        }

    }, [term, categoryId]);

    useEffect(() => {
        return () => {
            resetAllSearchData();
        }
    }, []);

    useEffect(() => {
        setMoreLoading(more);
    }, [more]);

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
                                    <InfiniteScroll
                                        dataLength={searchResults.length}
                                        pageStart={searchPage}
                                        loadMore={() => {
                                            if(searchResults.length === 0 && searchPage === 0) return;
                                            if(!moreLoading) return;
                                            if(!more) return setMoreLoading(false);
                                            fetchSearchResults(lan, categoryId, 'All', searchPage)
                                        }}
                                        hasMore={moreLoading}
                                        loader={<Loader />}
                                    >
                                        {
                                            searchResults.map((p, i) => (
                                                <>
                                                    <Provider link provider={p} key={p.id} openGallery={openSearchGallery}/>
                                                    {
                                                        gallery && <Gallery product={galleryProduct} closeGallery={closeSearchGallery} openGallery={openSearchGallery} />
                                                    }
                                                </>
                                            ))
                                        }
                                    </InfiniteScroll>
                                ): (
                                    <Failure text={t('there\'s no search results')} />
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
    galleryProduct: state.search.searchGalleryProduct,
    searchPage: state.search.searchPage,
    more: state.search.more,
    filter: state.categories.filter
});

export default connect(mapStateToProps, {fetchSearchResults, closeSearchGallery, openSearchGallery, changeSearchCategoryId, resetAllSearchData}) (SearchScreen);