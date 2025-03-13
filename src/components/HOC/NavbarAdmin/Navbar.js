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
import {connect} from "react-redux";
import {searchLanguages, closeSearch, openSearch, deleteLanguage, changeLanguagesSort} from "../../../store/actions/languages.actions";
import {searchCountries, fetchCountries, closeSearchCountries, openSearchCountries } from "../../../store/actions/countries.actions";
import {searchPlaces, fetchPlaces, closeSearchPlaces, openSearchPlaces, changePlacesSortType} from '../../../store/actions/places.actions';
import {searchLocales, closeLocalesSearch, openLocalesSearch, changeLocalesSort } from '../../../store/actions/locales.actions';
import {fetchRoles, changeRolesSortType} from "../../../store/actions/roles.actions";

const Navbar = ({
        openSearchCountries, countries, searchCountries, closeSearchCountries, 
        languages, searchLanguages, closeSearch, openSearch, changeLanguagesSort,
        openSearchPlaces, places, searchPlaces, closeSearchPlaces, changePlacesSortType,
        locales, searchLocales, closeLocalesSearch, openLocalesSearch, changeLocalesSort,
        fetchRoles, roles, changeRolesSortType
    }) => {
    
    const { details } = useDetailsContext();
    const { state } = useNavbarContext();
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
                hasSearch: true,
                searchTerm,
                setSearchTerm,
                sortType: languages.sortType,
                urls: {
                    addUrl: '/languages/add'
                },
                changeSort: changeLanguagesSort,
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
                hasSearch: true,
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
                hasSearch: true,
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
                hasSearch: true,
                searchTerm,
                setSearchTerm,
                sortType: places.sortType,
                urls:  {
                    addUrl: '/places/add'
                },
                changeSort: changePlacesSortType, 
                baseData: (e) => {
                    return {
                        lan: 'ar_SA',
                        searchKey: e?.target?.value || '',
                        sortType: places.sortType,
                        page: 0
                    }
                },
                hasSort: true,
                hasInit: true
            }
        } else if (location.pathname.includes('roles')) {
            return {
                searchFun: searchPlaces,
                isSearching: places.search,
                fetchingSearchResults: places.searching,
                closeSearch: closeSearchPlaces,
                openSearch: openSearchPlaces,
                hasSearch: false,
                searchTerm,
                setSearchTerm,
                sortType: roles.sortType,
                urls:  {
                    addUrl: '/roles/add'
                },
                changeSort: changeRolesSortType,
                baseData: (e) => {
                    return {
                        lan: 'ar_SA',
                        searchKey: e?.target?.value || '',
                        sortType: roles.sortType,
                        page: 0
                    }
                },
                hasSort: true,
                hasInit: false
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
    places: state.places,
    locales: state.locales,
    roles: state.roles
})

export default connect(mapStateToProps, {
    openSearchCountries, closeSearchCountries, fetchCountries, searchCountries,
    closeSearch, openSearch, deleteLanguage, changeLanguagesSort, searchLanguages,
    searchPlaces, closeSearchPlaces, openSearchPlaces, fetchPlaces, changePlacesSortType,
    searchLocales, changeRolesSortType, closeLocalesSearch, openLocalesSearch, changeLocalesSort,fetchRoles
}) (Navbar);
