import axios from "axios";
import {
    CHANGE_SEARCH_CURRENT_CATEGORY_ID, CHANGE_SEARCH_TERM, CLOSE_SCREEN_GALLERY, END_FETCHING_SEARCH_RESULTS,
    FETCH_SEARCH_RESULTS, INCREASE_SEARCH_PAGE, OPEN_SCREEN_GALLERY, RESET_ALL_SEARCH_DATA,
    RESET_SEARCH_DATA,
    START_FETCHING_SEARCH_RESULTS
} from "./action.types";
import { BASE_URL } from "../../utls/assets";

export const startFetchingSearchResults = {
    type: START_FETCHING_SEARCH_RESULTS
}

export const endFetchingSearchResults = {
    type: END_FETCHING_SEARCH_RESULTS
}

export const fetchSearchResults = (lan, categoryId, filter, term, page) => async dispatch => {
    try {
        dispatch(startFetchingSearchResults)
        dispatch(resetSearchData());
        const res = await axios.get(`${BASE_URL}endpoints/search-products?locale=${lan}&categoryId=${categoryId}&filterByAction=${filter}&searchText=${term}&page=${page}`)
        console.log(res);
        dispatch({
            type: FETCH_SEARCH_RESULTS,
            results: res.data
        });
        dispatch(endFetchingSearchResults);
        dispatch(increaseSearchPage());
    } catch (e) {
        console.error(e.message);
        dispatch(endFetchingSearchResults);
    }
}

export const changeSearchCategoryId = id => ({
    type: CHANGE_SEARCH_CURRENT_CATEGORY_ID,
    id
});

export const resetSearchData = () => ({
    type: RESET_SEARCH_DATA
});

export const openSearchGallery = product => ({
    type: OPEN_SCREEN_GALLERY,
    product
});

export const closeSearchGallery = () => ({
    type: CLOSE_SCREEN_GALLERY
});

export const changeSearchTerm = term => async dispatch => {
    try {
        dispatch({
            type: CHANGE_SEARCH_TERM,
            term
        });

    } catch (e) {
        console.error(e.message);
    }
}

export const resetAllSearchData = () => ({
    type: RESET_ALL_SEARCH_DATA
})

export const increaseSearchPage = () => ({
    type: INCREASE_SEARCH_PAGE
})