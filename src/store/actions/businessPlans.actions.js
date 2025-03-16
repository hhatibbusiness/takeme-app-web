import * as actionTypes from "./action.types";
import { BaseURL } from "../../assets/constants/Base";
import FetchAPI from "../../utilty/FetchAPI";
import { mockBusinessPlans } from "../../screens/BusinessPlans/businessPlans.mock";

// Temporary mock implementation
export const fetchBusinessPlans = (data) => async dispatch => {
    dispatch({ type: actionTypes.START_FETCHING_BUSINESS_PLANS });
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock pagination
    const start = data.page * 10;
    const end = start + 10;
    const paginatedPlans = mockBusinessPlans.slice(start, end);
    
    dispatch({ 
        type: actionTypes.FETCH_BUSINESS_PLANS, 
        businessPlans: paginatedPlans
    });
    dispatch({ type: actionTypes.END_FETCHING_BUSINESS_PLANS });
    
    /* Real API call - commented temporarily
    const response = await FetchAPI(`${BaseURL}/business/plans/list?mLocale=${data.lan}&page=${data.page}&ascending=${true}`, {}, dispatch);
    if (response) {
        dispatch({ type: actionTypes.FETCH_BUSINESS_PLANS, businessPlans: response.output });
    }
    dispatch({ type: actionTypes.END_FETCHING_BUSINESS_PLANS });
    */
};

export const addBusinessPlan = (data) => async dispatch => {
    dispatch({ type: actionTypes.START_ADDING_BUSINESS_PLAN });
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Create new plan with mock ID
    const newPlan = {
        id: mockBusinessPlans.length + 1,
        name: data.name,
        storeSizeLimitInMB: data.storeSizeLimitInMB,
        storeItemsNumberLimit: data.storeItemsNumberLimit,
        storeItemImagesNumberLimit: data.storeItemImagesNumberLimit,
        storeStoriesNumberLimit: data.storeStoriesNumberLimit,
        createdDate: new Date().toISOString(),
        updatedDate: new Date().toISOString()
    };
    
    mockBusinessPlans.unshift(newPlan);
    
    dispatch({ type: actionTypes.ADD_BUSINESS_PLAN, businessPlan: newPlan });
    dispatch({ type: actionTypes.END_ADDING_BUSINESS_PLAN });
    return { status: 200 };
    
    /* Real API call - commented temporarily
    const response = await FetchAPI(
        `${BaseURL}/business/plans/add?mLocale=${data.lan}`, 
        {
            method: 'POST',
            body: data
        }, 
        dispatch,
        true
    );
    if (response) {
        dispatch({ type: actionTypes.ADD_BUSINESS_PLAN, businessPlan: response });
        dispatch({ type: actionTypes.END_ADDING_BUSINESS_PLAN });
        return { status: 200 };
    }
    dispatch({ type: actionTypes.END_ADDING_BUSINESS_PLAN });
    return null;
    */
};

export const editBusinessPlan = (data) => async dispatch => {
    dispatch({ type: actionTypes.START_EDITING_BUSINESS_PLAN });
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Update plan in mock data
    const planIndex = mockBusinessPlans.findIndex(p => p.id === data.id);
    if (planIndex !== -1) {
        const updatedPlan = {
            ...mockBusinessPlans[planIndex],
            ...data,
            updatedDate: new Date().toISOString()
        };
        mockBusinessPlans[planIndex] = updatedPlan;
        
        dispatch({ type: actionTypes.EDIT_BUSINESS_PLAN, businessPlan: updatedPlan });
        dispatch({ type: actionTypes.END_EDITING_BUSINESS_PLAN });
        return { status: 200 };
    }
    
    dispatch({ type: actionTypes.END_EDITING_BUSINESS_PLAN });
    return null;
    
    /* Real API call - commented temporarily
    const response = await FetchAPI(
        `${BaseURL}/business/plans/update?mLocale=${data.lan}`,
        {
            method: 'PUT',
            body: data
        },
        dispatch,
        true
    );
    if (response) {
        dispatch({ type: actionTypes.EDIT_BUSINESS_PLAN, businessPlan: response });
        dispatch({ type: actionTypes.END_EDITING_BUSINESS_PLAN });
        return { status: 200 };
    }
    dispatch({ type: actionTypes.END_EDITING_BUSINESS_PLAN });
    return null;
    */
};

export const deleteBusinessPlan = (data) => async dispatch => {
    dispatch({ type: actionTypes.START_DELETING_BUSINESS_PLAN });
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Remove plan from mock data
    const planIndex = mockBusinessPlans.findIndex(p => p.id === data.id);
    if (planIndex !== -1) {
        mockBusinessPlans.splice(planIndex, 1);
        dispatch({ type: actionTypes.DELETE_BUSINESS_PLAN, businessPlanId: data.id });
    }
    
    dispatch({ type: actionTypes.END_DELETING_BUSINESS_PLAN });
    
    /* Real API call - commented temporarily
    const response = await FetchAPI(
        `${BaseURL}/business/plans/delete?Mlocale=${data.lan}&id=${data.id}`,
        {
            method: 'DELETE'
        },
        dispatch,
        true
    );
    if (response) {
        dispatch({ type: actionTypes.DELETE_BUSINESS_PLAN, businessPlanId: data.id });
    }
    dispatch({ type: actionTypes.END_DELETING_BUSINESS_PLAN });
    */
};

export const searchBusinessPlans = (data) => async dispatch => {
    if (data.page == 0) dispatch({ type: actionTypes.START_SEARCHING_BUSINESS_PLANS });
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Filter mock data based on search key
    const searchResults = mockBusinessPlans.filter(plan => 
        plan.name.toLowerCase().includes(data.searchKey.toLowerCase())
    );
    
    // Mock pagination for search results
    const start = data.page * 10;
    const end = start + 10;
    const paginatedResults = searchResults.slice(start, end);
    
    dispatch({
        type: actionTypes.SEARCH_BUSINESS_PLANS,
        searchResults: paginatedResults,
        searchKey: data.searchKey,
        page: data.page
    });
    
    dispatch({ type: actionTypes.END_SEARCHING_BUSINESS_PLANS });
    
    /* Real API call - commented temporarily
    const response = await FetchAPI(
        `${BaseURL}/business/plans/list?mLocale=${data.lan}&searchKey=${data.searchKey}&page=${data.page}`,
        {},
        dispatch
    );
    if (response) {
        dispatch({
            type: actionTypes.SEARCH_BUSINESS_PLANS,
            searchResults: response.output,
            searchKey: data.searchKey,
            page: data.page
        });
    }
    dispatch({ type: actionTypes.END_SEARCHING_BUSINESS_PLANS });
    */
};

export const openSearchBusinessPlans = () => {
    return { type: actionTypes.OPEN_SEARCH_BUSINESS_PLANS };
};

export const closeSearchBusinessPlans = () => {
    return { type: actionTypes.CLOSE_SEARCH_BUSINESS_PLANS };
};
