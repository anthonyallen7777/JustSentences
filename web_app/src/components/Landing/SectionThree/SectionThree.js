import React, { useEffect, useState } from "react";

import Languages from "../Languages/Languages";
import PracticeSnapshot from "../PracticeSnapshot/PracticeSnapshot";
import DefaultButton from '../../UI/Buttons/DefaultButton/DefaultButton';

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

    const [loading, setLoading] = useState(true);
    const [languages, setLanguages] = useState(["fr","us","jp","ru","kw","kg"]);
    const [tempLanguages, setTempLanguages] = useState([
        ["fr","us","jp","ru","kw","kg"],
        ["fr","aw","at","az","bs","bb"],
        ["kn","lc","re","rw","ph","pr"]
    ]);
    const [activeLanguage, setActiveLanguage] = useState("fr");
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
        if (activeLanguage !== directionOrLanguage) {
            // console.log(activeLanguage);
            setActiveLanguage(directionOrLanguage);
        }
    }

    let content = null;
    let snapshotContent = <p>Loading...</p>;
    if (!loading) {
        if (sentence) {
            snapshotContent = (
                <PracticeSnapshot currentSentence={sentence} practiceMode={true} />
            );
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
                    <DefaultButton direction={"Left"} />
                    <Languages langClass="Stretch"
                    languages={languages}
                    clicked={changeLanguageHandler} />
                    <DefaultButton direction={"Right"} />
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
    }

    return content;
};

export default SectionThree;