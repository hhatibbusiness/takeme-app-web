import * as actionTypes from '../actions/action.types';

const initialState = {
    languages: [
        // {
        //     englishName: 'fdlkajfdlakjf',
        //     name: 'normal name',
        //     id: 1
        // },
        // {
        //     englishName: 'fdlkajfdlakjf',
        //     name: 'normal name',
        //     id: 2
        // },
        // {
        //     englishName: 'fdlkajfdlakjf',
        //     name: 'normal name',
        //     id: 3
        //
        // },
        // {
        //     englishName: 'fdlkajfdlakjf',
        //     name: 'normal name',
        //     id: 4
        //
        // },
        // {
        //     englishName: 'fdlkajfdlakjf',
        //     name: 'normal name',
        //     id: 5
        // },
        // {
        //     englishName: 'fdlkajfdlakjf',
        //     name: 'normal name',
        //     id: 6
        //
        // },
        // {
        //     englishName: 'fdlkajfdlakjf',
        //     name: 'normal name',
        //     id: 7
        //
        // },
        // {
        //     englishName: 'fdlkajfdlakjf',
        //     name: 'normal name',
        //     id: 7
        //
        // },
        // {
        //     englishName: 'fdlkajfdlakjf',
        //     name: 'normal name',
        //     id: 7
        //
        // },
        // {
        //     englishName: 'fdlkajfdlakjf',
        //     name: 'normal name',
        //     id: 7
        //
        // },
        // {
        //     englishName: 'fdlkajfdlakjf',
        //     name: 'normal name',
        //     id: 7
        //
        // },
        // {
        //     englishName: 'fdlkajfdlakjf',
        //     name: 'normal name',
        //     id: 7
        //
        // },
        // {
        //     englishName: 'fdlkajfdlakjf',
        //     name: 'normal name',
        //     id: 7
        //
        // },
        // {
        //     englishName: 'fdlkajfdlakjf',
        //     name: 'normal name',
        //     id: 7
        //
        // },
        // {
        //     englishName: 'fdlkajfdlakjf',
        //     name: 'normal name',
        //     id: 7
        //
        // },
        // {
        //     englishName: 'fdlkajfdlakjf',
        //     name: 'normal name',
        //     id: 7
        //
        // },
        // {
        //     englishName: 'fdlkajfdlakjf',
        //     name: 'normal name',
        //     id: 8
        //
        // },
        // {
        //     englishName: 'fdlkajfdlakjf',
        //     name: 'normal name',
        //     id: 9
        //
        // },
    ],
    fetchingLanguages: false,
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
}


export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.START_FETCHING_LANGUAGES:
            return {
                ...state,
                fetchingLanguages: true
            }
        case actionTypes.END_FETCHING_LANGUAGES:
            return {
                ...state,
                fetchingLanguages: false
            }
        case actionTypes.FETCH_LANGUAGES:
            return {
                ...state,
                languages: [...state.languages, ...action.languages],
                page: state.page + 1,
                more: action.languages.length >= 10
            }
        case actionTypes.START_ADDING_LANGUAGE:
            return {
                ...state,
                adding: true
            }
        case actionTypes.END_ADDING_LANGUAGE:
            return {
                ...state,
                adding: false
            }
        case actionTypes.ADD_LANGUAGE:
            return {
                ...state,
                languages: [action.language, ...state.languages]
            }
        case actionTypes.START_EDITING_LANGUAGE:
            return {
                ...state,
                editing: true
            }
        case actionTypes.END_EDITING_LANGUAGE:
            console.log('end Editing!');
            return {
                ...state,
                editing: false
            }
        case actionTypes.EDIT_LANGUAGE:
            if (state.sortType == 'NEWEST') {
                const languagesCopy = state.languages.filter(l => l.id != action.language.id);
                return {
                    ...state,
                    languages: [action.language, ...languagesCopy]
                }

            } else {
                const languageIndex = state.languages.findIndex(l => l.id == action.language.id);
                state.languages[languageIndex] = action.language;
                return {
                    ...state,
                    languages: [...JSON.parse(JSON.stringify(state.languages))]
                }

            }
        case actionTypes.START_DELETING_LANGUAGE:
            return {
                ...state,
                deleting: true
            }
        case actionTypes.END_DELETING_LANGUAGE:
            return {
                ...state,
                deleting: false
            }
        case actionTypes.DELETE_LANGUAGE:
            const stateCopy = state.languages.filter(l => l.id != action.languageId);
            const searchResultsCopy = state.searchResults.filter(r => r.id != action.languageId);
            return {
                ...state,
                languages: [...JSON.parse(JSON.stringify(stateCopy))],
                searchResults: [...JSON.parse(JSON.stringify(searchResultsCopy))]
            }
        case actionTypes.CHANGE_SORT_LANGUAGES:
            return {
                ...state,
                languages: [],
                sortType: action.sortType,
                page: 0,
                more: true,
                searchResults: [],
                moreSearchResults: true,
                searchResultsPage: 0
            }
        case actionTypes.START_SEARCHING_LANGUAGES:
            return {
                ...state,
                searching: true,
                searchResultsPage: 0
            }
        case actionTypes.END_SEARCHING_LANGUAGES:
            return {
                ...state,
                searching: false
            }
        case actionTypes.SEARCH_LANGUAGES:
            return {
                ...state,
                searchResults: action.page == 0 ? [...action.searchResults] : [...state.searchResults, ...action.searchResults],
                moreSearchResults: action.searchResults.length >= 10,
                searchResultsPage: state.searchResultsPage + 1,
                searchKey: action.searchKey
            }
        case actionTypes.OPEN_SEARCH_LANGUAGES:
            return {
                ...state,
                search: true
            }
        case actionTypes.CLOSE_SEARCH_LANGUAGES:
            return {
                ...state,
                search: false
            }
        default:
            return state;
    }
}