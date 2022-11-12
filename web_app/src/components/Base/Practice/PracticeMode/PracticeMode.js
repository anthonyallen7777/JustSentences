import React, { useEffect, useState } from "react";
import classes from './PracticeMode.module.css';

const PracticeMode = (props) => {
    const [testNumber, setTestNumber] = useState(0);
    const changeSentence = () => {
        console.log("CLICKED");
        setTestNumber(testNumber - 1);
    }

    let content = <p>Loading...</p>;
    
    if (!props.loading) {
        if (props.fetchedSentences) {
            let preferredLanguage = 'ja';
            let sentences = props.fetchedSentences[preferredLanguage];
            console.log(sentences[Math.floor(Math.random() * 3)]);
            let randomSentence = sentences[Math.floor(Math.random() * 3)]
            let practiceSentence = <h2>{Object.keys(randomSentence)[0]}</h2>
            let translatedSentence = <h2>{randomSentence[Object.keys(randomSentence)[0]]}</h2>
            // let transformedSentence = sentences.map(sentence => {
            //     console.log(sentence);
            //     return null;
            // });
              
            content = (
                <div className={classes.PracticeContainer}>
                    <div className={classes.PracticeSentence}>
                        {testNumber}
                        {practiceSentence}
                    </div>
                    <div className={classes.TranslatedSentence}>
                        {translatedSentence}
                    </div>
                    <div className={classes.ProgressButtonContainer}>
                        <button onClick={changeSentence} className={classes.ProgressButton}>I don't know</button>
                        <button className={classes.ProgressButton}>I know</button>
                    </div>
                </div>
                );
        }
    }

    return content;
};



export default PracticeMode;