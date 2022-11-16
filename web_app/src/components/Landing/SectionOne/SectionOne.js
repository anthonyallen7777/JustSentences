import React, { useCallback, useEffect, useState } from "react";

//css
import PracticeSnapshot from "../PracticeSnapshot/PracticeSnapshot";
import classes from './SectionOne.module.css';
import CSSTransition from 'react-transition-group/CSSTransition';
import './SectionOneAnimations.css';

//hooks
import { useWindowScrollPositions } from "../../../hooks/scroll-hook";

const sectionOneTextTiming = {
    enter: 400,
    exit: 5000
};

const SectionOne = (props) => {
    const { scrollX, scrollY } = useWindowScrollPositions();
    const {sampleSentences} = props;
    const [loading, setLoading] = useState(true);
    const [showText, setShowText] = useState(true);
    const [sentence, setSentence] = useState('');

    const snapshotChangeHandler = (clickDirection) => {
        testFunc(clickDirection);
    }

    const [currIndex, setCurrIndex] = useState(-1);
    const testFunc = useCallback((clicked) => {
        if (clicked) {
            if (clicked === 'left') {
                setCurrIndex(prevCount => prevCount - 1);
                setCurrIndex(prevCount => {
                if (prevCount < 0) {
                    setSentence(sampleSentences[sampleSentences.jaSentences.length-1]);
                    return sampleSentences.length-1;
                } else {
                    setSentence(sampleSentences[prevCount]);
                    return prevCount;
                }
            });
            } else {
                setCurrIndex(prevCount => prevCount + 1);
                setCurrIndex(prevCount => {
                if (prevCount >= sampleSentences.jaSentences.length) {
                    setSentence(sampleSentences.jaSentences[0]);
                    return 0;
                } else {
                    setSentence(sampleSentences.jaSentences[prevCount]);
                    return prevCount;
                }
            });
            }
        } else {
            setCurrIndex(prevCount => prevCount + 1);
            setCurrIndex(prevCount => {
                if (prevCount >= sampleSentences.jaSentences.length) {
                    setSentence(sampleSentences.jaSentences[0]);
                    return 0;
                } else {
                    setSentence(sampleSentences.jaSentences[prevCount]);
                    return prevCount;
                }
            });
        }
    }, [sampleSentences]);

    useEffect(() => {
        setLoading(false);
        //Practice text animation display and animate
        testFunc();
        setTimeout(() => {
            setShowText(false);
        }, 2600);
        const intervalId = setInterval(() => {
            testFunc();
            setShowText(true);
            setTimeout(() => {
                setShowText(false);
            }, 2600);
        }, 3000);
        return () => clearInterval(intervalId);
    }, [testFunc]);

    let snapshotContent = <p>Loading...</p>;
    if (!loading) {
        snapshotContent = (
            <PracticeSnapshot currentSentence={sentence}
            currIndex={currIndex}
            showText={showText}
            clicked={snapshotChangeHandler} practiceMode={false} />
        );
    }
    let playAnimation = false;
    if (scrollY < 300) {
        playAnimation = true;
    } else {
        playAnimation = false;
    }
    return (
        <div className={classes.SectionOneContainer}>
            <div className={[classes.Box, classes.TextContainer].join(' ')}>
                <CSSTransition
                    in={playAnimation}
                    timeout={sectionOneTextTiming}
                    classNames={'fade-firstText'}
                    >
                        <p className={classes.PracticeText}>Practice</p>
                </CSSTransition>
                <CSSTransition
                    in={playAnimation}
                    timeout={sectionOneTextTiming}
                    classNames={'fade-secondText'}
                    >
                        <p className={classes.PracticeText}>With</p>
                </CSSTransition>
                <CSSTransition
                    in={playAnimation}
                    timeout={sectionOneTextTiming}
                    classNames={'fade-lastText'}
                    >
                        <p className={classes.PracticeText}>Sentences</p>
                </CSSTransition>
            </div>
            <div className={[classes.Box, classes.SnapshotContainer].join(' ')}>
                {snapshotContent}
            </div>
        </div>
    );
};

export default (SectionOne);