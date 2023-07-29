import axios from "axios";
import {
    CLOSE_PROVIDER_GALLERY, END_FETCHING_PROVIDER,
    FETCH_PROVIDER_DATA,
    OPEN_PROVIDER_GALLERY,
    START_FETCHING_PROVIDER
} from "./action.types";
import { BASE_URL } from "../../utls/assets";

export const fetchProviderData = (lan, id, filter) => async dispatch => {
    try {
        dispatch(startFetchingProvider);
        const res = await axios.get(`${BASE_URL}endpoints/provider-details?locale=${lan}&providerId=${id}&filterByAction=${filter}`);
        dispatch({
            type: FETCH_PROVIDER_DATA,
            provider: res.data
        });
        console.log(res);
        dispatch(endFetchingProvider);
    } catch (e) {
        console.error(e.message);
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