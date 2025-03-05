import React, {useEffect, useState, useRef} from 'react';
import { connect } from 'react-redux';
import LocalesShimmer from '../../components/ItemsShimmer/ItemsShimmer';
import ItemsList from '../../components/ItemsList/ItemsList';
import './Locales.css';
import { fetchLocales, searchLocales, deleteLocale } from '../../store/actions/locales.actions';
import KeepAlive from 'react-activation';
import {changeBackBtnState} from "../../store/actions/navbar.actions";

const Locales = ({ changeBackBtnState, setBackBtn, setAdmin, locales, fetchLocales, searchLocales, deleteLocale }) => {
    const [paddingTop, setPaddingTop] = useState(105);
    const parentRef = useRef(null);
    
    useEffect(() => {
        setAdmin(true);
        changeBackBtnState(true);
        return () => {
            setAdmin(false);
            changeBackBtnState(false);
        }
    }, []);

    const navbarGetter = document.querySelector('.Navbar');

    useEffect(() => {
        if(navbarGetter) {
            setPaddingTop(navbarGetter.getBoundingClientRect().height);
        }
    });

    const itemsListPropsMain = {
        itemsFun: fetchLocales,
        page: locales.page,
        more: locales.more,
        items: locales.locales,
        paginationData: {
            lan: 'ar_SA',
            page: locales.page,
            sortType: locales.sortType,
            searchKey: locales.searchKey
        },
        displayName: 'locale',
        searchKey: locales.searchKey,
        dotsProps: id =>  ({
            urls: {
                addUrl: `/locales/add/duplicate/${id}`,
                editUrl: `/locales/edit/${id}`,
            },
            deleteData: {
                lan: 'ar_SA',
                localeId: id
            },
            deleteFun: deleteLocale,
            isItem: true,
            deleting: locales?.deleting
        }),
        isSearching: locales.search,
        dots: true,
        parentScroller: parentRef.current
    }

    const itemsListPropsSearch = {
        itemsFun: searchLocales,
        page: locales.searchResultsPage,
        more: locales.moreSearchResults,
        items: locales.searchResults,
        paginationData: {
            lan: 'ar_SA',
            page: locales.searchResultsPage,
            sortType: locales.sortType,
            searchKey: locales.searchKey
        },
        displayName: 'locale',
        searchKey: locales.searchKey,
        dotsProps: id =>  ({
            urls: {
                addUrl: `/locales/add/duplicate/${id}`,
                editUrl: `/locales/edit/${id}`
            },
            deleteData: {
                lan: 'ar_SA',
                localeId: id
            },
            deleteFun: deleteLocale,
            isItem: true,
            deleting: locales?.deleting
        }),
        isSearching: locales.search,
        dots: true,
        parentScroller: parentRef.current
    }

    return (
        <KeepAlive>
            <div className='Locales_body' ref={parentRef} style={{paddingTop: `${paddingTop}px`}}>
                {
                    locales.search ? (
                        locales.searching ? (
                            <LocalesShimmer />
                        ) : (
                            <ItemsList window={false} {...itemsListPropsSearch} />
                        )
                    ) : (
                        locales.fetchingPlaces ? (
                            <LocalesShimmer />
                        ) : (
                            <ItemsList window={false}  {...itemsListPropsMain} />
                        )
                    )
                }
            </div>
        </KeepAlive>
    )
}

const mapStateToProps = state => ({
    locales: state.locales
});

export default connect(mapStateToProps, { changeBackBtnState, fetchLocales, searchLocales, deleteLocale })(Locales);