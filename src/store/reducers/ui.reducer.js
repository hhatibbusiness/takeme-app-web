import * as actionTypes from '../actions/action.types';

const initialState = {
    currentProduct: null,
    openPopup: false
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
        default:
            return state;
    }
}