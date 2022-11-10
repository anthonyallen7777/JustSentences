import * as actionTypes from './actionTypes';
// import axios from '../../axios/axios-auth';
import axios from 'axios';
const APT_CvkWER = 'AIzaSyALRbqgd_UHIFY788iVXPZ0XwQ8uKI_y2w';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    };
};

export const authFail = err => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: err
    };
};

export const authenticate = (
        // username,
        email,
        password,
        signingUp
    ) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            // username: username,
            email: email,
            password: password
        }
        let signUpResData= null;
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + APT_CvkWER;
        if (!signingUp) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + APT_CvkWER;
        }
        //sign the user up
        axios.post(url, authData)
        .then(res => {
            console.log(res);
            signUpResData = res.data;
            dispatch(authSuccess(res.data));
        })
        .catch(err => {
            console.log(err);
            dispatch(authFail(err));
        });
    }
}