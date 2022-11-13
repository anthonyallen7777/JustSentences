import React, { useState } from "react";
import "../../../../node_modules/flag-icons/css/flag-icons.min.css";

import LanguageItem from "./LanguageItem/LanguageItem";

import classes from './Languages.module.css';

const Languages = props => {
    const [availableLanguages, setAvailableLanguages] = useState(['eng','jpn','fr']);
    return (
        <div className={classes[props.langClass]}>
            <LanguageItem langClass={props.langClass} clicked={props.clicked} />
            <LanguageItem langClass={props.langClass} clicked={props.clicked} />
            <LanguageItem langClass={props.langClass} clicked={props.clicked} />
            <LanguageItem langClass={props.langClass} clicked={props.clicked} />
        </div>
    );
};

export default Languages;