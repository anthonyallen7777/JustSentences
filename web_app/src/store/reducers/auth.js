import * as actionTypes from '../actions/actionTypes';
import updateObject from '../../util/updateObject';

const initState = {
    idToken: null,
    localId: null,
    refreshToken: null,
    error: null,
    loading: false,
    shouldWeShowVerifyBanner: null,
    firstTimeSigningUp: null
}

const authStart = (state) => {
    return updateObject(state, {
        error: null,
        loading: true
    });
};

const authSuccess = (state, action) => {
    return updateObject(state, {
        idToken: action.idToken,
        localId: action.localId,
        refreshToken: action.refreshToken,
        error: null,
        loading: false
    });
};

const authLogout = (state) => {
    return updateObject(state, {token: null, userId: null});
}

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const checkVerify = (state, action) => {
    return updateObject(state, {
        shouldWeShowVerifyBanner: action.shouldWeShowVerifyBanner,
        firstTimeSigningUp: action.firstTimeSigningUp
    });
}

const reducer = (state = initState, action) => {
    switch(action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.CHECK_VERIFY: return checkVerify(state, action);
        default:
            return state;
    }
};

export default reducer;