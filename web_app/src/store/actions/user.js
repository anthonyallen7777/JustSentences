import * as actionTypes from './actionTypes';
import axios from 'axios';
const APT_CvkWER = 'AIzaSyALRbqgd_UHIFY788iVXPZ0XwQ8uKI_y2w';

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