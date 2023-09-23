import {CHANGE_CURRENT_POPUP_PRODUCT, CLOSE_POPUP, OPEN_POPUP, TOGGLE_POPUP} from "./action.types";

export const changePopupProduct = product => ({
    type: CHANGE_CURRENT_POPUP_PRODUCT,
    product
});

export const togglePopup = () => ({
    type: TOGGLE_POPUP
})

export const openPopup = () => ({
    type: OPEN_POPUP
})

export const closePopup = () => ({
    type: CLOSE_POPUP
})