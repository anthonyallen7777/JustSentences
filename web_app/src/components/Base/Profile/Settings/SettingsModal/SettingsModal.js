import React, { useState } from "react";
import classes from './SettingsModal.module.css';

//redux
import { connect } from "react-redux";
import * as actions from '../../../../../store/actions/index';

const Modal = (props) => {
    const [enteredUsername, setUsername] = useState('Username');
    const [enteredEmail, setEmail] = useState('Email');
    const [enteredPassword, setPassword] = useState('');
    const {onChangeUsernameOrEmail, onResetProgress, onDeleteAccount} = props;

    const submitHandler = event => {
        event.preventDefault();
        switch(props.dataToDisplay) {
            case 'username': return onChangeUsernameOrEmail('username');
            case 'email': return onChangeUsernameOrEmail('email');
            case 'progress': return onResetProgress();
            case 'delete': return onDeleteAccount();
            default:
                return null;
        }
    }

    const setEnteredValue = (event, setState) => {
        setState(event.target.value);
    }

    const formFormatHandler = (toChange) => {
        let content = null;
        if (toChange === 'username' || toChange === 'email') {
            let isEmail = false
            if (toChange !== 'username') {isEmail = true}
            return content = (
                <form onSubmit={submitHandler}>
                    <div className={classes.FormControl}>
                        <label htmlFor={toChange}>Enter new {toChange}</label>
                        <input type={isEmail ? 'email': 'text'} id={toChange}
                        value={isEmail ? enteredEmail: enteredUsername}
                        onChange={event => {
                            isEmail ? setEnteredValue(event, setEmail) :
                            setEnteredValue(event, setUsername)
                        }} />
                    </div>
                    <div className={classes.FormControl}>
                        <label htmlFor="password">Enter your password</label>
                        <input type="password" id="password" value={enteredPassword}
                        onChange={event => setEnteredValue(event, setPassword)} />
                    </div>
                    <div className={classes.FormActions}>
                        <button type="submit">Change username</button>
                    </div>
                </form>
                );
        } else {
            if (toChange === 'progress') {
                return content = (
                    <div>
                        <p>Are you sure you want to reset your progress?</p>
                        <p>THIS PROCESS CANNOT BE UNDONE!</p>
                        <button onClick={submitHandler}>Yes reset all progress</button>
                    </div>
                    );
            } else {
                return content = (
                    <div>
                        <p>Are you sure you want to delete your account?</p>
                        <p>THIS PROCESS CANNOT BE UNDONE!</p>
                        <button onClick={submitHandler}>Yes please DELETE my account</button>
                    </div>
                    );
            }
        }
    }

    let modalContent = null;

    if (props.dataToDisplay) {
        const dataToChange = props.dataToDisplay;
        modalContent = formFormatHandler(dataToChange);
    }

    return (
        <div className={classes.Modal}
        style={{
            transform: props.showModal ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: props.showModal ? '1': '0'
        }}>
            {modalContent}
        </div>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        onChangeUsernameOrEmail: () => dispatch(actions.changeUsernameOrEmail()),
        onResetProgress: () => dispatch(actions.resetProgress()),
        onDeleteAccount: () => dispatch(actions.deleteAccount())
    }
};

export default connect(null, mapDispatchToProps)(Modal);