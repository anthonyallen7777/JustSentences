import React, { useEffect, useState } from "react";
import "../../../../node_modules/flag-icons/css/flag-icons.min.css";

//CSS
import LanguageItem from "./LanguageItem/LanguageItem";
import CSSTransition from 'react-transition-group/CSSTransition';
import './LanguagesAnimations.css';
import classes from './Languages.module.css';

const sectionTwoLanguagesTiming = {
    enter: 400,
    exit: 1000
}

const Languages = props => {
    let content = <p>Loading...</p>;

    // const languages = Object.keys(props.languages)
    // .map(objKey => {
    //     return (
    //         <LanguageItem langClass={props.langClass}
    //         language={props.languages[objKey]}
    //         clicked={props.clicked} />
    //     );
    // });

    if (props.languages) {
        content = (
        <div className={classes[props.langClass]}>
            <CSSTransition
                in={false/*props.showLanguages*/}
                timeout={sectionTwoLanguagesTiming}
                classNames={'fade-sectionTwoLanguages'}
                >
                    <div className={classes.Container}>
                        <LanguageItem langClass={props.langClass}
                        language={props.languages[0]}
                        clicked={props.clicked} />
                        <LanguageItem langClass={props.langClass}
                        language={props.languages[1]}
                        clicked={props.clicked} />
                    </div>
            </CSSTransition>
        </div>
        );
    }
    return content;
};

export default Languages;