import React, { useEffect } from "react";
import classes from './Practice.module.css';

import BackButton from "../../UI/Buttons/BackButton/BackButton";
import PracticeMode from "./PracticeMode/PracticeMode";

//redux
import { connect } from "react-redux";
import * as actions from '../../../store/actions/index';

const Practice = (props) => {
    const {onFetchSentences, fetchedSentences, loading} = props
    useEffect(() => {
        //get the sentences on mount
        onFetchSentences(localStorage.getItem("idToken"));
    }, [onFetchSentences]);

    return (
        <div>
            <div className={classes.PracticeHeader}>
                <BackButton className={classes.Button} />
                <h2 className={classes.Title}>Practice</h2>
            </div>
            <PracticeMode loading={loading} fetchedSentences={fetchedSentences} />
        </div>
    );
};

const mapStateToProps = state => {
    return {
        fetchedSentences: state.practice.fetchedSentences,
        loading: state.practice.loading
    };
  }

const mapDispatchToProps = dispatch => {
    return {
      onFetchSentences: (idToken) => dispatch(actions.fetchSentences(idToken))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Practice);