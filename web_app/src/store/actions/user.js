import * as actionTypes from './actionTypes';

export const resetProgressStart = () => {
    return {
        type: actionTypes.RESET_PROGRESS_START
    };
};

export const resetProgressSuccess = () => {
    return {
        type: actionTypes.RESET_PROGRESS_SUCCESS
    };
};

export const resetProgressFail = err => {
    return {
        type: actionTypes.RESET_PROGRESS_FAIL,
        error: err
    };
};

export const deleteAccountStart = () => {
    return {
        type: actionTypes.DELETE_ACCOUNT_START
    };
};

export const deleteAccountSuccess = () => {
    return {
        type: actionTypes.DELETE_ACCOUNT_SUCCESS
    };
};

export const deleteAccountFail = err => {
    return {
        type: actionTypes.DELETE_ACCOUNT_FAIL,
        error: err
    };
};

export const resetProgress = () => {
    return dispatch => {
        dispatch(resetProgressStart());
        dispatch(resetProgressSuccess());
    };
};

export const deleteAccount = () => {
    return dispatch => {
        dispatch(deleteAccountStart());
        dispatch(deleteAccountSuccess());
    };
};

export const fetchUserProgressStart = () => {
    return {
        type: actionTypes.FETCH_USER_PROGRESS_START
    };
};

export const fetchUserProgressSuccess = (userData) => {
    return {
        type: actionTypes.FETCH_USER_PROGRESS_SUCCESS,
        userData: userData
    };
};

export const fetchUserProgressFail = err => {
    return {
        type: actionTypes.FETCH_USER_PROGRESS_FAIL,
        error: err
    };
};

export const fetchUserProgress = (idToken) => {
    return dispatch => {
        dispatch(fetchUserProgressStart())
        dispatch(fetchUserProgressSuccess())
        dispatch(fetchUserProgressFail())
        // const queryParams = '?auth=' + idToken;
        // axios.get( 'https://jstsentences-default-rtdb.firebaseio.com/user1/.json' + queryParams)
        // .then(res => {
        //     dispatch(fetchUserProgressSuccess(res.data));
        // })
        // .catch(err =>
        //     dispatch(fetchUserProgressFail(err.response.data.error))
        // );
    };
};