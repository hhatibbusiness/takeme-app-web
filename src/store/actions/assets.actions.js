import axios from 'axios';
import {FETCH_TAKE_ME_ASSETS} from "./action.types";

export const fetchAssets = () => async dispatch => {
    try {
        const res = await axios.get('https://takeme-all.com/app/endpoints/details?locale=ar');
        dispatch({
            type: FETCH_TAKE_ME_ASSETS,
            assets: res.data
        });
    } catch (err) {
        console.error(err.message);
    }
}