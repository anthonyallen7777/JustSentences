import React, { useEffect, useState } from "react";
import PracticeSnapshot from "../PracticeSnapshot/PracticeSnapshot";
import classes from './SectionOne.module.css';

const SectionOne = () => {
    const [loading, setLoading] = useState(true);
    const [sentence, setSentence] = useState('');
    const [tempSentences, setTempSentences] = useState([
        {"夕食を作りましょうか": "Shall we cook dinner"},
        {"親友は何人いる？": "How many best friends do you have?"},
        {"行くまいと決めた。": "I decided not to go."},
    ]);

    const snapshotChangeHandler = (clickDirection) => {
        testFunc(clickDirection);
    }

    const [currIndex, setCurrIndex] = useState(-1);
    const testFunc = (clicked) => {
        if (clicked) {
            if (clicked === 'left') {
                setCurrIndex(prevCount => prevCount - 1);
                setCurrIndex(prevCount => {
                    if (prevCount < 0) {
                        setSentence(tempSentences[prevCount]);
                        return tempSentences.length-1;
                    }
                });
            } else {
                setCurrIndex(prevCount => prevCount + 1);
                setCurrIndex(prevCount => {
                    if (prevCount >= tempSentences.length) {
                        setSentence(tempSentences[0]);
                        return 0;
                    } else {
                        setSentence(tempSentences[prevCount]);
                        return prevCount;
                    }
                });
            }
        } else {
            setCurrIndex(prevCount => prevCount + 1);
            setCurrIndex(prevCount => {
                if (prevCount >= tempSentences.length) {
                    setSentence(tempSentences[0]);
                    return 0;
                } else {
                    setSentence(tempSentences[prevCount]);
                    return prevCount;
                }
            });
        }
    }

    useEffect(() => {
        setLoading(false);
        testFunc();
        const intervalId = setInterval(() => {
            testFunc();
        }, 1000);
        return () => clearInterval(intervalId);
    }, []);

    console.log(currIndex);


    let snapshotContent = <p>Loading...</p>;
    if (!loading) {
        snapshotContent = (
            <PracticeSnapshot currentSentence={sentence} currIndex={currIndex} clicked={snapshotChangeHandler} practiceMode={false} />
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