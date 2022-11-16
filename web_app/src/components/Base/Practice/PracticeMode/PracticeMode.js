import React, { useEffect, useState } from "react";
import classes from './PracticeMode.module.css';

const PracticeMode = (props) => {
    const {sentenceIndex, fetchedSentences, progressHandler} = props;
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);

    let content = <p>Loading...</p>;


    if (!loading) {
        if (fetchedSentences) {
            let sentences = fetchedSentences[sentenceIndex];
                    let practiceSentence = <h2>{Object.keys(sentences)[0]}</h2>
                    let translatedSentence = <h2>{sentences[Object.keys(sentences)[0]]}</h2>
        
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
                            <button onClick={() => progressHandler(true, sentenceIndex)}
                            className={classes.ProgressButton}>I know this</button>
                            <button onClick={() => progressHandler(false, sentenceIndex)}
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