import React from "react";
import { useNavigate } from "react-router-dom";
import classes from './BackButton.module.css';

const BackButton = (props) => {
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-1);
    }

    return (
        <button className={classes.BackButton} onClick={goBack}></button>
    );
};

export default BackButton;