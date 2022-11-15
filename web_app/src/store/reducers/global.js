import * as actionTypes from '../actions/actionTypes';
import updateObject from '../../util/updateObject';

const initState = {
    fetchedLanguages: null,
    loading: false
}

const globalFetchLanguagesStart = (state, action) => {
    return updateObject(state, {
        fetchedSentences: action.fetchedSentences,
        loading: true
    });
};

const globalFetchLanguagesSuccess = (state, action) => {
    return updateObject(state, {
        fetchedLanguages: action.fetchedLanguages,
        loading: false
    });
};

const globalFetchLanguagesFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const reducer = (state = initState, action) => {
    switch(action.type) {
        case actionTypes.GLOBAL_FETCH_LANGUAGES_START: return globalFetchLanguagesStart(state, action);
        case actionTypes.GLOBAL_FETCH_LANGUAGES_SUCCESS: return globalFetchLanguagesSuccess(state, action);
        case actionTypes.GLOBAL_FETCH_LANGUAGES_FAIL: return globalFetchLanguagesFail(state, action);
        default:
            return state;
    }
};

export default reducer;