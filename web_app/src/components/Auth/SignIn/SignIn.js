import React, { useState } from "react";
import classes from './SignIn.module.css';

//redux import actions from auth action creator
import * as actions from '../../../store/actions/index';
import { connect } from "react-redux";

const SignIn = (props) => {
    const [enteredEmail, setEmail] = useState('Enter your email');
    const [clickedEmail, setClickedEmail] = useState(false);
    const [enteredPassword, setPassword] = useState('Enter password');
    const [clickedPassword, setClickedPassword] = useState(false);
    const [passwordType, setPasswordType] = useState("text");
    
    const submitHandler = event => {
        event.preventDefault();
        props.onAuthenticate(
            null,
            enteredEmail,
            enteredPassword,
            false);
    }

    const setEnteredValue = (event, setState) => {
        setState(event.target.value);
    }

    const clickedInputHandler = (clicked, setClick, setValue, type, setType) => {
        if (clicked) {
            return null;
        } else {
            setValue('');
            setClick(true);
            if (type !== null) {
                setType("password");
            }
        }
    }

    return (
        <div className={classes.SignIn}>
            <form onSubmit={submitHandler}>
                    <div className={classes.FormControl}>
                        <input type="email" id="email" value={enteredEmail}
                        onChange={event => setEnteredValue(event, setEmail, 'email')}
                        onClick={() =>
                            clickedInputHandler(clickedEmail, setClickedEmail,
                            setEmail, null)} />
                    </div>
                    <div className={classes.FormControl}>
                        <input type={passwordType} id="password" value={enteredPassword}
                        onChange={event => setEnteredValue(event, setPassword, 'password')}
                        onClick={() =>
                        clickedInputHandler(clickedPassword, setClickedPassword,
                        setPassword, passwordType, setPasswordType)} />
                    </div>
                    <div className={classes.FormActions}>
                        <button type="submit">Sign In</button>
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

export default connect(null, mapDispatchToProps)(SignIn);