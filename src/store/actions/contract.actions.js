import axios from "axios";
import {
    END_FETCHING_CONTRACT_PAGE,
    FETCH_CONTRACT_PAGE,
    START_FETCHING_CONTRACT_PAGE
} from "./action.types";
import {BASE_URL} from "../../utls/assets";

export const fetchContractPage = lan => async dispatch => {
    try {
        dispatch(startFetchingContractPage());
        const res = await axios.get(`${BASE_URL}langs/${lan}/contracts/terms_conditions.html`);
        dispatch({
            type: FETCH_CONTRACT_PAGE,
            data: res.data
        })
        dispatch(endFetchingContractPage());
    } catch (err) {
        console.error(err.message);
    }
}

export const startFetchingContractPage = () => ({
    type: START_FETCHING_CONTRACT_PAGE
});

export const endFetchingContractPage = () => ({
    type: END_FETCHING_CONTRACT_PAGE
})