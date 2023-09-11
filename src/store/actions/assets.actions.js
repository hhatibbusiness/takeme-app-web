import axios from 'axios';
import {CHANGE_PLATFORM, FETCH_TAKE_ME_ASSETS} from "./action.types";
import {BASE_URL} from "../../utls/assets";
import tokenUnautharizedMiddleware from "../../utls/middlewares/token.unautharized.middleware";

export const fetchAssets = (navigate) => async dispatch => {
    try {
        const res = await axios.get(`${BASE_URL}endpoints/details?locale=ar`);
        dispatch({
            type: FETCH_TAKE_ME_ASSETS,
            assets: res.data
        });
    } catch (err) {
        if(err?.response?.status == 401) {
            tokenUnautharizedMiddleware(navigate, '/login')
        }
        console.error(err?.message);
    }
}

export const changePlatform = platform => ({
    type: CHANGE_PLATFORM,
    platform
});