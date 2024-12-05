import React, {useEffect, useState} from 'react';
import { useLocalesContext } from '../../context/locales.context';
import LocalesShimmer from '../../components/ItemsShimmer/ItemsShimmer';
import ItemsList from '../../components/ItemsList/ItemsList';
import './Locales.css';

const Locales = ({ setBackBtn, setAdmin }) => {
    const { locales, fetchLocales, searchLocales, deleteLocale } = useLocalesContext();
    const [paddingTop, setPaddingTop] = useState(0);

    useEffect(() => {
        setBackBtn(true);
        setAdmin(true);
        return () => {
            setBackBtn(false);
            setAdmin(false);
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
            lan: 'ar',
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
                lan: 'ar',
                localeId: id
            },
            deleteFun: deleteLocale,
            isItem: true,
            deleting: locales?.deleting
        }),
        isSearching: locales.search,
        dots: true
    }

    const itemsListPropsSearch = {
        itemsFun: searchLocales,
        page: locales.searchResultsPage,
        more: locales.moreSearchResults,
        items: locales.searchResults,
        paginationData: {
            lan: 'ar',
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
                lan: 'ar',
                localeId: id
            },
            deleteFun: deleteLocale,
            isItem: true,
            deleting: locales?.deleting
        }),
        isSearching: locales.search,
        dots: true
    }

    return (
        <div className="Locales" style={{paddingTop: `${paddingTop}px`}}>
            <div className='Locales__container'>
                {
                    locales.search ? (
                        locales.searching ? (
                            <LocalesShimmer />
                        ) : (
                            <ItemsList window={true} {...itemsListPropsSearch} />
                        )
                    ) : (
                        locales.fetchingLocales ? (
                            <LocalesShimmer />
                        ) : (
                            <ItemsList window={true} {...itemsListPropsMain} />
                        )
                    )
                }
            </div>
        </div>
    )
}

export default Locales;