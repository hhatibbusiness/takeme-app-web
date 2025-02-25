import * as actionTypes from '../actions/action.types';
import {CHANGE_BACK_BTN_STATE, CHANGE_NAVBAR_ICONS} from "../actions/action.types";

const initialState = {
    showMidText: false,
    personActive: false,
    filtersActive: false,
    sidebar: false,
    backBtn: false,
    searchShow: false,
    middleContent: null,
    midText: null,
    icons: null,
    showIcons: false,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_SHOW_MID_TEXT_STATE:
            return {
                ...state,
                showMidText: action.state,
                midText: action.midText
            }
        case actionTypes.CHANGE_MIDDLE_CONTENT:
            return {
                ...state,
                middleContent: state.content
            }
        case actionTypes.CHANGE_BACK_BTN_STATE:
            return {
                ...state,
                backBtn: action.state
            }
        case actionTypes.CHANGE_NAVBAR_ICONS:
            return {
                ...state,
                icons: action.icons,
                showIcons: action.showIcons
            }
        default:
            return state;
    }
}