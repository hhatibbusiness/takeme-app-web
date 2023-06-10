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
    whatsappLink: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_TAKE_ME_ASSETS:
            return (() => {
                return {
                    ...state,
                    copyRightYear: action.assets.copyRightYear,
                    coverPath: action.assets.coverPath,
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
                    whatsappLink: action.assets.whatsappLink
                }
            })();
        default:
            return state;
    }
}