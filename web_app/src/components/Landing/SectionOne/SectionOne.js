import React, { useEffect, useState } from "react";
import PracticeSnapshot from "../PracticeSnapshot/PracticeSnapshot";
import classes from './SectionOne.module.css';

const tempSentences = [
    {"夕食を作りましょうか": "Shall we cook dinner"},
    {"親友は何人いる？": "How many best friends do you have?"},
    {"行くまいと決めた。": "I decided not to go."},
]

let curIndex = -1;

const SectionOne = () => {
    const [sentences, setSentences] = useState('');
    //change the practice text every few seconds
    useEffect(() => {
        const interval = setInterval(() => {
            ++curIndex;
            if (curIndex >= tempSentences.length) {
                curIndex = 0;
            }
            setSentences(tempSentences[curIndex]);
            console.log('This will run every 3 second!');
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={classes.SectionOneContainer}>
            <div className={[classes.Box, classes.TextContainer].join(' ')}>
                <p className={classes.PracticeText}>Practice</p>
                <p className={classes.PracticeText}>With</p>
                <p className={classes.PracticeText}>Sentences</p>
            </div>
            <div className={[classes.Box, classes.SnapshotContainer].join(' ')}>
                <PracticeSnapshot currentSentence={sentences} />
            </div>
        </div>
    );
};

export default SectionOne;