import React, { useCallback, useEffect, useState } from "react";
import Languages from "../Languages/Languages";

//css
import classes from './SectionTwo.module.css';
import CSSTransition from 'react-transition-group/CSSTransition';
import './SectionTwoAnimations.css';

//hooks
import { useWindowScrollPositions } from "../../../hooks/scroll-hook";

const sectionTwoTextTiming = {
    enter: 400,
    exit: 5000
};

const SectionTwo = (props) => {
    const { scrollX, scrollY } = useWindowScrollPositions();
    
    const [languages, setLanguages] = useState(null);
    const [tempLanguages, setTempLanguages] = useState([
        ["fr","us","jp","ru","kw","kg"],
        ["fr","aw","at","az","bs","bb"],
        ["kn","lc","re","rw","ph","pr"]
    ]);

    const clickLanguageHandler = (languageClicked) => {
        changeLanguages(languageClicked);
    }

    const [currIndex, setCurrIndex] = useState(-1);
    const changeLanguages = useCallback((languageClicked) => {
        setCurrIndex(prevCount => prevCount + 1);
        setCurrIndex(prevCount => {
            if (prevCount >= tempLanguages.length) {
                setLanguages(tempLanguages[0]);
                return 0;
            } else {
                setLanguages(tempLanguages[prevCount]);
                return prevCount;
            }
        });
    }, [tempLanguages]);

    const [showLanguages, setShowLanguages] = useState(true);
    useEffect(() => {
        //Practice text animation display and animate
        changeLanguages();
        setTimeout(() => {
            setShowLanguages(false);
        }, 2600);
        const intervalId = setInterval(() => {
            changeLanguages();
            setShowLanguages(true);
            setTimeout(() => {
                setShowLanguages(false);
            }, 2600);
            
        }, 3000);
        return () => clearInterval(intervalId);
    }, [changeLanguages]);

    let playAnimation = false;
    if (scrollY < 1100) {
        playAnimation = true;
    } else {
        playAnimation = false;
    }

    return (
        <div className={classes.SectionTwoContainer}>
            <Languages langClass="Box" languages={languages}
            showLanguages={showLanguages} />
            <div className={classes.TextContainer}>
                <CSSTransition
                    in={playAnimation}
                    timeout={sectionTwoTextTiming}
                    classNames={'fade-sectionTwoFirstText'}
                    >
                        <p className={classes.Text}>Available</p>
                </CSSTransition>
                <CSSTransition
                    in={playAnimation}
                    timeout={sectionTwoTextTiming}
                    classNames={'fade-sectionTwoSecondText'}
                    >
                        <p className={classes.Text}>Languages</p>
                </CSSTransition>
            </div>
        </div>
    );
};

export default SectionTwo;