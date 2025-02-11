import React, { createContext, useEffect, useReducer } from 'react'
import axios from 'axios';
import * as actionTypes from '../actions/action.types';

const initialState = {
    countries: [],
    fetchingCountries: false,
    page: 0,
    sortType: "NEWEST",
    adding: false,
    editing: false,
    more: false,
    deleting: false,
    search: false,
    searchResults: [],
    searching: false,
    moreSearchResults: true,
    searchResultsPage: 0,
    searchKey: '',
    country: {},
    fetchingCountryById: false,
    locales: [],
    searchingLocales: false,
    localesPage: 0,
    localesMore: true,
    localesSearchKey: '',
    selectedLocale: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.START_FETCHING_COUNTRIES:
            return {
                ...state,
                fetchingCountries: true
            }
        case actionTypes.END_FETCHING_COUNTRIES:
            return {
                ...state,
                fetchingCountries: false
            }
        case actionTypes.FETCH_COUNTRIES:
            console.log(action.countries);
            return {
                ...state,
                countries: [...state.countries, ...action.countries],
                page: state.page + 1,
                more: action.countries.length >= 10
            }
        case actionTypes.START_ADDING_COUNTRY:
            return {
                ...state,
                adding: true
            }
        case actionTypes.END_ADDING_COUNTRY:
            return {
                ...state,
                adding: false
            }
        case actionTypes.ADD_COUNTRY:
            return {
                ...state,
                countries: [action.country, ...state.countries]
            }
        case actionTypes.START_EDITING_COUNTRY:
            return {
                ...state,
                editing: true
            }
        case actionTypes.END_EDITING_COUNTRY:
            console.log('end Editing!');
            return {
                ...state,
                editing: false
            }
        case actionTypes.EDIT_COUNTRY:
            if (state.sortType == 'NEWEST') {
                const countriesCopy = state.countries.filter(c => c.id != action.country.id);
                return {
                    ...state,
                    countries: [action.country, ...countriesCopy]
                }

            } else {
                const countryIndex = state.countries.findIndex(c => c.id == action.country.id);
                state.countries[countryIndex] = action.country;
                return {
                    ...state,
                    countries: [...JSON.parse(JSON.stringify(state.countries))]
                }

            }
        case actionTypes.START_DELETING_COUNTRY:
            return {
                ...state,
                deleting: true
            }
        case actionTypes.END_DELETING_COUNTRY:
            return {
                ...state,
                deleting: false
            }
        case actionTypes.DELETE_COUNTRY:
            const stateCopy = state.countries.filter(c => c.id != action.countryId);
            const searchResultsCopy = state.searchResults.filter(r => r.id != action.countryId);
            return {
                ...state,
                countries: [...JSON.parse(JSON.stringify(stateCopy))],
                searchResults: [...JSON.parse(JSON.stringify(searchResultsCopy))]
            }
        case actionTypes.CHANGE_SORT_COUNTRIES:
            return {
                ...state,
                countries: [],
                sortType: action.sortType,
                page: 0,
                more: true,
                searchResults: [],
                moreSearchResults: true,
                searchResultsPage: 0
            }
        case actionTypes.START_SEARCHING_COUNTRIES:
            return {
                ...state,
                searching: true
            }
        case actionTypes.END_SEARCHING_COUNTRIES:
            return {
                ...state,
                searching: false
            }
        case actionTypes.SEARCH_COUNTRIES:
            return {
                ...state,
                searchResults: action.page == 0 ? [...action.searchResults] : [...state.searchResults, ...action.searchResults],
                moreSearchResults: action.searchResults.length >= 10,
                searchResultsPage: state.searchResultsPage + 1,
                searchKey: action.searchKey
            }
        case actionTypes.OPEN_SEARCH_COUNTRIES:
            return {
                ...state,
                search: true
            }
        case actionTypes.CLOSE_SEARCH_COUNTRIES:
            return {
                ...state,
                search: false
            }
        case actionTypes.START_FETCHING_COUNTRY_BY_ID:
            return {
                ...state,
                fetchingCountryById: true
            }
        case actionTypes.END_FETCHING_COUNTRY_BY_ID:
            return {
                ...state,
                fetchingCountryById: false
            }
        case actionTypes.FETCH_COUNTRY_BY_ID:
            return {
                ...state,
                country: action.country
            }
        case actionTypes.START_SEARCHING_FOR_LOCALES:
            return {
                ...state,
                searchingLocales: true
            }
        case actionTypes.END_SEARCHING_FOR_LOCALES:
            return {
                ...state,
                searchingLocales: false
            }
        case actionTypes.SEARCH_FOR_LOCALES:
            return {
                ...state,
                locales: action.page == 0 ? [...action.locales] : [...state.locales, ...action.locales],
                localesPage: state.localesPage + 1,
                localesMore: action.locales.length >= 10,
                localesSearchKey: action.searchKey
            }
        case actionTypes.CHANGE_SELECTED_LOCALE:
            return {
                ...state,
                selectedLocale: action.locale
            }
        default:
            return state;
    }
}