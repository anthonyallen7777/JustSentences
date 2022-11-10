import React, { useState } from "react";
import "../../../../node_modules/flag-icons/css/flag-icons.min.css";

import LanguageItem from "../LanguageItem/LanguageItem";

import classes from './Languages.module.css';

const Languages = props => {
    const [availableLanguages, setAvailableLanguages] = useState(['eng','jpn','fr']);
    const concatClasses = [classes[props.langClass], classes.Main].join(' ');
    return (
        <div className={concatClasses}>
            <LanguageItem />
            <LanguageItem />
            <LanguageItem />
            <LanguageItem />
        </div>
    );
};

export default Languages;