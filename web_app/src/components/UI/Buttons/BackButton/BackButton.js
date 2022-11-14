import React from "react";
import { useNavigate } from "react-router-dom";
import classes from './BackButton.module.css';

const BackButton = (props) => {
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    }

    return (
        <div className={classes.ArrowContainer}  onClick={goBack}>
                <i className={[classes.Arrow, classes.Left].join(' ')}></i>
        </div>
    );
};

export default BackButton;