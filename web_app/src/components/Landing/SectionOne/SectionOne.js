import React, { useCallback, useEffect, useState } from "react";
import PracticeSnapshot from "../PracticeSnapshot/PracticeSnapshot";
import classes from './SectionOne.module.css';

let currIndex = -1;

const SectionOne = () => {
    const [loading, setLoading] = useState(true);
    const [sentence, setSentence] = useState('');
    const [tempSentences, setTempSentences] = useState([
        {"夕食を作りましょうか": "Shall we cook dinner"},
        {"親友は何人いる？": "How many best friends do you have?"},
        {"行くまいと決めた。": "I decided not to go."},
    ]);

    const snapshotChangeHandler = (clickDirection) => {
        displaySentenceHandler(clickDirection);
    }

    const displaySentenceHandler = useCallback((clicked) => {
        
        if (clicked) {
            if (clicked === 'left') {
                --currIndex;
                if (currIndex < 0) {
                    currIndex = tempSentences.length-1;
                }
                setSentence(tempSentences[currIndex]);
            } else {
                ++currIndex;
                if (currIndex >= tempSentences.length) {
                    currIndex = 0;
                }
                setSentence(tempSentences[currIndex]);
            }
        } else {
            ++currIndex;
            if (currIndex >= tempSentences.length) {
                currIndex = 0;
            }
            setSentence(tempSentences[currIndex]);
        }
    }, [tempSentences]);

    useEffect(() => {
        setLoading(false);
        displaySentenceHandler();
        const interval = setInterval(() => {
            displaySentenceHandler();
        }, 10000);
        return () => clearInterval(interval);
    }, [displaySentenceHandler]);


    let snapshotContent = <p>Loading...</p>;
    if (!loading) {
        snapshotContent = (
            <PracticeSnapshot currentSentence={sentence} clicked={snapshotChangeHandler} practiceMode={false} />
        );
    }
    return (
        <div className={classes.SectionOneContainer}>
            <div className={[classes.Box, classes.TextContainer].join(' ')}>
                <p className={classes.PracticeText}>Practice</p>
                <p className={classes.PracticeText}>With</p>
                <p className={classes.PracticeText}>Sentences</p>
            </div>
            <div className={[classes.Box, classes.SnapshotContainer].join(' ')}>
                {snapshotContent}
            </div>
        </div>
    );
};

export default SectionOne;