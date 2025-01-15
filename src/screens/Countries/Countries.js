import React, {useEffect, useRef, useState} from 'react';
import { useCountriesContext } from '../../context/countries.context';
import CountriesShimmer from '../../components/ItemsShimmer/ItemsShimmer';
import ItemsList from '../../components/ItemsList/ItemsList';
import './Countries.css';

const Countries = ({ setBackBtn, setAdmin }) => {
    const { countries, fetchCountries, searchCountries, deleteCountry } = useCountriesContext();
    const [paddingTop, setPaddingTop] = useState(0);

    const parentRef = useRef(null);

    useEffect(() => {
        setAdmin(true);
        setBackBtn(true);
        return () => {
            setAdmin(false);
            setBackBtn(false);
        }
    }, []);

    const navbarGetter = document.querySelector('.Navbar');

    useEffect(() => {
        if(navbarGetter) {
            setPaddingTop(navbarGetter.getBoundingClientRect().height);
        }

        console.log(countries);
    });


    const itemsListPropsSearch = {
        itemsFun: searchCountries || (() => {}),
        page: countries.searchResultsPage || 0,
        more: countries.moreSearchResults || true,
        items: countries.searchResults || [],
        paginationData: {
            lan: 'ar_SA',
            page: countries.searchResultsPage,
            searchKey: countries.searchKey
        },
        displayName: 'translations.fields.value',
        searchKey: countries.searchKey,
        dots: true,
        dotsProps: id =>  ({
            urls: {
                addUrl: `/countries/add/duplicate/${id}`,
                editUrl: `/countries/edit/${id}`
            },
            deleteData: {
                lan: 'ar_SA',
                countryId: id
            },
            deleteFun: deleteCountry,
            isItem: true,
            deleting: countries?.deleting
        }),
        isSearching: countries.search,
        parentScroller: parentRef.current
    }

    const itemsListPropsMain = {
        itemsFun: fetchCountries || (() => {}),
        page: countries.page || 0,
        more: countries.more || true,
        items: countries.countries || [],
        paginationData: {
            lan: 'ar_SA',
            page: countries.page,
            searchKey: countries.searchKey
        },
        displayName: 'translations.fields.value',
        searchKey: countries.searchKey,
        dots: true,
        dotsProps: id =>  ({
            urls: {
                addUrl: `/countries/add/duplicate/${id}`,
                editUrl: `/countries/edit/${id}`,
            },
            deleteData: {
                lan: 'ar_SA',
                countryId: id
            },
            deleteFun: deleteCountry,
            isItem: true,
            deleting: countries?.deleting
        }),
        isSearching: countries.search,
        parentScroller: parentRef.current
    }

    return (
        <div id={'Countries'} className='Countries' ref={parentRef} style={{paddingTop: `${paddingTop}px`}}>
            {
                countries.search ? (
                    countries.searching ? (
                        <CountriesShimmer />
                    ) : (
                        <ItemsList window={true} {...itemsListPropsSearch} />
                    )
                ) : (
                    countries.fetchingCountries ? (
                        <CountriesShimmer />
                    ) : (
                        <ItemsList window={true}  {...itemsListPropsMain} />
                    )
                )
            }
        </div>
    )
}

export default Countries;