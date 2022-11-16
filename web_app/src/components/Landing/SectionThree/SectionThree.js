import React, { useEffect, useState } from "react";

import Languages from "../Languages/Languages";
import PracticeSnapshot from "../PracticeSnapshot/PracticeSnapshot";

//CSS
import classes from './SectionThree.module.css';
import CSSTransition from 'react-transition-group/CSSTransition';
import './SectionThreeAnimations.css';

//hooks
import { useWindowScrollPositions } from "../../../hooks/scroll-hook";

const practiceModeTiming = {
    enter: 400,
    exit: 5000
};


const SectionThree = (props) => {
    const { scrollX, scrollY } = useWindowScrollPositions();
    
    const [numberOfAttempts, setNumberOfAttempts] = useState(0);
    const [sentenceIndex, setSentenceIndex] = useState(0);
    const [languages, setLanguages] = useState(["jp","es"]);
    const [activeLanguage, setActiveLanguage] = useState("jp");
    const [tempSentences, setTempSentences] = useState({
		"esSentences": [
			{
				"beunos dias": "Good morning."
			},
			{
				"how was dinner?": "como estuvo la cena?"
			},
			{
				"Tome el bus": "I took the bus."
			}
		],
		"jaSentences": [
			{
				"夕食を作りましょうか": "Shall we cook dinner"
			},
			{
				"親友は何人いる？": "How many best friends do you have?"
			},
			{
				"行くまいと決めた。": "I decided not to go."
			}
		]
	});

    const changeLanguageHandler = (directionOrLanguage) => {
        if (activeLanguage !== directionOrLanguage) {
            setActiveLanguage(directionOrLanguage);
        }
    }
    
    const changeSentenceHandler = (knowOrDont) => {
        //they knew it
        if (knowOrDont) {
            setSentenceIndex(prevCount => prevCount + 1);
            setSentenceIndex(prevCount => {
                //fix this to work with any array length
                if (prevCount >= tempSentences.jaSentences.length) {
                    return 0;
                } else {
                    return prevCount;
                }
            });
            setNumberOfAttempts(0);
        }
        //didnt know it
        else {
            if (numberOfAttempts > 5) {
                console.log("TOO MANY TRIES");
                setSentenceIndex(prevCount => prevCount + 1);
                setSentenceIndex(prevCount => {
                    if (prevCount >= tempSentences.jaSentences.length) {
                        return 0;
                    } else {
                        return prevCount;
                    }
                });
                setNumberOfAttempts(0);
            } else {
                setNumberOfAttempts(prevCount => prevCount+1);
            }
        }
    }

    let content = null;
    let snapshotContent = <p>Loading...</p>;

    if (tempSentences) {
        switch(activeLanguage) {
            case 'jp': {
                snapshotContent = (
                    <PracticeSnapshot
                    currentSentence={tempSentences.jaSentences[sentenceIndex]}
                    practiceMode={true}
                    clicked={changeSentenceHandler} />
                );
                break;
            }
            case 'es' : {
                snapshotContent = (
                    <PracticeSnapshot
                    currentSentence={tempSentences.esSentences[sentenceIndex]}
                    practiceMode={true}
                    clicked={changeSentenceHandler}/>
                );
                break;
            }
            default:
                break;
        }
    }
    let showContent = false;
    if (scrollY < 1000) {
        showContent = true;
    } else {
        showContent = false;
    }
    
    content = <div className={classes.SectionThreeContainer}>
    <div className={classes.TitleContainer}>
            <h2>Try It Out</h2>
        </div>
        <CSSTransition
        in={showContent}
        timeout={practiceModeTiming}
        classNames={'fade-sectionThreeContainer'}
        >
            <div className={classes.LanguagesContainer}>
                <Languages langClass="Stretch"
                languages={languages}
                clicked={changeLanguageHandler} />
            </div>
        </CSSTransition>
        <CSSTransition
        in={showContent}
        timeout={practiceModeTiming}
        classNames={'fade-sectionThreeContainer'}
        >
            <div className={[classes.Box, classes.SnapshotContainer].join(' ')}>
            {snapshotContent}
        </div>
        </CSSTransition>
    </div>

    return content;
};

export default SectionThree;