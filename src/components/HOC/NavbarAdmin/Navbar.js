import React, { useState } from 'react';
import './Navbar.css';
import Logo from './Logo/Logo';
import { useDetailsContext } from '../../../context/details.context';
import logoDefaultImage from '../../../assets/defaults/logo-default-image.svg';
import MidText from './MidText/MidText';
import Backbtn from './Backbtn/Backbtn';
import SubBar from './SubBar/SubBar';
import { useNavbarContext } from '../../../context/navbar.context';
import { useLocation } from 'react-router-dom';
import { useLocalesContext } from '../../../context/locales.context';
import {connect} from "react-redux";
import {searchLanguages, closeSearch, openSearch, deleteLanguage, changeSortType} from "../../../store/actions/languages.actions";
import {searchCountries, fetchCountries, closeSearchCountries, openSearchCountries } from "../../../store/actions/countries.actions";
import {searchPlaces, fetchPlaces, closeSearchPlaces, openSearchPlaces} from '../../../store/actions/places.actions';


const Navbar = ({
        openSearchCountries, countries, searchCountries, closeSearchCountries, 
        languages, searchLanguages, closeSearch, openSearch, changeSortType,
        openSearchPlaces, places, searchPlaces, closeSearchPlaces
    }) => {
    
    const { details } = useDetailsContext();
    const { state } = useNavbarContext();
    const { locales, searchLocales, closeLocalesSearch, openLocalesSearch, changeLocalesSort } = useLocalesContext();
    const [searchTerm, setSearchTerm] = useState('');
    const location = useLocation();

    const subBarProps = () => {
        if (location.pathname.includes('language')) {
            return {
                searchFun: searchLanguages,
                isSearching: languages.search,
                fetchingSearchResults: languages.searching,
                closeSearch: closeSearch, 
                openSearch: openSearch,
                searchTerm,
                setSearchTerm,
                sortType: languages.sortType,
                urls: {
                    addUrl: '/languages/add'
                },
                changeSort: changeSortType,
                baseData: (e) => {
                    return {
                        lan: 'ar',
                        searchKey: e?.target?.value || '',
                        sortType: languages.sortType,
                        page: 0
                    }
                },
                hasSort: true
            }
        } else if (location.pathname.includes('locale')) {
            return {
                searchFun: searchLocales,
                isSearching: locales.search,
                fetchingSearchResults: locales.searching,
                closeSearch: closeLocalesSearch, 
                openSearch: openLocalesSearch,
                searchTerm,
                setSearchTerm,
                sortType: locales.sortType,
                urls:  {
                    addUrl: '/locales/add'
                },
                changeSort: changeLocalesSort, 
                baseData: (e) => {
                    return {
                        lan: 'ar',
                        searchKey: e?.target?.value || '',
                        sortType: locales.sortType,
                        page: 0
                    }
                },
                hasSort: true

            }
        } else if (location.pathname.includes('countries')) {
            return {
                searchFun: searchCountries,
                isSearching: countries.search,
                fetchingSearchResults: countries.searching,
                closeSearch: closeSearchCountries, 
                openSearch: openSearchCountries,
                searchTerm,
                setSearchTerm,
                sortType: null,
                urls:  {
                    addUrl: '/countries/add'
                },
                changeSort: null, 
                baseData: (e) => {
                    return {
                        lan: 'ar',
                        searchKey: e?.target?.value || '',
                        page: 0
                    }
                },
                hasSort: false
            }
        } else if (location.pathname.includes('places')) {
            return {
                searchFun: searchPlaces,
                isSearching: places.search,
                fetchingSearchResults: places.searching,
                closeSearch: closeSearchPlaces, 
                openSearch: openSearchPlaces,
                searchTerm,
                setSearchTerm,
                sortType: null,
                urls:  {
                    addUrl: '/places/add'
                },
                changeSort: null, 
                baseData: (e) => {
                    return {
                        lan: 'ar',
                        searchKey: e?.target?.value || '',
                        page: 0
                    }
                },
                hasSort: false
            }
        }
    }

    return (
        <div className='Navbar'>
            <div className='Navbar__container'>
                <Logo imgUrl={details.logoPath || logoDefaultImage} />
                <MidText />
                <Backbtn backURL={state.searchActive ? '/' : -1} />
            </div>
            {
                state.searchActive && (
                    <SubBar {...subBarProps()} />
                )
            }
        </div>
    )
}

const mapStateToProps = state => ({
    languages: state.languages,
    countries: state.countries,
    places: state.places
})

export default connect(mapStateToProps, {
        openSearchCountries, closeSearchCountries, fetchCountries, searchCountries, 
        closeSearch, openSearch, deleteLanguage, changeSortType, searchLanguages,
        searchPlaces, closeSearchPlaces, openSearchPlaces, fetchPlaces,
    }) (Navbar);