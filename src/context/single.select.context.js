import React, { createContext, useReducer } from "react";

const actionTypes = {
    OPEN_POPUP: "OPEN_POPUP",
    CLOSE_POPUP: "CLOSE_POPUP",
    CHANGE_PROPS: "CHANGE_PROPS",
    CHANGE_SEARCHING: 'CHANGE_SEARCHING'
}

const initialState = {
    open: false,
}

const selectReducer = (state, action) => {
    switch (action.type) {
        case actionTypes.OPEN_POPUP:
            return {
                ...state,
                open: true
            }
        case actionTypes.CLOSE_POPUP:
            console.log('ladsjflkajfd')
            return {
                ...state,
                open: false
            }
        case actionTypes.CHANGE_PROPS:
            return {
                ...state,
                props: action.props
            }
        case actionTypes.CHANGE_SEARCHING:
            return {
                ...state,
                searching: action.searching
            }
        default:
            return state;
    }
}

const selectActions = {
    openPopup: (dispatch) => {
        console.log('Opening!')
        dispatch({type: actionTypes.OPEN_POPUP})
    },
    closePopup: dispatch => {
        dispatch({type: actionTypes.CLOSE_POPUP})
    },
    changeProps: (dispatch, props) => {
        dispatch({type: actionTypes.CHANGE_PROPS, props})
    },
    changeSearching: (dispatch, searching) => {
        dispatch({type: actionTypes.CHANGE_SEARCHING, searching})
    }

}

const SelectContext = createContext();

export const SelectContextProvider = ({ children }) => {
    const [select, dispatch] = useReducer(selectReducer, initialState);

    return (
        <SelectContext.Provider
            value={{
                select,
                changeProps: props => selectActions.changeProps(dispatch, props),
                openPopup: () => selectActions.openPopup(dispatch),
                closePopup: () => selectActions.closePopup(dispatch),
                changeSearching: searching => selectActions.changeSearching(dispatch, searching)
            }}
        >
            {
                children
            }
        </SelectContext.Provider>
    )
}

export const useSelectContext = () => React.useContext(SelectContext);