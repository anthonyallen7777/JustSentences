import * as actionTypes from './actionTypes';
// import axios from '../../axios/axios-auth';
import axios from 'axios';
const APT_CvkWER = 'AIzaSyALRbqgd_UHIFY788iVXPZ0XwQ8uKI_y2w';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (
                    idToken,
                    localId,
                    refreshToken) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: idToken,
        localId: localId,
        refreshToken: refreshToken
    };
};

export const authFail = err => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: err
    };
};

export const logout = () => {
    localStorage.removeItem('idToken');
    localStorage.removeItem('localId');
    localStorage.removeItem('expireDate');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const authTimeoutCheck = () => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, 3600 * 1000);
    }
};

export const authStateCheck = () => {
    return dispatch => {
        const idToken = localStorage.getItem('idToken');
        if (!idToken) {dispatch(logout());}
        else {
            const expireDate = new Date(localStorage.getItem('expireDate'));
            if (expireDate > new Date()) {
                console.log("TEST111");
                const localId = localStorage.getItem('localId');
                dispatch(authSuccess(idToken, localId));
                dispatch(authTimeoutCheck(expireDate.getSeconds()-new Date().getSeconds()));
            } else {
                console.log("TEST2222");
            }
        }
    }
}

export const authenticate = (
        // username,
        email,
        password,
        signingUp
    ) => {
    return dispatch => {
        dispatch(authStart());
        const postData = {
            // username: username,
            email: email,
            password: password
        }
        //change the api url based upon what form the user submitted from
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + APT_CvkWER;
        if (!signingUp) {
            console.log("SIGNING IN");
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + APT_CvkWER;
        }
        //sign the user up or in
        setTimeout(() => {
            axios.post(url, postData)
            .then(res => {
                console.log(res);
                const expireDate = new Date(new Date().getTime()+3600*1000);
                localStorage.setItem('idToken', res.data.idToken);
                localStorage.setItem('localId', res.data.localId);
                localStorage.setItem('expireDate', expireDate);
                dispatch(authSuccess(res.data.idToken,
                                res.data.localId,
                                res.data.refreshToken));
                //send the user a verification email

                //firebase default expiration time is 1hr
                dispatch(authTimeoutCheck());
                return res.data;
            })
            .then(resData => {
                url = 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=' + APT_CvkWER;
                axios.post(url, 
                    {
                        "requestType": "VERIFY_EMAIL", "idToken": resData.idToken
                    }
                )
                .then(verificationRes => {
                    console.log(verificationRes);
                })
                .catch(err => {
                    console.log(err);
                });
            })
            .catch(err => {
                console.log(err);
                dispatch(authFail(err.response.data.error));
            });
        }, 2000);
        
    }
}