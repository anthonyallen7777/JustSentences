import React, { useState } from "react";
import classes from './SignUp.module.css';

//redux import actions from auth action creator
import * as actions from '../../../store/actions/index';
import { connect } from "react-redux";

const SignUp = (props) => {
    const [enteredUsername, setUsername] = useState('Username');
    const [enteredEmail, setEmail] = useState('Email');
    const [enteredPassword, setPassword] = useState('');
    const submitHandler = event => {
        event.preventDefault();
        props.onAuthenticate(
            enteredUsername,
            enteredEmail,
            enteredPassword,
            true);
    }

    const setEnteredValue = (event, setState) => {
        setState(event.target.value);
    }

    return (
        <div>
            <p>Sign Up</p>
            <form onSubmit={submitHandler}>
                <div className={classes.FormControl}>
                    <label htmlFor="username">Enter a username</label>
                    <input type="text" id="username" value={enteredUsername}
                    onChange={event => setEnteredValue(event, setUsername)} />
                </div>
                <div className={classes.FormControl}>
                    <label htmlFor="email">Enter your Email</label>
                    <input type="email" id="email" value={enteredEmail}
                    onChange={event => setEnteredValue(event, setEmail)} />
                </div>
                <div className={classes.FormControl}>
                    <label htmlFor="password">Enter a unique password</label>
                    <input type="password" id="password" value={enteredPassword}
                    onChange={event => setEnteredValue(event, setPassword)} />
                </div>
                <div className={classes.FormActions}>
                    <button type="submit">Sign Up</button>
                </div>
            </form>
        </div>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        onAuthenticate: (
            username,
            email,
            password,
            signingUp) => dispatch(actions.authenticate(
                                                username,
                                                email,
                                                password,
                                                signingUp))
    }
};

export default connect(null, mapDispatchToProps)(SignUp);