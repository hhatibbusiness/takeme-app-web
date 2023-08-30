import axios from 'axios';
import {CHANGE_PLATFORM, FETCH_TAKE_ME_ASSETS} from "./action.types";
import {BASE_URL} from "../../utls/assets";

export const fetchAssets = () => async dispatch => {
    try {
        const res = await axios.get(`${BASE_URL}endpoints/details?locale=ar`);
        dispatch({
            type: FETCH_TAKE_ME_ASSETS,
            assets: res.data
        });
    } catch (err) {
        console.error(err.message);
    }
}

export const changePlatform = platform => ({
    type: CHANGE_PLATFORM,
    platform
});