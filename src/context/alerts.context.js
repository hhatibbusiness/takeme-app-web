import React, { createContext, useEffect, useReducer } from 'react';
import { v4 as uuid } from 'uuid';

const initialState = [];

const actionTypes = {
    SET_ALERT: "SET_ALERT",
    REMOVE_ALERT: "REMOVE_ALERT",
    CLEAR_POPUP: 'CLEAR_POPUP'
};


const alertReducer = (state, action) => {
    switch (action.type) {
        case actionTypes.SET_ALERT:
            return [ action.alert];
        case actionTypes.REMOVE_ALERT:
            return state.filter(alert => alert.id != action.id);
        case actionTypes.CLEAR_POPUP:
            return []
        default:
            return state;
    }
}

const alertsActions = {
    addAlert: (dispatch, data) => {
        const id = uuid();
        dispatch({
            type: actionTypes.SET_ALERT,
            alert: {
                msg: data.msg,
                alertType: data.alertType,
                id
            }
        });
    },
    closeAlert: (dispatch, data) => {
        dispatch({type: actionTypes.REMOVE_ALERT, id: data.id})
    },
    clearAlert: (dispatch) => {
        dispatch({type: actionTypes.CLEAR_POPUP})
    }
}


const alertsContext = createContext();

const AlertProvider = ({ children }) => {
    const [alerts, dispatch] = useReducer(alertReducer, initialState)

    return (
        <alertsContext.Provider
            value={{
                alerts,
                addAlert: data => alertsActions.addAlert(dispatch, data),
                closeAlert: data => alertsActions.closeAlert(dispatch, data),
                clearAlert: () => alertsActions.clearAlert(dispatch)
            }}
        >
            {
                children
            }
        </alertsContext.Provider>
    )
}

export const useAlertContext = () => React.useContext(alertsContext);

export default AlertProvider;