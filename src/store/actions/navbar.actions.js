import {
    CHANGE_BACK_BTN_STATE,
    CHANGE_MIDDLE_CONTENT,
    CHANGE_NAVBAR_ICONS,
    CHANGE_SHOW_MID_TEXT_STATE
} from "./action.types";

export const changeMidTextShowState = data => {
    return {
        type: CHANGE_SHOW_MID_TEXT_STATE,
        state: data.state,
        midText: data.midText
    }
}

export const changeMiddleContent = content => {
    return {
        type: CHANGE_MIDDLE_CONTENT,
        content
    }
}

export const changeBackBtnState = state => {
    return {
        type: CHANGE_BACK_BTN_STATE,
        state
    }
}

export const changeNavbarIcons = data => {
    return {
        type: CHANGE_NAVBAR_ICONS,
        icons: data.icons,
        showIcons: data.showIcons
    }
}