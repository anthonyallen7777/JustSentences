import React from "react";
import classes from './DefaultButton.module.css';

const DefaultButton = (props) => {
    const onClickHandler = () => {

    }

    return (
        <div className={classes.ArrowContainer}  onClick={onClickHandler}>
                <i className={[classes.Arrow, classes[props.direction]].join(' ')}></i>
        </div>
    );
};

export default DefaultButton;