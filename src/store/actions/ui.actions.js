import {CHANGE_CURRENT_POPUP_PRODUCT, TOGGLE_POPUP} from "./action.types";

export const changePopupProduct = product => ({
    type: CHANGE_CURRENT_POPUP_PRODUCT,
    product
});

export const togglePopup = () => ({
    type: TOGGLE_POPUP
})