import React, {useEffect, useState} from 'react';
import { useCountriesContext } from '../../context/countries.context';
import CountriesShimmer from '../../components/ItemsShimmer/ItemsShimmer';
import ItemsList from '../../components/ItemsList/ItemsList';
import './Countries.css';

const Countries = ({ setBackBtn, setAdmin }) => {
    const { countries, fetchCountries, searchCountries, deleteCountry } = useCountriesContext();
    const [paddingTop, setPaddingTop] = useState(0);

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
    });


    const itemsListPropsSearch = {
        itemsFun: searchCountries,
        page: countries.searchResultsPage,
        more: countries.moreSearchResults,
        items: countries.searchResults,
        paginationData: {
            lan: 'ar',
            page: countries.searchResultsPage,
            searchKey: countries.searchKey
        },
        displayName: 'countryName',
        searchKey: countries.searchKey,
        dotsProps: id =>  ({
            urls: {
                addUrl: `/countries/add/duplicate/${id}`,
                editUrl: `/countries/edit/${id}`
            },
            deleteData: {
                lan: 'ar',
                countryId: id
            },
            deleteFun: deleteCountry,
            isItem: true,
            deleting: countries?.deleting
        }),
        isSearching: countries.search
    }

    const itemsListPropsMain = {
        itemsFun: fetchCountries,
        page: countries.page,
        more: countries.more,
        items: countries.countries,
        paginationData: {
            lan: 'ar',
            page: countries.page,
            searchKey: countries.searchKey
        },
        displayName: 'translations.fields.value',
        searchKey: countries.searchKey,
        dotsProps: id =>  ({
            urls: {
                addUrl: `/countries/add/duplicate/${id}`,
                editUrl: `/countries/edit/${id}`,
            },
            deleteData: {
                lan: 'ar',
                countryId: id
            },
            deleteFun: deleteCountry,
            isItem: true,
            deleting: countries?.deleting
        }),
        isSearching: countries.search
    }

    return (
        <div className='Countries' style={{paddingTop: `${paddingTop}px`}}>
            {
                countries.search ? (
                    countries.searching ? (
                        <CountriesShimmer />
                    ) : (
                        <ItemsList window={true} {...itemsListPropsSearch} />
                    )
                ): (
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