import * as actionTypes from './actionTypes';
import axios from 'axios';

export const globalFetchLanguagesStart = () => {
    return {
        type: actionTypes.GLOBAL_FETCH_LANGUAGES_START
    };
};

export const globalFetchLanguagesSuccess = (fetchedLanguages) => {
    return {
        type: actionTypes.GLOBAL_FETCH_LANGUAGES_SUCCESS,
        fetchedLanguages: fetchedLanguages
    };
};

export const globalFetchLanguagesFail = err => {
    return {
        type: actionTypes.GLOBAL_FETCH_LANGUAGES_FAIL,
        error: err
    };
};

export const globalFetchLanguages = () => {
    return dispatch => {
        dispatch(globalFetchLanguagesStart());
        axios.get( 'https://jstsentences-default-rtdb.firebaseio.com/availableLanguages/.json')
        .then(res => {
            console.log(res.data);
            dispatch(globalFetchLanguagesSuccess(res.data));
        })
        .catch(err =>
            dispatch(globalFetchLanguagesFail(err.response.data.error))
        );
    };
};

export const practiceDone = () => {
    return {
        type: actionTypes.PRACTICE_DONE
    };
};