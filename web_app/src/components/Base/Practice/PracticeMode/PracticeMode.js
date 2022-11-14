import React, { useEffect, useState } from "react";
import classes from './PracticeMode.module.css';

const PracticeMode = (props) => {

    let content = <p>Loading...</p>;
    const currIndex = Math.floor(Math.random() * 3);
    if (!props.loading) {
        if (props.fetchedSentences) {
            // console.log(props.fetchedSentences);
            let preferredLanguage = 'ja';
            let sentences = props.fetchedSentences[preferredLanguage];
            // console.log(sentences[currIndex]);
            let randomSentence = sentences[currIndex];
            let practiceSentence = <h2>{Object.keys(randomSentence)[0]}</h2>
            let translatedSentence = <h2>{randomSentence[Object.keys(randomSentence)[0]]}</h2>
            // let transformedSentence = sentences.map(sentence => {
            //     console.log(sentence);
            //     return null;
            // });

            content = (
                <React.Fragment>
                    <div className={classes.PracticeContainer}>
                        <div className={classes.PracticeText}>
                            {practiceSentence}
                        </div>
                        <div className={classes.TranslatedText}>
                            {translatedSentence}
                        </div>
                        <div className={classes.ProgressButtonContainer}>
                            <button onClick={() => props.progressHandler(true, currIndex)}
                            className={classes.ProgressButton}>I know this</button>
                            <button onClick={() => props.progressHandler(false, currIndex)}
                            className={classes.ProgressButton}>I don't know this</button>
                        </div>
                    </div>
                </React.Fragment>
            );
        }
    }

    return content;
};



export default PracticeMode;