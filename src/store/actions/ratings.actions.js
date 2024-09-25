import {
    ADD_PROVIDER_RATING,
    END_ADDING_PROVIDER_RATING,
    END_FETCHING_PROVIDER_RATINGS,
    FETCH_PROVIDER_RATINGS,
    START_ADDING_PROVIDER_RATING,
    START_FETCHING_PROVIDER_RATINGS
} from "./action.types";
import axios from "axios";
import {BASE_URL} from "../../utls/assets";

export const fetchProviderRatigs = data => async dispatch => {
    try {
        dispatch(startFetchingProviderRatings);
        const res = await axios.get(`${BASE_URL}endpoints/rating/providers/list-provider-ratings?locale=${data.lan}&providerId=${data.providerId}`);
        if(res.status == 200 && res.data.status == true) {
            dispatch({
                type: FETCH_PROVIDER_RATINGS,
                ratings: res?.data?.output
            });
        }
        dispatch(endFetchingProviderRatings);
    } catch (e) {
        dispatch(endFetchingProviderRatings);
    }
}

const startFetchingProviderRatings = {
    type: START_FETCHING_PROVIDER_RATINGS
}

const endFetchingProviderRatings = {
    type: END_FETCHING_PROVIDER_RATINGS
}

const startAddingProviderRating = {
    type: START_ADDING_PROVIDER_RATING
}

const endAddingProviderRating = {
    type: END_ADDING_PROVIDER_RATING
}

export const addProviderRating = data => async dispatch => {
    try {
        dispatch(startAddingProviderRating);
        const res = await axios.post(`${BASE_URL}endpoints/rating/providers/add`, data);
        if(res.status == 200 && res.data.status == true) {
            dispatch({
                type: ADD_PROVIDER_RATING,
                rating: res?.data?.output
            });
        }
        dispatch(endAddingProviderRating);
        return res;
    } catch (e) {
        console.error(e?.message);
        dispatch(endAddingProviderRating)
    }
}