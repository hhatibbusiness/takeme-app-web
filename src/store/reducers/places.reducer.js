import React from 'react'
import * as actionTypes from '../actions/action.types';

const initialState = {
    places: [],
    fetchingPlaces: false,
    page: 0,
    adding: false,
    sortType: "NEWEST",
    more: false,
    deleting: false,
    search: false,
    searchResults: [],
    searching: false,
    moreSearchResults: true,
    searchResultsPage: 0,
    searchKey: ''
}

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.START_FETCHING_PLACES:
            return {
                ...state,
                fetchingPlaces: true
            }
        case actionTypes.END_FETCHING_PLACES:
            return {
                ...state,
                fetchingPlaces: false
            }
        case actionTypes.FETCH_PLACES:
            return {
                ...state,
                places: [...state.places, ...action.places],
                page: state.page + 1,
                more: action.places.length >= 10
            }
        case actionTypes.START_ADDING_PLACE:
            return {
                ...state,
                adding: true
            }
        case actionTypes.END_ADDING_PLACE:
            return {
                ...state,
                adding: false
            }
        case actionTypes.ADD_PLACE:
            return {
                ...state,
                places: [action.place, ...state.places]
            }
        case actionTypes.EDIT_PLACE:
            const updatedPlaces = state.places.map(place => 
                place.id === action.place.id ? { ...place, ...action.place } : place
            );
            return {
                ...state,
                places: updatedPlaces
            }
        case actionTypes.START_DELETING_PLACE:
            return {
                ...state,
                deleting: true
            }
        case actionTypes.END_DELETING_PLACE:
            return {
                ...state,
                deleting: false
            }
        case actionTypes.DELETE_PLACE:
            const stateCopy = state.places.filter(c => c.id != action.placeId);
            const searchResultsCopy = state.searchResults.filter(r => r.id != action.placeId);
            return {
                ...state,
                places: [...JSON.parse(JSON.stringify(stateCopy))],
                searchResults: [...JSON.parse(JSON.stringify(searchResultsCopy))]
            }
        case actionTypes.CHANGE_SORT_PLACES:
            return {
                ...state,
                places: [],
                sortType: action.sortType,
                page: 0,
                more: true,
                searchResults: [],
                moreSearchResults: true,
                searchResultsPage: 0
            }
        case actionTypes.START_SEARCHING_PLACES:
            return {
                ...state,
                searching: true
            }
        case actionTypes.END_SEARCHING_PLACES:
            return {
                ...state,
                searching: false
            }
        case actionTypes.SEARCH_PLACES:
            return {
                ...state,
                searchResults: action.page == 0 ? [...action.searchResults] : [...state.searchResults, ...action.searchResults],
                moreSearchResults: action.searchResults.length >= 10,
                searchResultsPage: state.searchResultsPage + 1,
                searchKey: action.searchKey
            }
        case actionTypes.OPEN_SEARCH_PLACES:
            return {
                ...state,
                search: true
            }
        case actionTypes.CLOSE_SEARCH_PLACES:
            return {
                ...state,
                search: false
            }
        default:
            return state;
    }
}