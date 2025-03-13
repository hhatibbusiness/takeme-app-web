import React, {useEffect, useRef, useState} from 'react';
import { useCountriesContext } from '../../context/countries.context';
import CountriesShimmer from '../../components/ItemsShimmer/ItemsShimmer';
import ItemsList from '../../components/ItemsList/ItemsList';
import './Countries.css';
import {connect} from "react-redux";
import {fetchCountries, editCountry, deleteCountry, searchCountries} from "../../store/actions/countries.actions";

const Countries = ({ fetchCountries, editCountry, searchCountries, deleteCountry, setAdmin, countries }) => {
    const [paddingTop, setPaddingTop] = useState(105);

    const parentRef = useRef(null);

    useEffect(() => {
        setAdmin(true);
        return () => {
            setAdmin(false);
        }
    }, []);

    const navbarGetter = document.querySelector('.Navbar');

    useEffect(() => {
        if(navbarGetter) {
            setPaddingTop(navbarGetter.getBoundingClientRect().height);
        }
    });

    useEffect(() => {
        const data = {
            lan: 'ar_SA',
            page: 0,
            sortType: 'NEWEST',
        };

        if(countries.countries.length > 0) return;

        fetchCountries(data);
    }, []);

    const itemsListPropsSearch = {
        itemsFun: searchCountries || (() => {}),
        page: countries.searchResultsPage || 0,
        more: countries.moreSearchResults ,
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
        more: countries.more,
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
                        <ItemsList window={false} {...itemsListPropsSearch} />
                    )
                ) : (
                    countries.fetchingCountries ? (
                        <CountriesShimmer />
                    ) : (
                        <ItemsList window={false}  {...itemsListPropsMain} />
                    )
                )
            }
        </div>
    )
}

const mapStateToProps = state => ({
    countries: state.countries
})

export default connect(mapStateToProps, {searchCountries, fetchCountries, editCountry, deleteCountry}) (Countries);