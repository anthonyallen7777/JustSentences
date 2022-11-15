import React from "react";
import SignUp from "../../Auth/SignUp/SignUp";

//CSS
import classes from './SectionFour.module.css';
import CSSTransition from 'react-transition-group/CSSTransition';
import './SectionFourAnimations.css';

//hooks
import { useWindowScrollPositions } from "../../../hooks/scroll-hook";

const sectionFourTextTiming = {
    enter: 400,
    exit: 1000
};

const SectionFour = () => {
    const { scrollX, scrollY } = useWindowScrollPositions();
    let playAnimation = false;
    if (scrollY > 2100) {
        playAnimation = true;
    } else {
        playAnimation = false;
    }
    return (
        <div className={classes.SectionFourContainer} id="Get Started">
            <div className={classes.TextContainer}>
                <CSSTransition
                in={playAnimation}
                timeout={sectionFourTextTiming}
                classNames={'fade-sectionFourFirstText'}
                >
                    <p className={classes.Text}>Get</p>
                </CSSTransition>
                <CSSTransition
                in={playAnimation}
                timeout={sectionFourTextTiming}
                classNames={'fade-sectionFourSecondText'}
                >
                    <p className={classes.Text}>Started</p>
                </CSSTransition>
            </div>
            <div className={classes.SignUpContainer}>
                <SignUp isLanding={"LandingSignUp"} />
            </div>
        </div>
    );
};

export default SectionFour;