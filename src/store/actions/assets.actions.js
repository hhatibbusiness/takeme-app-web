import axios from 'axios';
import {CHANGE_PLATFORM, END_LOADING_ASSETS, FETCH_TAKE_ME_ASSETS, START_LOADING_ASSETS} from "./action.types";
import {BASE_URL} from "../../utls/assets";
import {loadUser} from "./login.action";
import {errorActive, errorInactive} from "./categories.action";
import { getUserProfile } from './auth.actions';

export const startLoadingAssets = {
    type: START_LOADING_ASSETS
}

export const endLoadingAssets = {
    type: END_LOADING_ASSETS
}

export const fetchAssets = (navigate, localeId) => async dispatch => {
    try {
        dispatch(startLoadingAssets)
        dispatch(getUserProfile({
            locale: 'ar_SA',
            localeId: localeId
        }))
        const res = await axios.get(`${BASE_URL}endpoints/details?mLocale=ar_SA`);
        dispatch({
            type: FETCH_TAKE_ME_ASSETS,
            assets: res.data
        });
        console.log(localeId);
        dispatch(endLoadingAssets);
        dispatch(errorInactive);
    } catch (err) {
        // dispatch(errorActive);
        dispatch(endLoadingAssets);
        if(err?.response?.status == 401) {
            dispatch(loadUser(navigate, 'ar'));
        }
        console.error(err?.message);
    }
}

export const changePlatform = platform => ({
    type: CHANGE_PLATFORM,
    platform
});