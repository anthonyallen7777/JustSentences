import * as actionTypes from '../actions/actionTypes';

const initState = {
    userId: null
}

const authStart = (state) => {
    return state;
}

const reducer = (state = initState, action) => {
    switch(action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        default:
            return state;
    }
};

export default reducer;