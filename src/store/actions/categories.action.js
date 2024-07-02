import axios from "axios";
import {
    CHANGE_CURRENT_ID,
    CHANGE_FILTER,
    CHANGE_LAN_SUCCESS,
    CHANGE_SLIDER_VALUE,
    END_FETCHING_CATEGORIES,
    END_FETCHING_PRODUCTS,
    END_LOADING_MORE_PRODUCT_TYPES,
    ERROR_ACTIVE,
    ERROR_INACTIVE,
    FETCH_CATEGORIES_SUCCESS,
    FETCH_CATEGORY_PRODUCTS, INCREASE_CATEGORIES_PAGE_NUMBER,
    INCREASE_PAGE_NUMBER,
    RESET_PAGE_NUMBER,
    START_FETCHING_CATEGORIES,
    START_FETCHING_PRODUCTS,
    START_LOADING_MORE_PRODUCT_TYPES
} from "./action.types";
import {BASE_URL} from "../../utls/assets";
import {getAnalytics, logEvent} from "firebase/analytics";
import allCategoryImage from "../../assets/images/all-icon.jpg";
import {loadUser} from "./login.action";

export const startFetchingCategories = {
    type: START_FETCHING_CATEGORIES
}

export const endFetchingCategories = {
    type: END_FETCHING_CATEGORIES
}

export const errorActive = {
    type: ERROR_ACTIVE
}

export const errorInactive = {
    type: ERROR_INACTIVE
}

// change current selected category id action.
export const changeId = id => ({
    type: CHANGE_CURRENT_ID,
    id
});

export const increaseCategoriesPageNumber= {
    type: INCREASE_CATEGORIES_PAGE_NUMBER
}


export const fetchCategories = (lan, filter, navigate, page) => async dispatch => {
    try {
        if(page == 0) dispatch(startFetchingProducts);
        const res = await axios.get(`${BASE_URL}endpoints/categories/list-no-empty?locale=${lan}&&page=${page}`);
        let categories;
        if(page == 0) {
            const allCategory =       {
                id: 0,
                name: 'الكل',
                description: 'هذة الفئة تحتوي علي جميع انواع المنتجات',
                imagePath: allCategoryImage,
                sortIndex: 1,
                createdDate: new Date(),
                updatedDate: new Date(),
                imageName: 'all.jpg'
            }

            categories = [
                allCategory,
                ...res.data.output
            ]

        }else {
            categories = [...res.data.output]
        }

        dispatch({
            type: FETCH_CATEGORIES_SUCCESS,
            categories
        });
        dispatch(increaseCategoriesPageNumber);

        dispatch(endFetchingCategories);

        if(categories?.length === 0) return;
        const firstId = categories[0].id;
        // dispatch(errorActive);
        dispatch(errorInactive);
        if(page == 0) await dispatch(changeId(firstId));
        if(page == 0) await dispatch(fetchCategoryProducts(firstId, lan, 0, filter, navigate));
        return res;
    }catch (err) {
        if(err?.response?.status == 401) {
            dispatch(loadUser(navigate, 'ar'));
        }

        const allCategory = {
            id: 0,
            name: 'الكل',
            description: 'هذة الفئة تحتوي علي جميع انواع المنتجات',
            imagePath: allCategoryImage,
            sortIndex: 1,
            createdDate: new Date(),
            updatedDate: new Date(),
            imageName: 'all.jpg'
        }

        const categories = [
            allCategory,
        ];

        dispatch({
            type: FETCH_CATEGORIES_SUCCESS,
            categories: categories
        });

        const firstId = categories[0].id;

        await dispatch(changeId(firstId));
        await dispatch(fetchCategoryProducts(firstId, lan, 0, filter, navigate));

        dispatch(endFetchingCategories);
    }
}

const startFetchingProducts = {
    type: START_FETCHING_PRODUCTS
};

const endFetchingProducts = {
    type: END_FETCHING_PRODUCTS
}

export const fetchCategoryProducts = (id, lan, page, filter, navigate) => async dispatch => {
    try {
        if(page == 0) dispatch(startFetchingProducts);
        const res = await axios.get(`${BASE_URL}endpoints/products-types?locale=${lan}&categoryId=${id}&page=${page}&filterByAction=${filter}`)
        dispatch({
            type: FETCH_CATEGORY_PRODUCTS,
            products: res.data
        });

        dispatch(increasePageNumber());
        const analytics = getAnalytics();
        if(page > 0 && res.status == 200 && res?.data?.length > 0) {
            logEvent(analytics, 'pagination', {
                paginationName: 'procutType'
            })
        }
        dispatch(errorInactive)
        if(page == 0) dispatch(endFetchingProducts);
        return res;
    } catch (e) {
        console.log(e);
        if(e?.response?.status == 401) {
            dispatch(loadUser(navigate, lan));
        }
        dispatch(endFetchingProducts);

        // dispatch(errorActive);
    }
}

export const changeSliderValue = value => ({
    type: CHANGE_SLIDER_VALUE,
    value
});

export const changeLan = (lan, id) => async dispatch => {
    try {
        dispatch({
            type: CHANGE_LAN_SUCCESS,
            lan
        });
        await dispatch(fetchCategories(lan));
        await dispatch(fetchCategoryProducts(id, lan, 0));
        // dispatch(errorActive);
        dispatch(errorInactive);
    } catch (e) {
        // dispatch(errorActive);
        console.error(e);
    }
};

//increase the page number action
export const increasePageNumber = () => ({
    type: INCREASE_PAGE_NUMBER
});

//reset the page number action
export const resetPageNumber = () => ({
    type: RESET_PAGE_NUMBER
});

export const changeFilter = (id, lan, page, navigate, filter) => async dispatch => {
    try {
        dispatch({
            type: CHANGE_FILTER,
            filter: filter
        });
        dispatch(resetPageNumber());
        const res = await dispatch(fetchCategoryProducts(id, lan, page, filter, navigate));
        return res;
    } catch (e) {
        console.log(e.message);
    }
};
