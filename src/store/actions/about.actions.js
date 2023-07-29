import axios from "axios";
import {END_FETCHING_ABOUT_PAGE, FETCH_ABOUT_PAGE, START_FETCHING_ABOUT_PAGE} from "./action.types";
import { BASE_URL } from "../../utls/assets";

export const fetchAboutPage = lan => async dispatch => {
    try {
        dispatch(startFetchingAboutPage());
        const res = await axios.get(`${BASE_URL}langs/${lan}/about.html`);
        dispatch({
            type: FETCH_ABOUT_PAGE,
            data: res.data
        })
        dispatch(endFetchingAboutPage());
    } catch (err) {
        console.error(err.message);
    }
}

export const startFetchingAboutPage = () => ({
    type: START_FETCHING_ABOUT_PAGE
});

export const endFetchingAboutPage = () => ({
    type: END_FETCHING_ABOUT_PAGE
})