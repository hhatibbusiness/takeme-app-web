import React from 'react'
import * as actionTypes from '../actions/action.types';

const initialState = {
    plans: [],
    fetchingPlans: false,
    page: 0,
    adding: false,
    editing: false,
    more: false,
    deleting: false,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.START_FETCHING_SUBSCRIPTION_PLANS:
            return {
                ...state,
                fetchingPlans: true
            }
        case actionTypes.END_FETCHING_SUBSCRIPTION_PLANS:
            return {
                ...state,
                fetchingPlans: false
            }
        case actionTypes.FETCH_SUBSCRIPTION_PLANS:
            return {
                ...state,
                plans: [...state.plans, ...action.plans],
                page: state.page + 1,
                more: action.plans.length >= 10
            }
        case actionTypes.START_ADDING_SUBSCRIPTION_PLAN:
            return {
                ...state,
                adding: true
            }
        case actionTypes.END_ADDING_SUBSCRIPTION_PLAN:
            return {
                ...state,
                adding: false
            }
        case actionTypes.ADD_SUBSCRIPTION_PLAN:
            return {
                ...state,
                plans: [action.plan, ...state.plans]
            }
        case actionTypes.EDIT_SUBSCRIPTION_PLAN:
            const plansCopy = state.plans.filter(p => p.id !== action.plan.id);
            return {
                ...state,
                plans: [action.plan, ...plansCopy]
            }
        case actionTypes.START_EDITING_SUBSCRIPTION_PLAN:
            return {
                ...state,
                editing: true
            }
        case actionTypes.END_EDITING_SUBSCRIPTION_PLAN:
            return {
                ...state,
                editing: false
            }
        case actionTypes.START_DELETING_SUBSCRIPTION_PLAN:
            return {
                ...state,
                deleting: true
            }
        case actionTypes.END_DELETING_SUBSCRIPTION_PLAN:
            return {
                ...state,
                deleting: false
            }
        case actionTypes.DELETE_SUBSCRIPTION_PLAN:
            const stateCopy = state.plans.filter(p => p.id != action.planId);
            return {
                ...state,
                plans: [...stateCopy],
            }
        default:
            return state;
    }
}
