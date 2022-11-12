import * as actionTypes from './actionTypes';
// import axios from '../../axios/axios-auth';
import axios from 'axios';
const APT_CvkWER = 'AIzaSyALRbqgd_UHIFY788iVXPZ0XwQ8uKI_y2w';

export const fetchStart = () => {
    return {
        type: actionTypes.FETCH_START
    };
};

export const fetchSuccess = (fetchedSentences) => {
    return {
        type: actionTypes.FETCH_SUCCESS,
        fetchedSentences: fetchedSentences
    };
};

export const fetchSentences = (idToken) => {
    return dispatch => {
        dispatch(fetchStart())

        const queryParams = '?auth=' + idToken;
        axios.get( 'https://jstsentences-default-rtdb.firebaseio.com/testData/.json' + queryParams)
        .then(res => {
            // console.log(res.data);
            dispatch(fetchSuccess(res.data));
        });
    };
};

export const practiceDone = () => {
    return {
        type: actionTypes.PRACTICE_DONE
    };
};