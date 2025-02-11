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
import { usePlacesContext } from '../../../context/placesContext';
import {connect} from "react-redux";
import {searchLanguages, closeSearch, openSearch, deleteLanguage, changeSortType} from "../../../store/actions/languages.actions";
import {searchCountries, fetchCountries, deleteCountry, closeSearchCountries, openSearchCountries } from "../../../store/actions/countries.actions";

const Navbar = ({openSearchCountries, countries, searchCountries, closeSearchCountries, languages, searchLanguages, closeSearch, openSearch, deleteLanguage, changeSortType}) => {
    const { details } = useDetailsContext();
    const { state } = useNavbarContext();
    const { locales, searchLocales, closeLocalesSearch, openLocalesSearch, changeLocalesSort } = useLocalesContext();
    const { SearchPlacesFun, searchPlaces, isSearchingPlaces, searchPlaceTerm, closeSearchPlaces, openSearchPlaces, sortTypePlace, changeSortPlaces } = usePlacesContext();
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
                searchFun: SearchPlacesFun,
                isSearching: isSearchingPlaces,
                fetchingSearchResults: searchPlaces,
                closeSearch: closeSearchPlaces, 
                openSearch: openSearchPlaces,
                searchTerm,
                setSearchTerm,
                sortType: sortTypePlace,
                urls:  {
                    addUrl: '/places/add'
                },
                changeSort: changeSortPlaces, 
                baseData: (e) => {
                    return {
                        searchkey: e?.target?.value || '',
                        sortType: sortTypePlace,
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
                <Backbtn backURL={'/'} />
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
    countries: state.countries
})

export default connect(mapStateToProps, {openSearchCountries, closeSearchCountries, deleteCountry, fetchCountries, searchCountries, closeSearch, openSearch, deleteLanguage, changeSortType, searchLanguages}) (Navbar);