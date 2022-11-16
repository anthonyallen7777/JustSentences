import React, { useEffect, useState } from "react";
import classes from './Practice.module.css';

import BackButton from "../../UI/Buttons/BackButton/BackButton";
import Correct from '../../UI/Practice/Correct/Correct';
import Incorrect from '../../UI/Practice/Incorrect/Incorrect';
import PracticeMode from "./PracticeMode/PracticeMode";

//CSS
import CSSTransition from 'react-transition-group/CSSTransition';
import '../../../sharedcss/ProgressNumberAnimations.css';
//redux
import { connect } from "react-redux";
import * as actions from '../../../store/actions/index';

const progressNumberTiming = {
    enter: 400,
    exit: 400
};

const Practice = (props) => {
    const [progressData, setProgressData] = useState({
        "ja": {
            "sentenceProgress": {
            }
        }
    });
    const {onFetchSentences, fetchedSentences} = props;
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        //get the sentences on mount
        onFetchSentences(localStorage.getItem("idToken"));
        setLoading(false);
    }, [onFetchSentences]);

    const [showProgressNumberGood, setShowProgressNumberGood] = useState(false);
    const [showProgressNumberBad, setShowProgressNumberBad] = useState(false);
    const [sentenceIndex, setSentenceIndex] = useState(0);
    const [numberOfAttempts, setNumberOfAttempts] = useState(0);
    const progressHandler = (knowOrDont, indexToUpdate) => {
        if (knowOrDont) {
            //set sentence index and number of attempts
            setSentenceIndex(prevCount => prevCount + 1);
            setSentenceIndex(prevCount => {
                //fix this to work with any array length
                if (prevCount >= fetchedSentences.length) {
                    return 0;
                } else {
                    return prevCount;
                }
            });
            setNumberOfAttempts(0);
            //play animation
            setShowProgressNumberGood(true);
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
                        indexToUpdate: inc
                    }
                }
            });
            
        } else {
            //set sentence index and number of attempts
            if (numberOfAttempts > 5) {
                setSentenceIndex(prevCount => prevCount + 1);
                setSentenceIndex(prevCount => {
                    if (prevCount >= fetchedSentences.length) {
                        return 0;
                    } else {
                        return prevCount;
                    }
                });
                setNumberOfAttempts(0);
            } else {
                setNumberOfAttempts(prevCount => prevCount+1);
            }
            //play animation
            setShowProgressNumberBad(true);
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
                        indexToUpdate: dec
                    }
                }
            });
        }

        //stop animation
        setTimeout(() => {
            setShowProgressNumberGood(false);
            setShowProgressNumberBad(false);
        }, 400);
    }

    let content = <p>Loading..</p>;

    if (!loading) {
        content = (
            <div className={classes.PracticeContainer}>
                <CSSTransition
                    mountOnEnter
                    unmountOnExit
                    in={showProgressNumberGood}
                    timeout={progressNumberTiming}
                    classNames={'fade-progressNumbers'}
                    >
                        <Correct />
                </CSSTransition>
                <CSSTransition
                    mountOnEnter
                    unmountOnExit
                    in={showProgressNumberBad}
                    timeout={progressNumberTiming}
                    classNames={'fade-progressNumbers'}
                    >
                        <Incorrect />
                </CSSTransition>
                <BackButton/>
                <div className={classes.PracticeHeader}>
                    <h2 className={classes.Title}>Practice</h2>
                </div>
                <PracticeMode
                sentenceIndex={sentenceIndex}
                fetchedSentences={fetchedSentences}
                progressHandler={progressHandler} />
            </div>
        );
    }

    return content;
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