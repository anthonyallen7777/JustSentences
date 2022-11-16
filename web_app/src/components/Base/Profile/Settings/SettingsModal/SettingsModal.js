import React, { useCallback, useEffect, useRef, useState } from "react";


//redux
import { connect } from "react-redux";
import * as actions from '../../../../../store/actions/index';

//css
import classes from './SettingsModal.module.css';
import './modalAnimations.css';
import CSSTransition from 'react-transition-group/CSSTransition';

const modalTiming = {
    enter: 400,
    exit: 1000
};

const SettingsModal = (props) => {
    const [enteredUsername, setUsername] = useState('new username');
    const [enteredEmail, setEmail] = useState('Email');
    const {onChangeUsernameOrEmail, onResetProgress, onDeleteAccount} = props;

    const { onClickOutside } = props;
    const ref = useRef(null);

    const {showModal, setShowModal} = props;

    const clickAwayHandler = useCallback(() => {
        setShowModal(!showModal);
    }, [showModal, setShowModal]);

    useEffect(() => {
        if (showModal) {
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
        }
    }, [showModal, onClickOutside,clickAwayHandler]);

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
            <div className={classes.FormContainer}>
                <div className={classes.TitleContainer}>
                    <p>CHANGE USERNAME</p>
                </div>
                <form onSubmit={submitHandler}>
                    <div className={classes.FormControl}>
                        <label htmlFor="username">Enter a new username</label>
                        <input type="text" id="username" value={enteredUsername}
                        onChange={event => setEnteredValue(event, setUsername)} />
                    </div>
                    <div className={classes.FormActions}>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
            );
        }
        if (toChange === 'email') {
            return (
                <div className={classes.FormContainer}>
                    <div className={classes.TitleContainer}>
                        <p>CHANGE EMAIL</p>
                    </div>
                    <form onSubmit={submitHandler}>
                        <div className={classes.FormControl}>
                            <label htmlFor="email">Enter your new email</label>
                            <input type="email" id="email" value={enteredEmail}
                            onChange={event => setEnteredValue(event, setEmail)} />
                        </div>
                        <div className={classes.FormActions}>
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                </div>
                );
        }
        else {
            if (toChange === 'progress') {
                return (
                    <div className={classes.FormContainer}>
                        <p>Are you sure you want to reset your progress?</p>
                        <p>THIS PROCESS CANNOT BE UNDONE!</p>
                        <button onClick={submitHandler}>Yes reset all progress</button>
                    </div>
                    );
            } else {
                return (
                    <div className={classes.FormContainer}>
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
        <CSSTransition
        mountOnEnter
        unmountOnExit
        in={showModal}
        timeout={modalTiming}
        classNames={'fade-slide'}
        >
            <div className={classes.Modal} ref={ref}>
                {modalContent}
            </div>
        </CSSTransition>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        onChangeUsernameOrEmail: (whatAreWeChanging, newUsername) => dispatch(actions.changeUsernameOrEmail(whatAreWeChanging, newUsername)),
        onResetProgress: () => dispatch(actions.resetProgress()),
        onDeleteAccount: () => dispatch(actions.deleteAccount())
    }
};

export default connect(null, mapDispatchToProps)(SettingsModal);