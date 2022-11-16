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

const sectionTwoTextContainerTiming = {
    enter: 400,
    exit: 5000
};

const SectionTwo = (props) => {
    const { scrollX, scrollY } = useWindowScrollPositions();
    const {fetchedLanguages} = props;
    const [languages, setLanguages] = useState(null);

    const clickLanguageHandler = (languageClicked) => {
        changeLanguages(languageClicked);
    }

    const [currIndex, setCurrIndex] = useState(-1);
    const changeLanguages = useCallback((languageClicked) => {
        setCurrIndex(prevCount => prevCount + 1);
        setCurrIndex(prevCount => {
            if (prevCount >= fetchedLanguages.length) {
                setLanguages(fetchedLanguages[0]);
                return 0;
            } else {
                setLanguages(fetchedLanguages[prevCount]);
                return prevCount;
            }
        });
    }, [fetchedLanguages]);

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

    let playAnimationContainer = false;
    if (scrollY < 200) {
        playAnimationContainer = true;
    } else {
        playAnimationContainer = false;
    }

    return (
        <div className={classes.SectionTwoContainer}>
            <Languages langClass="Box" languages={languages}
            showLanguages={showLanguages} />
            <CSSTransition
                in={playAnimationContainer}
                timeout={sectionTwoTextContainerTiming}
                classNames={'fade-sectionTwoTextContainer'}
                >
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
            </CSSTransition>
        </div>
    );
};

export default SectionTwo;