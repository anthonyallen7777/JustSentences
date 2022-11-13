import React, { useEffect, useState } from "react";
import Languages from "../Languages/Languages";
import PracticeSnapshot from "../PracticeSnapshot/PracticeSnapshot";
import classes from './SectionThree.module.css';

const SectionThree = (props) => {
    const [loading, setLoading] = useState(true);
    const [languages, setLanguages] = useState(["eng", "ja", "fr"])
    const [activeLanguage, setActiveLanguage] = useState("eng")
    const [sentence, setSentence] = useState({"夕食を作りましょうか": "Shall we cook dinner"});
    const [tempSentences, setTempSentences] = useState([
        {"夕食を作りましょうか": "Shall we cook dinner"},
        {"親友は何人いる？": "How many best friends do you have?"},
        {"行くまいと決めた。": "I decided not to go."},
    ]);

    useEffect(() => {
        setLoading(false);
    }, []);

    const changeLanguageHandler = (directionOrLanguage) => {
        console.log(directionOrLanguage);
    }

    let snapshotContent = <p>Loading...</p>;
    if (!loading) {
        snapshotContent = (
            <PracticeSnapshot currentSentence={sentence} practiceMode={true} />
        );
    }

    return (
        <div className={classes.SectionThreeContainer}>
            <div className={classes.TitleContainer}>
                <h2>Try It Out</h2>
            </div>
            <div className={classes.LanguagesContainer}>
                <div className={classes.ArrowContainer} onClick={()=> changeLanguageHandler('left')}>
                    <i className={[classes.Arrow, classes.Left].join(' ')}></i>
                </div>
                <Languages langClass="Stretch" clicked={changeLanguageHandler} />
                <div className={classes.ArrowContainer} onClick={()=> changeLanguageHandler('right')}>
                    <i className={[classes.Arrow, classes.Right].join(' ')}></i>
                </div>
            </div>
            <div className={[classes.Box, classes.SnapshotContainer].join(' ')}>
                {snapshotContent}
            </div>
        </div>
    );
};

export default SectionThree;