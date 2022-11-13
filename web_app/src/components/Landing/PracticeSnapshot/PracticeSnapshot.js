import React, { useEffect } from "react";
import classes from './PracticeSnapshot.module.css';

const PracticeSnapshot = (props) => {

    let practiceText = null;
    let translatedText = null;
    if (props.currentSentence) {
        practiceText = Object.keys(props.currentSentence)[0];
        translatedText = props.currentSentence[Object.keys(props.currentSentence)[0]];
    }

    return (
        <React.Fragment>
            <div className={classes.ArrowContainer} onClick={()=>props.clicked('left')}>
                <i className={[classes.Arrow, classes.Left].join(' ')}></i>
            </div>
            <div className={classes.TextContainer}>
                <div className={classes.PracticeText}>
                    <p>{practiceText}</p>
                </div>
                <div className={classes.TranslatedText}>
                    <p>{translatedText}</p>
                </div>
            </div>
            <div className={classes.ArrowContainer} onClick={()=>props.clicked('right')}>
                <i className={[classes.Arrow, classes.Right].join(' ')}></i>
            </div>
        </React.Fragment>
    );
};

export default PracticeSnapshot;