import React from "react";
import classes from './Auth.module.css';

import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";
import Spinner from '../UI/Spinner/Spinner';

import { Navigate } from "react-router";

//redux
import { connect } from "react-redux";

const Auth = (props) => {
    let forms = (
        <React.Fragment>
            <SignIn />
            <SignUp />
        </React.Fragment>
    );

    if (props.loading) {
        forms = <Spinner />
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
        <div className={classes.FormsContainer}>
            {authRedirect}
            {errMessage}
            {forms}
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