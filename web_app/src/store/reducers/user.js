import * as actionTypes from '../actions/actionTypes';
import updateObject from '../../util/updateObject';

const initState = {
    error: null,
    loading: false,
    userData: null
}

const resetProgressStart = (state) => {
    return updateObject(state, {
        loading: true
    });
};

const resetProgressSuccess = (state, action) => {
    return updateObject(state, {
        loading: false
    });
};

const resetProgressFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const deleteAccountStart = (state) => {
    return updateObject(state, {
        loading: true
    });
};

const deleteAccountSuccess = (state, action) => {
    return updateObject(state, {
        loading: false
    });
};

const deleteAccountFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const fetchUserProgressStart = (state) => {
    return updateObject(state, {
        loading: true
    });
};

const fetchUserProgressSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        userData: action.userData
    });
};

const fetchUserProgressFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const reducer = (state = initState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_USER_PROGRESS_START: return fetchUserProgressStart(state, action);
        case actionTypes.FETCH_USER_PROGRESS_SUCCESS: return fetchUserProgressSuccess(state, action);
        case actionTypes.FETCH_USER_PROGRESS_FAIL: return fetchUserProgressFail(state, action);
        case actionTypes.RESET_PROGRESS_START: return resetProgressStart(state, action);
        case actionTypes.RESET_PROGRESS_SUCCESS: return resetProgressSuccess(state, action);
        case actionTypes.RESET_PROGRESS_FAIL: return resetProgressFail(state, action);
        case actionTypes.DELETE_ACCOUNT_START: return deleteAccountStart(state, action);
        case actionTypes.DELETE_ACCOUNT_SUCCESS: return deleteAccountSuccess(state, action);
        case actionTypes.DELETE_ACCOUNT_FAIL: return deleteAccountFail(state, action);
        default:
            return state;
    }
};

export default reducer;