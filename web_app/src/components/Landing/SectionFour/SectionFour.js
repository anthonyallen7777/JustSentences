import React from "react";
import SignUp from "../../Auth/SignUp/SignUp";
import classes from './SectionFour.module.css';

const SectionFour = () => {
    return (
        <div className={classes.SectionFourContainer} id="Get Started">
            <div className={classes.TextContainer}>
                <p className={classes.Text}>Get</p>
                <p className={classes.Text}>Started</p>
            </div>
            <div className={classes.SignUpContainer}>
                <SignUp isLanding={"LandingSignUp"} />
            </div>
        </div>
    );
};

export default SectionFour;