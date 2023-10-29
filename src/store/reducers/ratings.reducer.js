import * as actionTypes from '../actions/action.types';

const initialState = {
    ratings: [],
    fetchingRatings: false,
    addingRating: false,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.START_FETCHING_PROVIDER_RATINGS:
            return {
                ...state,
                fetchingRatings: true
            }
        case actionTypes.END_FETCHING_PROVIDER_RATINGS:
            return {
                ...state,
                fetchingRatings: false
            }
        case actionTypes.FETCH_PROVIDER_RATINGS:
            return {
                ...state,
                ratings: action.ratings
            }
        case actionTypes.START_ADDING_PROVIDER_RATING:
            return {
                ...state,
                addingRating: true
            }
        case actionTypes.END_ADDING_PROVIDER_RATING:
            return {
                ...state,
                addingRating: false
            }
        case actionTypes.ADD_PROVIDER_RATING:
            // const exists = state.ratings.filter(r => r.ratingId == action.rating.ratingId).length > 0;
            // const ratingsCopy = [...state.ratings];
            // const indexInCurrentWorkspaceFilteredTasks = ratingsCopy.indexOf(r => r.ratingId == action.rating.ratingId);
            // indexInCurrentWorkspaceFilteredTasks !== -1 && (state.ratings[indexInCurrentWorkspaceFilteredTasks] = action.rating);
            // console.log(exists);
            // return {
            //     ...state,
            //     ratings: indexInCurrentWorkspaceFilteredTasks !== -1 ? [...JSON.parse(JSON.stringify(state.ratings))] : [...JSON.parse(JSON.stringify(state.ratings)), action.rating]
            // }
            const ratingsCopy = [...JSON.parse(JSON.stringify(state.ratings))];
            console.log(ratingsCopy);
            const indexOfExistedRating = ratingsCopy.filter(r => r.ratingId == action.rating.ratingId).length;
            if(indexOfExistedRating > 0) {
                console.log(indexOfExistedRating);
                ratingsCopy[indexOfExistedRating - 1] = action.rating;

                return {
                    ...state,
                    ratings: [...JSON.parse(JSON.stringify(ratingsCopy))]
                }
            }else {
                console.log(indexOfExistedRating);
                return {
                    ...state,
                    ratings: [...ratingsCopy, action.rating]
                }
            }
        default:
            return state
    }
}