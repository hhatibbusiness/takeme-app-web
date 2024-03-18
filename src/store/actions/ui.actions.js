import {
    CHANGE_BACKBTN,
    CHANGE_CURRENT_POPUP_PRODUCT,
    CHANGE_CURRENT_PROVIDER,
    CHANGE_DESTINATION,
    CHANGE_HOME_POSITION,
    CHANGE_NAVBAR_ASSETS,
    CLOSE_POPUP,
    OPEN_POPUP, OPEN_SEARCH_POPUP,
    TOGGLE_POPUP
} from "./action.types";

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
});

export const changeDestination = (destination) => ({
    type: CHANGE_DESTINATION,
    destination
});

export const changeHomePosition = pos => {
    return {
        type: CHANGE_HOME_POSITION,
        pos
    }
}

export const changeNavbarAssets = data => {
    return {
        type: CHANGE_NAVBAR_ASSETS,
        data
    }
}

export const changeBackBtn = back => {
    return {
        type: CHANGE_BACKBTN,
        back
    }
}

export const changeCurrentProvider = provider => ({
    type: CHANGE_CURRENT_PROVIDER,
    provider: provider
});

export const openSearchPopup = () => ({
    type: OPEN_SEARCH_POPUP
})