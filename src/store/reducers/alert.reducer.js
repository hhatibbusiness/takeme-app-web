import { useActionData } from 'react-router-dom';
import * as actionTypes from '../actions/action.types'
const initialState = null;

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_ALERT:
            return action.alert
        case actionTypes.REMOVE_ALERT:
            return null;
        default:
            return initialState
    }
}