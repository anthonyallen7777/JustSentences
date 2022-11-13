import React from "react";
import classes from './PracticeSnapshot.module.css';

const PracticeSnapshot = (props) => {
    console.log(props.currentSentence[0]);
    return (
        <React.Fragment>
            <div className={[classes.PracticeText, classes.Text].join(' ')}>
                <p>夕食を作りましょうか</p>
            </div>
            <div className={[classes.TranslatedText, classes.Text].join(' ')}>
                <p>Shall we cook dinner</p>
            </div>
        </React.Fragment>
    );
};

export default PracticeSnapshot;