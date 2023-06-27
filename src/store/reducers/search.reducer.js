import * as actionTypes from '../actions/action.types';
import {FETCH_SEARCH_RESULTS} from "../actions/action.types";

const initialState = {
    results: [],
    term: '',
    categoryId: null,
    searchPage: 0,
    loadingSearchResults: true,
    searchGalleryOpen: false,
    searchGalleryProduct: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.RESET_ALL_SEARCH_DATA:
            return {
                ...state,
                results: [],
                term: '',
                categoryId: null,
                searchPage: 0,
                loadingSearchResults: true,
                searchGalleryOpen: false,
                searchGalleryProduct: {}
            }
        case actionTypes.OPEN_SCREEN_GALLERY:
            return {
                ...state,
                searchGalleryOpen: true,
                searchGalleryProduct: action.product
            }
        case actionTypes.CLOSE_SCREEN_GALLERY:
            return {
                ...state,
                searchGalleryOpen: false,
                searchGalleryProduct: {}
            }
        case actionTypes.CHANGE_SEARCH_CURRENT_CATEGORY_ID:
            return {
                ...state,
                categoryId: action.id
            }
        case actionTypes.FETCH_SEARCH_RESULTS:
            return {
                ...state,
                results: [...action.results]
            }
        case actionTypes.RESET_SEARCH_DATA:
            return {
                ...state,
                results: [],
                searchPage: 0
            }
        case actionTypes.START_FETCHING_SEARCH_RESULTS:
            return {
                ...state,
                loadingSearchResults: true
            }
        case actionTypes.END_FETCHING_SEARCH_RESULTS:
            return {
                ...state,
                loadingSearchResults: false
            }
        case actionTypes.CHANGE_SEARCH_TERM:
            return {
                ...state,
                term: action.term
            }
        default:
            return state;
    }
}