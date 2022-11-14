import React, { useEffect, useState } from "react";
import classes from './Auth.module.css';

import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";
import Spinner from '../UI/Spinner/Spinner';

import { Navigate } from "react-router";

//redux
import { connect } from "react-redux";

const Auth = (props) => {
    const [wantToSignUp, setWantToSignUp] = useState(false);
    const [loadingForm, setLoadingForm] = useState(true);

    const onClickHandler = (update) => {
        if (wantToSignUp !== update) {
            setWantToSignUp(prevState => !prevState);
        }
    };

    useEffect(() => {
        setLoadingForm(false);
    }, []);
    
    let form = null;
    let activeStyle = null;
    if (!wantToSignUp) {
        activeStyle = classes.SignInActive;
        form = <SignIn />;
    } else {
        activeStyle = classes.SignUpActive;
        form = <SignUp />;
    }

    let signUpSignIn = <p>Loading...</p>;
    
    if (!loadingForm) {
        signUpSignIn = (
            <React.Fragment>
                <div className={[classes.Titles, activeStyle].join(' ')}>
                    <div className={classes.Button}
                    onClick={() => onClickHandler(false)}>
                        <p>Sign In</p>
                    </div>
                    <div className={classes.Button}
                    onClick={() => onClickHandler(true)}>
                        <p>Sign Up</p>
                    </div>
                </div>
                <div className={classes.FormContainer}>
                    {form}
                </div>
            </React.Fragment>
        );
    }

    if (props.loading) {
        form = <Spinner />;
    }

    let errMessage = null;
    if (props.error) {
        errMessage = <p>{props.error.message}</p>;
    }

    let authRedirect = null;
    if (props.isLoggedIn) {
        authRedirect = <Navigate to="/base" state={{signingUp: props.signingUp}} />
    }

    return (
        <div className={classes.AuthContainer}>
            <div className={classes.signUpSignInContainer}>
                {authRedirect}
                {errMessage}
                {signUpSignIn}
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        signingUp: state.authenticate.signingUp,
        isLoggedIn: state.authenticate.idToken !== null,
        loading: state.authenticate.loading,
        error: state.authenticate.error,
    }
}

export default connect(mapStateToProps)(Auth);