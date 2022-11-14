import React, { useEffect, useState } from "react";
import classes from './Practice.module.css';

import BackButton from "../../UI/Buttons/BackButton/BackButton";
import PracticeMode from "./PracticeMode/PracticeMode";

//redux
import { connect } from "react-redux";
import * as actions from '../../../store/actions/index';

const Practice = (props) => {
    const [progressData, setProgressData] = useState({
        "ja": {
            "sentenceProgress": {
                "0": 5,
                "365": 2
            }
        }
    });
    const {onFetchSentences, fetchedSentences, loading} = props;
    useEffect(() => {
        //get the sentences on mount
        onFetchSentences(localStorage.getItem("idToken"));
    }, [onFetchSentences]);

    const progressHandler = (knowOrDont, indexToUpdate) => {
        const toString = indexToUpdate.toString();
        console.log("INDEX " + toString);
        if (knowOrDont) {
            let inc = null;
            if (progressData.ja.sentenceProgress[indexToUpdate]) {
                inc = progressData.ja.sentenceProgress[indexToUpdate] + 1;
            } else {
                inc = 1;
            }
            setProgressData({
                ...progressData,
                "ja": {
                    ...progressData.ja,
                    "sentenceProgress": {
                        ...progressData.ja.sentenceProgress,
                        [toString]: inc
                    }
                }
            });
            //play animation
        } else {
            let dec = null;
            if (progressData.ja.sentenceProgress[indexToUpdate]) {
                dec = progressData.ja.sentenceProgress[indexToUpdate] - 1;
            } else {
                dec = 1;
            }
            setProgressData({
                ...progressData,
                "ja": {
                    ...progressData.ja,
                    "sentenceProgress": {
                        ...progressData.ja.sentenceProgress,
                        [toString]: dec
                    }
                }
            });
        }
        console.log(progressData.ja.sentenceProgress);
    }

    return (
        <div className={classes.PracticeContainer}>
            <div className={classes.PracticeHeader}>
                <BackButton className={classes.Button} />
                <h2 className={classes.Title}>Practice</h2>
            </div>
            <PracticeMode loading={loading}
            fetchedSentences={fetchedSentences} progressHandler={progressHandler} />
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