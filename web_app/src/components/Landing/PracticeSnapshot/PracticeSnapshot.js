import React, { useCallback, useEffect, useState } from "react";

//css
import classes from './PracticeSnapshot.module.css';
import CSSTransition from 'react-transition-group/CSSTransition';

import Incorrect from "../../UI/Practice/Incorrect/Incorrect";
import Correct from '../../UI/Practice/Correct/Correct';
import './ProgressNumberAnimations.css';

const textTiming = {
    enter: 400,
    exit: 400
};

const progressNumberTiming = {
    enter: 400,
    exit: 400
};

const PracticeSnapshot = (props) => {
    const [showProgressNumberGood, setShowProgressNumberGood] = useState(false);
    const [showProgressNumberBad, setShowProgressNumberBad] = useState(false);
    const progressHandler = (knowOrDont) => {
        props.clicked(knowOrDont);
        if (knowOrDont) {
            setShowProgressNumberGood(true);
        } else {
            setShowProgressNumberBad(true);
        }
        setTimeout(() => {
            setShowProgressNumberGood(false);
            setShowProgressNumberBad(false);
        }, 400);
    };

    let practiceText = null;
    let translatedText = null;
    if (props.currentSentence) {
        practiceText = Object.keys(props.currentSentence)[0];
        translatedText = props.currentSentence[Object.keys(props.currentSentence)[0]];
    }

    let content = null;

    if (props.practiceMode) {
        content = (
            <React.Fragment>
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
                <div className={classes.TextContainer}>
                    <div className={classes.PracticeText}>
                        <p>{practiceText}</p>
                    </div>
                    <div className={classes.TranslatedText}>
                        <p>{translatedText}</p>
                    </div>
                    <div>
                        <button onClick={() => progressHandler(true)}>I know this</button>
                        <button onClick={() => progressHandler(false)}>I don't know this</button>
                    </div>
                </div>
            </React.Fragment>
        );
    } else {
        content = (
            <React.Fragment>
            <div className={classes.ArrowContainer} onClick={()=>props.clickedLang('left')}>
                <i className={[classes.Arrow, classes.Left].join(' ')}></i>
            </div>
            <div className={classes.TextContainer}>
                <div className={classes.PracticeText}>
                    <CSSTransition
                    in={props.showText}
                    timeout={textTiming}
                    classNames={'fade-snapshot'}
                    >
                    <p>{practiceText}</p>
                    </CSSTransition>
                </div>
                <div className={classes.TranslatedText}>
                    <CSSTransition
                    in={props.showText}
                    timeout={textTiming}
                    classNames={'fade-snapshot'}
                    >
                    <p>{translatedText}</p>
                    </CSSTransition>
                </div>
            </div>
            <div className={classes.ArrowContainer} onClick={()=>props.clickedLang('right')}>
                <i className={[classes.Arrow, classes.Right].join(' ')}></i>
            </div>
        </React.Fragment>
        );
    }

    return content;
};

export default PracticeSnapshot;