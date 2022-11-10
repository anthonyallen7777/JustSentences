import React, { useState } from "react";
import classes from './SignUp.module.css';

const SignUp = (props) => {
    const [enteredUsername, setUsername] = useState('Username');
    const [enteredEmail, setEmail] = useState('Email');
    const [enteredPassword, setPassword] = useState('');
    const submitHandler = event => {
        event.preventDefault();
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

export default SignUp;