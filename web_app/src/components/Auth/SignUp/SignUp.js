import React, { useState, useRef, useEffect, useCallback  } from "react";
import classes from './SignUp.module.css';

//redux import actions from auth action creator
import * as actions from '../../../store/actions/index';
import { connect } from "react-redux";

const SignUp = (props) => {
    const ref = useRef(null);
    const [enteredUsername, setUsername] = useState('Enter a username');
    const [clickedUsername, setClickedUsername] = useState(false);
    const [enteredEmail, setEmail] = useState('Enter your email');
    const [clickedEmail, setClickedEmail] = useState(false);
    const [enteredEmailConfirm, setEmailConfirm] = useState('Enter email again');
    const [clickedEmailConfirm, setClickedEmailConfirm] = useState(false);
    const [enteredPassword, setPassword] = useState('Enter a unique password');
    const [clickedPassword, setClickedPassword] = useState(false);
    const [passwordType, setPasswordType] = useState("text");
    const [enteredPasswordConfirm, setPasswordConfirm] = useState('Enter password again');
    const [clickedPasswordConfirm, setClickedPasswordConfirm] = useState(false);
    const [passwordConfirmType, setPasswordConfirmType] = useState("text");
    const [lastInputValue, setLastInputValue] = useState(null);
    const [lastInputType, setLastInputType] = useState(null);

    const { onClickOutside } = props;

    const clickAwayHandler = useCallback((setState) => {
        if (lastInputValue !== null) {
            if (lastInputValue === '') {
                switch(lastInputType) {
                    case 'username': setUsername('Enter a username');
                    break;
                    case 'email': setEmail('Enter your email');
                    break;
                    case 'emailConfirm': setEmailConfirm('Enter email again');
                    break;
                    case 'password': {
                        setPasswordType("text");
                        setPassword('Enter a unique password');
                        setClickedPassword(false);
                        break;
                    }
                    case 'passwordConfirm': {
                        setPasswordConfirmType("text");
                        setPasswordConfirm('Enter password again');
                        setClickedPasswordConfirm(false);
                        break;
                    }
                    default:
                        break;
                }
            }
        }
    }, [lastInputValue, lastInputType]);

    useEffect(() => {
        const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            onClickOutside && onClickOutside();
            clickAwayHandler();
        }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
        document.removeEventListener('click', handleClickOutside, true);
        };
    }, [ onClickOutside,clickAwayHandler]);

    const submitHandler = event => {
        event.preventDefault();
        if (enteredEmail === enteredEmailConfirm &&
            enteredPassword === enteredPasswordConfirm) {
                props.onAuthenticate(
                    enteredUsername,
                    enteredEmail,
                    enteredPassword,
                    true);
            }
    }

    const setEnteredValue = (event, setState, lastInputT) => {
        setState(event.target.value);
        setLastInputValue(event.target.value);
        setLastInputType(lastInputT);
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

    let content = null;

    if (props.isLanding) {
        content = (
            <div className={classes.LandingSignUp}>
                <p>Sign Up</p>
                <form onSubmit={submitHandler}  ref={ref}>
                    <div className={classes.FormControl}>
                        <input type="text" id="username" value={enteredUsername}
                        onChange={event => setEnteredValue(event, setUsername, 'username')}
                        onClick={() =>
                            clickedInputHandler(clickedUsername, setClickedUsername,
                            setUsername, null)} />
                    </div>
                    <div className={classes.FormControl}>
                        <input type="email" id="email" value={enteredEmail}
                        onChange={event => setEnteredValue(event, setEmail, 'email')}
                        onClick={() =>
                            clickedInputHandler(clickedEmail, setClickedEmail,
                            setEmail, null)} />
                    </div>
                    <div className={classes.FormControl}>
                        <input type="email" id="emailConfirm" value={enteredEmailConfirm}
                        onChange={event => setEnteredValue(event, setEmailConfirm, 'emailConfirm')}
                        onClick={() =>
                            clickedInputHandler(clickedEmailConfirm, setClickedEmailConfirm,
                            setEmailConfirm, null)} />
                    </div>
                    <div className={classes.FormControl}>
                        <input type={passwordType} id="password" value={enteredPassword}
                        onChange={event => setEnteredValue(event, setPassword, 'password')}
                        onClick={() =>
                        clickedInputHandler(clickedPassword, setClickedPassword,
                        setPassword, passwordType, setPasswordType)} />
                    </div>
                    <div className={classes.FormControl}>
                        <input type={passwordConfirmType} id="passwordConfirm" value={enteredPasswordConfirm}
                        onChange={event => setEnteredValue(event, setPasswordConfirm, 'passwordConfirm')}
                        onClick={() =>
                            clickedInputHandler(clickedPasswordConfirm, setClickedPasswordConfirm,
                            setPasswordConfirm, passwordConfirmType, setPasswordConfirmType)} />
                    </div>
                    <div className={classes.FormActions}>
                        <button type="submit">Sign Up</button>
                    </div>
                </form>
            </div>
        );
    } else {
        content = (
            <div className={classes.SignUp}>
                <p>Sign Up</p>
                <form onSubmit={submitHandler}  ref={ref}>
                    <div className={classes.FormControl}>
                        <input type="text" id="username" value={enteredUsername}
                        onChange={event => setEnteredValue(event, setUsername, 'username')}
                        onClick={() =>
                            clickedInputHandler(clickedUsername, setClickedUsername,
                            setUsername, null)} />
                    </div>
                    <div className={classes.FormControl}>
                        <input type="email" id="email" value={enteredEmail}
                        onChange={event => setEnteredValue(event, setEmail, 'email')}
                        onClick={() =>
                            clickedInputHandler(clickedEmail, setClickedEmail,
                            setEmail, null)} />
                    </div>
                    <div className={classes.FormControl}>
                        <input type="email" id="emailConfirm" value={enteredEmailConfirm}
                        onChange={event => setEnteredValue(event, setEmailConfirm, 'emailConfirm')}
                        onClick={() =>
                            clickedInputHandler(clickedEmailConfirm, setClickedEmailConfirm,
                            setEmailConfirm, null)} />
                    </div>
                    <div className={classes.FormControl}>
                        <input type={passwordType} id="password" value={enteredPassword}
                        onChange={event => setEnteredValue(event, setPassword, 'password')}
                        onClick={() =>
                        clickedInputHandler(clickedPassword, setClickedPassword,
                        setPassword, passwordType, setPasswordType)} />
                    </div>
                    <div className={classes.FormControl}>
                        <input type={passwordConfirmType} id="passwordConfirm" value={enteredPasswordConfirm}
                        onChange={event => setEnteredValue(event, setPasswordConfirm, 'passwordConfirm')}
                        onClick={() =>
                            clickedInputHandler(clickedPasswordConfirm, setClickedPasswordConfirm,
                            setPasswordConfirm, passwordConfirmType, setPasswordConfirmType)} />
                    </div>
                    <div className={classes.FormActions}>
                        <button type="submit">Sign Up</button>
                    </div>
                </form>
            </div>
        );
    }

    return content;
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