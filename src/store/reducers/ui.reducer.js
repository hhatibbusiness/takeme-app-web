import * as actionTypes from '../actions/action.types';
import {getAnalytics, logEvent} from "firebase/analytics";

const initialState = {
    currentProduct: null,
    openPopup: false,
    rating: false,
    yPosition: 200
}

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_CURRENT_POPUP_PRODUCT:
            return {
                ...state,
                currentProduct: action.product
            }
        case actionTypes.TOGGLE_POPUP:
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
                rating: action.destination
            }
        case actionTypes.CHANGE_HOME_POSITION:
            return {
                ...state,
                yPosition: action.pos
            }
        default:
            return state;
    }
}