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
    const [loading, setLoading] = useState(false);

    let content = <p>Loading...</p>;

    if (props.languages) {
        content = (
        <div className={classes[props.langClass]}>
            <CSSTransition
                in={props.showLanguages}
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
                        <LanguageItem langClass={props.langClass}
                        language={props.languages[2]}
                        clicked={props.clicked} />
                        <LanguageItem langClass={props.langClass}
                        language={props.languages[3]}
                        clicked={props.clicked} />
                        <LanguageItem langClass={props.langClass}
                        language={props.languages[4]}
                        clicked={props.clicked} />
                        <LanguageItem langClass={props.langClass}
                        language={props.languages[5]}
                        clicked={props.clicked} />
                    </div>
            </CSSTransition>
        </div>
        );
    }
    return content;
};

export default Languages;