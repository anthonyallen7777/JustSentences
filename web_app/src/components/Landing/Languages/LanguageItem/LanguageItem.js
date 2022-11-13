import React from "react";
import classes from './LanguageItem.module.css';

const LanguageItem = (props) => {
    return (
        <div className={classes[props.langClass]} onClick={()=> props.clicked('Finland')}>
            <span className="fi fi-gr"></span>
        </div>
    );
};

export default LanguageItem;