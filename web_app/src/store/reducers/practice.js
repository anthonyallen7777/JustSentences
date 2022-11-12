import * as actionTypes from '../actions/actionTypes';
import updateObject from '../../util/updateObject';

const initState = {
    fetchedSentences: null,
    loading: false
}

const fetchStart = (state, action) => {
    return updateObject(state, {
        fetchedSentences: action.fetchedSentences,
        loading: true
    });
};

const fetchSuccess = (state, action) => {
    return updateObject(state, {
        fetchedSentences: action.fetchedSentences,
        loading: false
    });
};

const reducer = (state = initState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_START: return fetchStart(state, action);
        case actionTypes.FETCH_SUCCESS: return fetchSuccess(state, action);
        default:
            return state;
    }
};

export default reducer;