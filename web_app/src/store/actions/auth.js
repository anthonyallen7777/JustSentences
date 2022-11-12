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
                    refreshToken,
                    displayName) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: idToken,
        localId: localId,
        refreshToken: refreshToken,
        displayName: displayName
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
    localStorage.removeItem("shouldWeShowVerifyBanner");
    localStorage.removeItem("firstTimeSigningUp");
    localStorage.removeItem('displayName');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const authTimeoutCheck = (expireDate) => {
    return dispatch => {
        //logout after expiration date is reached
        setTimeout(() => {
            dispatch(logout());
        }, expireDate * 1000);
    }
};

export const authStateCheck = (isUpdatingUserInfro) => {
    return dispatch => {
        const idToken = localStorage.getItem('idToken');
        if (!idToken) {dispatch(logout());}
        else {
            const expireDate = new Date(localStorage.getItem('expireDate'));
            if (expireDate <= new Date()) {
                dispatch(logout());
            } else {
                const localId = localStorage.getItem('localId');
                const refreshToken = localStorage.getItem('refreshToken');
                const displayName = localStorage.getItem('displayName');
                dispatch(authSuccess(idToken, localId, refreshToken, displayName));
                dispatch(authTimeoutCheck((expireDate.getTime() - new Date().getTime())/ 1000));
            }
        }
    }
}

export const authenticate = (
        username,
        email,
        password,
        signingUp
    ) => {
    return dispatch => {
        dispatch(authStart());
        const postData = {
            email: email,
            password: password,
            "returnSecureToken": true
        }
        let shouldWeShowVerifyBanner = signingUp;
        //change the api url based upon what form the user submitted from
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + APT_CvkWER;

        //SIGN IN
        if (!signingUp) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + APT_CvkWER;

            setTimeout(() => {
                // let signInData = null;
                axios.post(url, postData)
                .then(res => {
                    return res.data;
                })
                //check if the users email is verified
                .then(resData => {
                    url = 'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=' + APT_CvkWER;
                    axios.post(url, 
                        {
                            "idToken": resData.idToken
                        }
                    )
                    .then(userAccountInfoRes => {
                        // console.log(userAccountInfoRes.data);
                        localStorage.setItem('displayName', userAccountInfoRes.data.users[0].displayName);
                        shouldWeShowVerifyBanner = userAccountInfoRes.data.users[0].emailVerified;
                        localStorage.setItem("shouldWeShowVerifyBanner", !shouldWeShowVerifyBanner);
                        localStorage.setItem("firstTimeSigningUp", false);
                        const expireDate = new Date(new Date().getTime() + (resData.expiresIn * 1000))
                        localStorage.setItem('idToken', resData.idToken);
                        localStorage.setItem('localId', resData.localId);
                        localStorage.setItem('expireDate', expireDate);
                        
                        dispatch(authTimeoutCheck(resData.expiresIn));
                        dispatch(authSuccess(resData.idToken,
                                        resData.localId,
                                        resData.refreshToken,
                                        userAccountInfoRes.data.users[0].displayName));
                    })
                    .catch(err => {
                        console.log(err);
                    });
                })
                .catch(err => {
                    console.log(err);
                    dispatch(authFail(err.response.data.error));
                });
            }, 1000);
        }
        //SIGN UP
        else {
            setTimeout(() => {
                axios.post(url, postData)
                .then(res => {
                    return res.data;
                })
                //add username to display name
                .then(resData => {
                    url = 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=' + APT_CvkWER;
                    axios.post(url, 
                        {
                            "idToken": resData.idToken,
                            "displayName": username,
                        }
                    )
                    .then(updatedAccRes => {
                        localStorage.setItem('displayName', updatedAccRes.data.displayName);
                        localStorage.setItem("shouldWeShowVerifyBanner", shouldWeShowVerifyBanner);
                        localStorage.setItem("firstTimeSigningUp", true);
                        const expireDate = new Date(new Date().getTime() + (resData.expiresIn * 1000))
                        localStorage.setItem('idToken', resData.idToken);
                        localStorage.setItem('localId', resData.localId);
                        localStorage.setItem('expireDate', expireDate);
                        dispatch(authSuccess(resData.idToken,
                                        resData.localId,
                                        resData.refreshToken,
                                        updatedAccRes.data.displayName));
                        dispatch(authTimeoutCheck(resData.expiresIn));
                    })
                    .catch(err => {
                        console.log(err);
                    });
                    return resData
                })
                //only send verification email if
                //1. This is the first time the user is sign up
                //2. The user is not new but they haven't verified yet
                .then(resData => {
                    url = 'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=' + APT_CvkWER;
                    axios.post(url, 
                        {
                            "requestType": "VERIFY_EMAIL", "idToken": resData.idToken
                        }
                    )
                    .then(VerifySendToEmailRes => {
                        console.log(VerifySendToEmailRes);
                    })
                    .catch(err => {
                        console.log(err);
                    });
                })
                .catch(err => {
                    console.log(err);
                    dispatch(authFail(err.response.data.error));
                });
            }, 1000);
        }
        
    }
}

export const checkVerification = () => {
    return {
    type: actionTypes.CHECK_VERIFY,
    shouldWeShowVerifyBanner: localStorage.getItem('shouldWeShowVerifyBanner'),
    firstTimeSigningUp: localStorage.getItem('firstTimeSigningUp'),
    };
};

export const changeStart = () => {
    return {
        type: actionTypes.CHANGE_USERNAME_OR_EMAIL_START
    };
};

export const changeSuccess = (idToken,
                            refreshToken,
                            displayName) => {
    return {
        type: actionTypes.CHANGE_USERNAME_OR_EMAIL_SUCCESS,
        idToken: idToken,
        refreshToken: refreshToken,
        displayName: displayName
    };
};

export const changeFail = err => {
    return {
        type: actionTypes.CHANGE_USERNAME_OR_EMAIL_FAIL,
        error: err
    };
};

export const changeUsernameOrEmail = (whatAreWeChanging, newUsernameOrEmail) => {
    return dispatch => {
        dispatch(changeStart());
        setTimeout(() => {
            let dataToChange = null;
            if (whatAreWeChanging === 'email') {dataToChange = whatAreWeChanging} else {dataToChange = 'displayName'}
            console.log(typeof dataToChange, typeof newUsernameOrEmail)
            //change the user's username
            const url = 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=' + APT_CvkWER;
            axios.post(url,
                {
                    "idToken": localStorage.getItem('idToken'),
                    [dataToChange]: newUsernameOrEmail,
                    returnSecureToken: true
                }
            )
            .then(updatedAccRes => {
                console.log(updatedAccRes);
                localStorage.setItem('idToken', updatedAccRes.data.idToken);
                localStorage.setItem('refreshToken', updatedAccRes.data.refreshToken);
                localStorage.setItem('displayName', updatedAccRes.data.displayName);
                dispatch(changeSuccess(updatedAccRes.data.idToken,
                    updatedAccRes.data.refreshToken,
                    updatedAccRes.data.displayName));
            }).catch(err => {
                console.log(err);
                dispatch(changeFail());
            })
        }, 1000);
        
    };
};