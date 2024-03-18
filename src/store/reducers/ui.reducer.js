import * as actionTypes from '../actions/action.types';
import {getAnalytics, logEvent} from "firebase/analytics";
import backBtn from "../../components/HOC/Navbar/BackBtn/BackBtn";

const initialState = {
    currentProduct: null,
    openPopup: false,
    currentProvider: null,
    rating: false,
    search: false,
    yPosition: 200,
    navbar: {
        assets: {},
        setSidebar: null,
        searchPage: null,
        loadingSearchResults: null,
        searchResults: [],
        term: null,
        step: null,
        setStep: null,
        midText: null,
        search: false,
    },
    backBtn: false,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_CURRENT_POPUP_PRODUCT:
            return {
                ...state,
                currentProduct: action.product
            }
        case actionTypes.TOGGLE_POPUP:
            console.log('Toggled!')
            return {
                ...state,
                openPopup: !state.openPopup
            }
        case actionTypes.OPEN_POPUP:
            return {
                ...state,
                openPopup: true
            }
        case actionTypes.CLOSE_POPUP:
            return {
                ...state,
                openPopup: false
            }
        case actionTypes.CHANGE_DESTINATION:
            return {
                ...state,
                rating: action.destination,
                search: false
            }
        case actionTypes.CHANGE_HOME_POSITION:
            return {
                ...state,
                yPosition: action.pos
            }
        case actionTypes.CHANGE_NAVBAR_ASSETS:
            return {
                ...state,
                navbar: action.data
            }
        case actionTypes.CHANGE_BACKBTN:
            return {
                ...state,
                backBtn: action.back
            }
        case actionTypes.OPEN_SEARCH_POPUP:
            return {
                ...state,
                search: true,
                rating: false
            }
        case actionTypes.CHANGE_CURRENT_PROVIDER:
            return {
                ...state,
                currentProvider: action.provider
            }
        default:
            return state;
    }
}