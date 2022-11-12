import * as actionTypes from './actionTypes';
import axios from 'axios';
const APT_CvkWER = 'AIzaSyALRbqgd_UHIFY788iVXPZ0XwQ8uKI_y2w';

export const changeStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const changeSuccess = () => {
    return {
        type: actionTypes.CHANGE_SUCCESS
    };
};

export const changeFail = err => {
    return {
        type: actionTypes.CHANGE_FAIL,
        error: err
    };
};

export const changeUsernameOrEmail = () => {
    return dispatch => {
        dispatch(changeStart())

    };
};

export const resetProgress = () => {
    return dispatch => {
        dispatch(changeStart())
        
    };
};

export const deleteAccount = () => {
    return dispatch => {
        dispatch(changeStart())
        
    };
};