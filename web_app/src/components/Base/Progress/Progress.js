import React, { useEffect} from "react";
import classes from './Progress.module.css';

import BackButton from "../../UI/Buttons/BackButton/BackButton";

//redux
import { connect } from "react-redux";
import * as actions from '../../../store/actions/index';

const Progress = (props) => {
    const {loading, fetchedUserData, onFetchUserProgress} = props;

    useEffect(() => {
        onFetchUserProgress(localStorage.getItem("idToken"));
    }, [onFetchUserProgress]);

    let data = null;

    let content = null;


    if (!loading) {
        if (fetchedUserData) {
            data = (
                <div className={classes.DateAndTimeStudiedContainer}>
                    <div className={classes.DateContainer}>
                        <p>Date</p>
                        <div className={classes.Dates}>
                            <p>{Object.keys(fetchedUserData.languages.ja.practiceTime.Date1)[0]}</p>
                            <p>{Object.keys(fetchedUserData.languages.ja.practiceTime.Date2)[0]}</p>
                        </div>
                    </div>
                    <div className={classes.TimeStudiedContainer}>
                        <p>Time Studied</p>
                        <div className={classes.Times}>
                            <p>{fetchedUserData.languages.ja.practiceTime.Date1}</p>
                            <p>{fetchedUserData.languages.ja.practiceTime.Date2}</p>
                        </div>
                    </div>
                </div>
            );
        }

        content = (
            <div className={classes.ProgressContainer}>
                <BackButton />
                <div className={classes.TitleContainer}>
                    <h2>Progress</h2>
                </div>
                {data}
            </div>
        );

    } else {
        content = <p>Loading...</p>
    }

    return content;
};

const mapStateToProps = state => {
    return {
        fetchedUserData: state.user.userData,
        loading: state.user.loading
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchUserProgress: (idToken) => dispatch(actions.fetchUserProgress(idToken))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Progress);