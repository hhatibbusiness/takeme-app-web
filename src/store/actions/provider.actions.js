import axios from "axios";
import {
    CLOSE_PROVIDER_GALLERY, END_FETCHING_PROVIDER,
    FETCH_PROVIDER_DATA,
    OPEN_PROVIDER_GALLERY,
    START_FETCHING_PROVIDER
} from "./action.types";
import { BASE_URL } from "../../utls/assets";
import tokenUnautharizedMiddleware from "../../utls/middlewares/token.unautharized.middleware";

export const fetchProviderData = (lan, id, filter, navigate) => async dispatch => {
    try {
        dispatch(startFetchingProvider);
        const res = await axios.get(`${BASE_URL}endpoints/provider-details?locale=${lan}&providerId=${id}&filterByAction=${filter}`);
        if(res.status == 200 && res.data.status == true) {
            dispatch({
                type: FETCH_PROVIDER_DATA,
                provider: res.data.output || {}
            });
        }
        console.log(res);
        dispatch(endFetchingProvider);
    } catch (e) {
        if(e?.response?.status == 401) {
            tokenUnautharizedMiddleware(navigate, '/login');
        }
        console.error(e.message);
        dispatch(endFetchingProvider);
    }
}

export const openProviderGallery = product => ({
    type: OPEN_PROVIDER_GALLERY,
    product: product
});

export const closeProviderGallery = product => ({
    type: CLOSE_PROVIDER_GALLERY,
});

export const startFetchingProvider = {
    type: START_FETCHING_PROVIDER
}

export const endFetchingProvider = {
    type: END_FETCHING_PROVIDER
}