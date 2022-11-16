import * as actionTypes from './actionTypes';
import axios from 'axios';

export const globalFetchStart = () => {
    return {
        type: actionTypes.GLOBAL_FETCH__START
    };
};

export const globalFetchSuccess = (fetchedLanguages, sampleSentences) => {
    return {
        type: actionTypes.GLOBAL_FETCH__SUCCESS,
        fetchedLanguages: fetchedLanguages,
        sampleSentences: sampleSentences
    };
};

export const globalFetchFail = err => {
    return {
        type: actionTypes.GLOBAL_FETCH__FAIL,
        error: err
    };
};

export const globalFetch = () => {
    return dispatch => {
        dispatch(globalFetchStart());
        axios.get( 'https://jstsentences-default-rtdb.firebaseio.com/global.json?')
        .then(res => {
            // console.log(res.data);
            dispatch(globalFetchSuccess(res.data.availableLanguages, res.data.sampleSentences));
        })
        .catch(err =>
            dispatch(globalFetchFail(err.response.data.error))
        );
    };
};

export const practiceDone = () => {
    return {
        type: actionTypes.PRACTICE_DONE
    };
};