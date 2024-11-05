import * as actionTypes from '../actions/action.types';

const initialState = {
    profile: {},
    authenticatingUser: false,

}

export default (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.START_AUTHENTICATION_USER:
            return {
                ...state,
                authenticatingUser: true
            }
        case actionTypes.END_AUTHENTICATION_USER:
            return {
                ...state,
                authenticatingUser: false
            }
        case actionTypes.AUTHENTICATE_USER:
            return {
                ...state,
                profile: action.profile
            }
    }
}