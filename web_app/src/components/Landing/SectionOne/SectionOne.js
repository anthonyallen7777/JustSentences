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

const SectionOne = () => {
    const { scrollX, scrollY } = useWindowScrollPositions()

    const [loading, setLoading] = useState(true);
    const [sentence, setSentence] = useState('');
    const [tempSentences, setTempSentences] = useState([
        {"夕食を作りましょうか": "Shall we cook dinner"},
        {"親友は何人いる？": "How many best friends do you have?"},
        {"行くまいと決めた。": "I decided not to go."},
    ]);

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
                    setSentence(tempSentences[tempSentences.length-1]);
                    return tempSentences.length-1;
                } else {
                    setSentence(tempSentences[prevCount]);
                    return prevCount;
                }
            });
            } else {
                setCurrIndex(prevCount => prevCount + 1);
            setCurrIndex(prevCount => {
                if (prevCount >= tempSentences.length) {
                    setSentence(tempSentences[0]);
                    return 0;
                } else {
                    setSentence(tempSentences[prevCount]);
                    return prevCount;
                }
            });
            }
        } else {
            setCurrIndex(prevCount => prevCount + 1);
            setCurrIndex(prevCount => {
                if (prevCount >= tempSentences.length) {
                    setSentence(tempSentences[0]);
                    return 0;
                } else {
                    setSentence(tempSentences[prevCount]);
                    return prevCount;
                }
            });
        }
    }, [tempSentences]);

    const [showText, setShowText] = useState(true);
    useEffect(() => {
        //Practice text animation display and animate
        setLoading(false);
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
    // console.log(scrollX, scrollY);
    let testBool = false;
    if (scrollY < 300) {
        testBool = true;
    } else {
        testBool = false;
    }
    return (
        <div className={classes.SectionOneContainer}>
            <div className={[classes.Box, classes.TextContainer].join(' ')}>
                <CSSTransition
                    in={testBool}
                    timeout={sectionOneTextTiming}
                    classNames={'fade-firstText'}
                    >
                        <p className={classes.PracticeText}>Practice</p>
                </CSSTransition>
                <CSSTransition
                    in={testBool}
                    timeout={sectionOneTextTiming}
                    classNames={'fade-secondText'}
                    >
                        <p className={classes.PracticeText}>With</p>
                </CSSTransition>
                <CSSTransition
                    in={testBool}
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

export default SectionOne;