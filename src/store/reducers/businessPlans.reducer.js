import * as actionTypes from '../actions/action.types';

const initialState = {
    businessPlans: [],
    fetchingBusinessPlans: false,
    page: 0,
    sortType: "NEWEST",
    adding: false,
    editing: false,
    more: false,
    deleting: false,
    search: false,
    searchResults: [],
    searching: false,
    moreSearchResults: true,
    searchResultsPage: 0,
    searchKey: ''
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.START_FETCHING_BUSINESS_PLANS:
            return {
                ...state,
                fetchingBusinessPlans: true
            };
        case actionTypes.END_FETCHING_BUSINESS_PLANS:
            return {
                ...state,
                fetchingBusinessPlans: false
            };
        case actionTypes.FETCH_BUSINESS_PLANS:
            return {
                ...state,
                businessPlans: [...state.businessPlans, ...action.businessPlans],
                page: state.page + 1,
                more: action.businessPlans.length >= 10
            };
        case actionTypes.START_ADDING_BUSINESS_PLAN:
            return {
                ...state,
                adding: true
            };
        case actionTypes.END_ADDING_BUSINESS_PLAN:
            return {
                ...state,
                adding: false
            };
        case actionTypes.ADD_BUSINESS_PLAN:
            return {
                ...state,
                businessPlans: [action.businessPlan, ...state.businessPlans]
            };
        case actionTypes.START_EDITING_BUSINESS_PLAN:
            return {
                ...state,
                editing: true
            };
        case actionTypes.END_EDITING_BUSINESS_PLAN:
            return {
                ...state,
                editing: false
            };
        case actionTypes.EDIT_BUSINESS_PLAN:
            if (state.sortType === 'NEWEST') {
                const businessPlansCopy = state.businessPlans.filter(b => b.id !== action.businessPlan.id);
                return {
                    ...state,
                    businessPlans: [action.businessPlan, ...businessPlansCopy]
                };
            } else {
                const businessPlanIndex = state.businessPlans.findIndex(b => b.id === action.businessPlan.id);
                state.businessPlans[businessPlanIndex] = action.businessPlan;
                return {
                    ...state,
                    businessPlans: [...JSON.parse(JSON.stringify(state.businessPlans))]
                };
            }
        case actionTypes.START_DELETING_BUSINESS_PLAN:
            return {
                ...state,
                deleting: true
            };
        case actionTypes.END_DELETING_BUSINESS_PLAN:
            return {
                ...state,
                deleting: false
            };
        case actionTypes.DELETE_BUSINESS_PLAN:
            const stateCopy = state.businessPlans.filter(b => b.id !== action.businessPlanId);
            const searchResultsCopy = state.searchResults.filter(r => r.id !== action.businessPlanId);
            return {
                ...state,
                businessPlans: [...JSON.parse(JSON.stringify(stateCopy))],
                searchResults: [...JSON.parse(JSON.stringify(searchResultsCopy))]
            };
        case actionTypes.START_SEARCHING_BUSINESS_PLANS:
            return {
                ...state,
                searching: true
            };
        case actionTypes.END_SEARCHING_BUSINESS_PLANS:
            return {
                ...state,
                searching: false
            };
        case actionTypes.SEARCH_BUSINESS_PLANS:
            return {
                ...state,
                searchResults: action.page === 0 ? [...action.searchResults] : [...state.searchResults, ...action.searchResults],
                moreSearchResults: action.searchResults.length >= 10,
                searchResultsPage: state.searchResultsPage + 1,
                searchKey: action.searchKey
            };
        case actionTypes.OPEN_SEARCH_BUSINESS_PLANS:
            return {
                ...state,
                search: true
            };
        case actionTypes.CLOSE_SEARCH_BUSINESS_PLANS:
            return {
                ...state,
                search: false
            };
        default:
            return state;
    }
};
