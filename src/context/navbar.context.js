import React, { createContext, useReducer, useContext } from 'react';
// import MidText from '../components/Navbar/MidText/MidText';

const initialState = {
    MidText: '',
    searchActive: true
}

const actionTypes = {
    CHANGE_NAVBAR_TEXT: "CHANGE_NAVBAR_TEXT",
    CHANGE_SEARCHACTIVE_VALUE: "CHANGE_SEARCHACTIVE_VALUE"
}


const navbarReducer = (state, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_NAVBAR_TEXT:
            return {
                ...state,
                MidText: action.MidText
            }
        case actionTypes.CHANGE_SEARCHACTIVE_VALUE:
            return {
                ...state,
                searchActive: action.searchActive
            }
        default:
            return state;
    }
}

const navbarActions = {
    changeNavMidText: (dispatch, pathname) => {
        if (pathname == '/languages') {
            return dispatch({type: actionTypes.CHANGE_NAVBAR_TEXT, MidText: 'اللغات'})            
        } else if (pathname == '/languages/add') {
            return dispatch({ type: actionTypes.CHANGE_NAVBAR_TEXT, MidText: 'اضافة لغة' })
        } else if (pathname.includes('/languages/add/duplicate')) {
            return dispatch({type: actionTypes.CHANGE_NAVBAR_TEXT, MidText: 'اضافة لغة'})
        } else if (pathname.includes('/languages/edit')) {
            return dispatch({type: actionTypes.CHANGE_NAVBAR_TEXT, MidText: 'تعديل لغة'})
        } else if (pathname == '/locales' || pathname == '/locales/') {
            return dispatch({type: actionTypes.CHANGE_NAVBAR_TEXT, MidText: 'اللهجات'})
        } else if (pathname == '/locales/add') {
            return dispatch({ type: actionTypes.CHANGE_NAVBAR_TEXT, MidText: 'اضافة لهجة' })
        } else if (pathname.includes('/locales/add/duplicate')) {
            return dispatch({type: actionTypes.CHANGE_NAVBAR_TEXT, MidText: 'اضافة لهجة'})
        } else if (pathname.includes('/locales/edit')) {
            return dispatch({type: actionTypes.CHANGE_NAVBAR_TEXT, MidText: 'تعديل لهجة'})
        } else if (pathname == '/countries') {
            return dispatch({type: actionTypes.CHANGE_NAVBAR_TEXT, MidText: 'الدول'})
        } else if (pathname == '/countries/add') {
            return dispatch({type: actionTypes.CHANGE_NAVBAR_TEXT, MidText: 'اضافة الدول'})
        } else if (pathname.includes("/countries/add/duplicate")) {
            return dispatch({type: actionTypes.CHANGE_NAVBAR_TEXT, MidText: 'اضافة الدول'})
        } else if (pathname.includes("/countries/edit")) {
            return dispatch({type: actionTypes.CHANGE_NAVBAR_TEXT, MidText: 'تعديل الدول'})
        } else if (pathname == '/places') {
            return dispatch({type: actionTypes.CHANGE_NAVBAR_TEXT, MidText: 'الاماكن'})
        } else if (pathname == '/places/add') {
            return dispatch({type: actionTypes.CHANGE_NAVBAR_TEXT, MidText: 'اضافة مكان'})
        } else if (pathname.includes("/places/add/duplicate")) {
            return dispatch({type: actionTypes.CHANGE_NAVBAR_TEXT, MidText: 'تكرار مكان'})
        } else if (pathname.includes("/places/edit")) {
            return dispatch({type: actionTypes.CHANGE_NAVBAR_TEXT, MidText: 'تعديل مكان'})
        } else if (pathname == '/backup') {
            return dispatch({type: actionTypes.CHANGE_NAVBAR_TEXT, MidText: 'Backup'})
        }
    },
    changeSearchActive: (dispatch, searchActive) => {
        dispatch({type: actionTypes.CHANGE_SEARCHACTIVE_VALUE, searchActive})
    }
}

const navbarContext = createContext();

export const NavbarProvider = ({ children }) => {
    const [state, dispatch] = useReducer(navbarReducer, initialState);


    return (
        <navbarContext.Provider value={{state, changeMidText: (pathname) => navbarActions.changeNavMidText(dispatch, pathname), changeSearchActive: (searchActive) => navbarActions.changeSearchActive(dispatch, searchActive)}} >
            {children}
        </navbarContext.Provider>
    )
}

export const useNavbarContext = () => useContext(navbarContext);