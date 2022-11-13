import React from "react";
import Languages from "../Languages/Languages";
import classes from './SectionTwo.module.css';

const SectionTwo = (props) => {
    return (
        <div className={classes.SectionTwoContainer}>
            <Languages langClass="Box" />
            <div className={classes.TextContainer}>
                <p className={classes.Text}>Available</p>
                <p className={classes.Text}>Languages</p>
            </div>
        </div>
    );
};

export default SectionTwo;