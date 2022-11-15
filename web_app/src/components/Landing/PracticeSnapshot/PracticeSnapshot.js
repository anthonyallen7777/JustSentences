import React, { useEffect, useState } from "react";

//css
import classes from './PracticeSnapshot.module.css';
import CSSTransition from 'react-transition-group/CSSTransition';

const textTiming = {
    enter: 400,
    exit: 1000
};

const PracticeSnapshot = (props) => {
    useEffect(() => {
        // console.log('[PracticeSnapshot ComponentDidMount]');
    }, []);

    const progressHandler = (knowOrDont) => {
        if (knowOrDont) {
            // console.log("GOOD JOB");
        } else {
            // console.log("NICE TRY KEEP PRACTICING");
        }
    }

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
            <div className={classes.ArrowContainer} onClick={()=>props.clicked('left')}>
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
            <div className={classes.ArrowContainer} onClick={()=>props.clicked('right')}>
                <i className={[classes.Arrow, classes.Right].join(' ')}></i>
            </div>
        </React.Fragment>
        );
    }

    return content;
};

export default PracticeSnapshot;