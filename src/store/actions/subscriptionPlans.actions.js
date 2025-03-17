import * as actionTypes from "./action.types";
import {BaseURL} from "../../assets/constants/Base";
import FetchAPI from "../../utilty/FetchAPI";


export const fetchSubscriptionPlans = (data) => async dispatch => {
    if (data.page == 0) dispatch({ type: actionTypes.START_FETCHING_SUBSCRIPTION_PLANS });
    
    const response = await FetchAPI(
        `${BaseURL}/business/plans/list?mLocale=${data.lan}&page=${data.page}&sortType=NEWEST`,
        { method: 'GET' },
        dispatch
    );

    if (response) {
        dispatch({ type: actionTypes.FETCH_SUBSCRIPTION_PLANS, plans: response.output });
        dispatch({ type: actionTypes.END_FETCHING_SUBSCRIPTION_PLANS });
    }
};

export const addSubscriptionPlan = (data) => async dispatch => {
    dispatch({ type: actionTypes.START_ADDING_SUBSCRIPTION_PLAN });
    
    const response = await FetchAPI(
        `${BaseURL}/business/plans/add?mLocale=${data.lan}`,
        {
            method: 'POST',
            body: {
                id: 0,
                name: data.name,
                storesNumberLimit: data.storesNumberLimit,
                storeSizeLimit: data.storeSizeLimitInMB,
                storeItemsNumberLimit: data.storeItemsNumberLimit,
                storeItemImagesNumberLimit: data.storeItemImagesNumberLimit,
                storeStoriesNumberLimit: data.storeStoriesNumberLimit
            }
        },
        dispatch,
    );

    if (response) {
        dispatch({ type: actionTypes.ADD_SUBSCRIPTION_PLAN, plan: response.output });
        dispatch({ type: actionTypes.END_ADDING_SUBSCRIPTION_PLAN });
        return { status: 200, data: response };
    }
    
    dispatch({ type: actionTypes.END_ADDING_SUBSCRIPTION_PLAN });
    return null;
};

export const editSubscriptionPlan = (data) => async dispatch => {
    dispatch({ type: actionTypes.START_EDITING_SUBSCRIPTION_PLAN });
    
    const response = await FetchAPI(
        `${BaseURL}/business/plans/update?mLocale=${data.lan}`,
        {
            method: 'PUT',
            body: {
                id: data.id,
                name: data.name,
                storesNumberLimit: data.storesNumberLimit,
                storeSizeLimit: data.storeSizeLimitInMB,
                storeItemsNumberLimit: data.storeItemsNumberLimit,
                storeItemImagesNumberLimit: data.storeItemImagesNumberLimit,
                storeStoriesNumberLimit: data.storeStoriesNumberLimit
            }
        },
        dispatch,
    );

    if (response) {
        dispatch({ type: actionTypes.EDIT_SUBSCRIPTION_PLAN, plan: response.output });
        dispatch({ type: actionTypes.END_EDITING_SUBSCRIPTION_PLAN });
        return { status: 200, data: response };
    }

    dispatch({ type: actionTypes.END_EDITING_SUBSCRIPTION_PLAN });
    return null;
};

export const deleteSubscriptionPlan = (data) => async dispatch => {
    dispatch({ type: actionTypes.START_DELETING_SUBSCRIPTION_PLAN });
    
    const response = await FetchAPI(
        `${BaseURL}/business/plans/delete?mLocale=${data.lan}&businessPlansId=${data.id}`,
        { method: 'DELETE' },
        dispatch,
    );

    if (response) {
        dispatch({ type: actionTypes.DELETE_SUBSCRIPTION_PLAN, planId: data.id });
    }
    
    dispatch({ type: actionTypes.END_DELETING_SUBSCRIPTION_PLAN });
};