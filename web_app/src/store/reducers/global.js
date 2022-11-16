import * as actionTypes from '../actions/actionTypes';
import updateObject from '../../util/updateObject';

const initState = {
    fetchedLanguages: null,
    sampleSentences: null,
    loading: false
}

const globalFetchStart = (state, action) => {
    return updateObject(state, {
        fetchedSentences: action.fetchedSentences,
        loading: true
    });
};

const globalFetchSuccess = (state, action) => {
    return updateObject(state, {
        fetchedLanguages: action.fetchedLanguages,
        sampleSentences: action.sampleSentences,
        loading: false
    });
};

const globalFetchFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const reducer = (state = initState, action) => {
    switch(action.type) {
        case actionTypes.GLOBAL_FETCH__START: return globalFetchStart(state, action);
        case actionTypes.GLOBAL_FETCH__SUCCESS: return globalFetchSuccess(state, action);
        case actionTypes.GLOBAL_FETCH__FAIL: return globalFetchFail(state, action);
        default:
            return state;
    }
};

export default reducer;