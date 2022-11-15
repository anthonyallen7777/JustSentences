import React from "react";
import classes from './LanguageItem.module.css';

const LanguageItem = (props) => {
    let lang = "fi fi-"+props.language;
    return (
        <div className={classes[props.langClass]} onClick={()=> props.clicked(props.language)}>
            <span className={lang}></span>
        </div>
    );
};

export default LanguageItem;