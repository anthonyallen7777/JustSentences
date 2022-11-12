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
            case 'username': return onChangeUsernameOrEmail('username', enteredUsername);
            case 'email': return onChangeUsernameOrEmail('email', enteredEmail);
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
        if (toChange === 'username') {
            return (
            <div>
                <p>Change username</p>
                <form onSubmit={submitHandler}>
                    <div className={classes.FormControl}>
                        <label htmlFor="username">Enter a new username</label>
                        <input type="text" id="username" value={enteredUsername}
                        onChange={event => setEnteredValue(event, setUsername)} />
                    </div>
                    <div className={classes.FormActions}>
                        <button type="submit">change your username</button>
                    </div>
                </form>
            </div>
            );
        }
        if (toChange === 'email') {
            return (
                <div>
                    <p>Change email</p>
                    <form onSubmit={submitHandler}>
                        <div className={classes.FormControl}>
                            <label htmlFor="email">Enter your new email</label>
                            <input type="email" id="email" value={enteredEmail}
                            onChange={event => setEnteredValue(event, setEmail)} />
                        </div>
                        <div className={classes.FormActions}>
                            <button type="submit">change your email</button>
                        </div>
                    </form>
                </div>
                );
        }
        else {
            if (toChange === 'progress') {
                return (
                    <div>
                        <p>Are you sure you want to reset your progress?</p>
                        <p>THIS PROCESS CANNOT BE UNDONE!</p>
                        <button onClick={submitHandler}>Yes reset all progress</button>
                    </div>
                    );
            } else {
                return (
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
        onChangeUsernameOrEmail: (whatAreWeChanging, newUsername) => dispatch(actions.changeUsernameOrEmail(whatAreWeChanging, newUsername)),
        onResetProgress: () => dispatch(actions.resetProgress()),
        onDeleteAccount: () => dispatch(actions.deleteAccount())
    }
};

export default connect(null, mapDispatchToProps)(Modal);