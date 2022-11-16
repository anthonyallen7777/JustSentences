import React from "react";
import classes from './Correct.module.css';

const Incorrect = (props) => {
    return (
        <div className={classes.Container}>
            <p>+</p>
        </div>
    );
};

export default Incorrect;