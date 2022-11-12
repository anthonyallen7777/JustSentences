import * as actionTypes from '../actions/actionTypes';
import updateObject from '../../util/updateObject';

const initState = {
    error: null,
    loading: false
}

const changeStart = (state) => {
    return updateObject(state, {
        loading: true
    });
};

const changeSuccess = (state, action) => {
    return updateObject(state, {
        loading: false
    });
};

const changeFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const reducer = (state = initState, action) => {
    switch(action.type) {
        case actionTypes.CHANGE_START: return changeStart(state, action);
        case actionTypes.CHANGE_SUCCESS: return changeSuccess(state, action);
        case actionTypes.CHANGE_FAIL: return changeFail(state, action);
        default:
            return state;
    }
};

export default reducer;