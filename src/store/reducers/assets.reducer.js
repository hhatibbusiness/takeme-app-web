import * as actionTypes from '../actions/action.types';

const initialState = {
    copyRightYear: null,
    coverPath: null,
    email: null,
    facebookLink: null,
    footerText: null,
    id: null,
    instagramLink: null,
    languageId: null,
    logoPath: null,
    name: null,
    phoneCountryCode: null,
    phone: null,
    sortIndex: null,
    tiktokLink: null,
    whatsappLink: null,
    waze_template: 'https://www.waze.com/ul?ll=%2C',
    maps_template: 'https://maps.google.com/?q=',
    platform: null,
    loadingAssets: true
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.START_LOADING_ASSETS:
            return {
                ...state,
                loadingAssets: true
            }
        case actionTypes.END_LOADING_ASSETS:
            return {
                ...state,
                loadingAssets: false
            }
        case actionTypes.FETCH_TAKE_ME_ASSETS:
            return (() => {
                return {
                    ...state,
                    copyRightYear: action.assets.copyRightYear,
                    coverPaths: action.assets.coverPaths,
                    email: action.assets.email,
                    facebookLink: action.assets.facebookLink,
                    footerText: action.assets.footerText,
                    id: action.assets.id,
                    instagramLink: action.assets.instagramLink,
                    languageId: action.assets.languageId,
                    logoPath: action.assets.logoPath,
                    name: action.assets.name,
                    phoneCountryCode: action.assets.phoneCountryCode,
                    phone: action.assets.phone,
                    sortIndex: action.assets.sortIndex,
                    tiktokLink: action.assets.tiktokLink,
                    whatsappLink: action.assets.whatsappLink,
                    waze_template: action.assets.waze_template ? action.assets.waze_template : state.waze_template,
                    maps_template: action.assets.maps_template ? action.assets.maps_template : state.maps_template
                }
            })();
        case actionTypes.CHANGE_PLATFORM:
            return {
                ...state,
                platform: action.platform
            }
        default:
            return state;
    }
}