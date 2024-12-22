import React, { useReducer } from "react";

// Define initial state
const initialState = {
    Gender: false,
    Name: false,
    Age: false,
    Location: false,
};

// Define action types
const actionTypes = {
    SET_GENDER: "SET_GENDER",
    SET_NAME: "SET_NAME",
    SET_LOCATION: "SET_LOCATION",
    SET_AGE: "SET_AGE",
    TOGGLE_GENDER: "TOGGLE_GENDER",
    TOGGLE_NAME: "TOGGLE_NAME",
    TOGGLE_AGE: "TOGGLE_AGE",
    TOGGLE_LOCATION: "TOGGLE_LOCATION",
};

// Reducer function
function focusReducer(state, action) {
    switch (action.type) {
        case actionTypes.SET_GENDER:
            if (state.Gender == action.payload)
                return state
            return { Gender: action.payload };
        case actionTypes.SET_NAME:
            if (state.Name == action.payload)
                return state
            return { Name: action.payload };
        case actionTypes.SET_AGE:
            if (state.Age == action.payload)
                return state
            return { Age: action.payload}
        case actionTypes.SET_LOCATION:
            return { ...state, Location: action.payload };
        case actionTypes.TOGGLE_GENDER:
            return { ...state, Gender: !state.Gender };
        case actionTypes.TOGGLE_NAME:
            return { ...state, Name: !state.Name };
        case actionTypes.TOGGLE_AGE:
            return { ...state, Age: !state.Age };    
        case actionTypes.TOGGLE_LOCATION:
            return { ...state, Location: !state.Location };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

// Custom Hook
function useFocusReducer() {
    const [Focused, dispatch] = useReducer(focusReducer, initialState);

    // Action creators for convenience
    const setGenderFocus = (value) => dispatch({ type: actionTypes.SET_GENDER, payload: value });
    const setNameFocus = (value) => dispatch({ type: actionTypes.SET_NAME, payload: value });
    const setLocationFocus = (value) => dispatch({ type: actionTypes.SET_LOCATION, payload: value });
    const setAgeFocus = (value) => dispatch({type: actionTypes.SET_AGE, payload: value})
    const toggleGenderFocus = () => dispatch({ type: actionTypes.TOGGLE_GENDER });
    const toggleNameFocus = () => dispatch({ type: actionTypes.TOGGLE_NAME });
    const toggleLocationFocus = () => dispatch({ type: actionTypes.TOGGLE_LOCATION });
    const FocusedAny = () => (Focused.Age || Focused.Name || Focused.Gender || Focused.Location)

    return {
        Focused,
        FocusedActions: {
            setGenderFocus,
            setNameFocus,
            setAgeFocus,
            setLocationFocus,
            toggleGenderFocus,
            toggleNameFocus,
            toggleLocationFocus,
            FocusedAny,
        },
    };
}

export default useFocusReducer;
