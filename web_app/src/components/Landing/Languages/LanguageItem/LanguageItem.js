import React from "react";
import classes from './LanguageItem.module.css';

const LanguageItem = (props) => {
    return (
        <div className={classes.LanguageItemContainer}>
            <span className="fi fi-gr"></span>
        </div>
    );
};

export default LanguageItem;