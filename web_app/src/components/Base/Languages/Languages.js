import React from "react";
import classes from './Languages.module.css';

import BackButton from "../../UI/Buttons/BackButton/BackButton";

const Languages = () => {
    return (
        <div className={classes.Container}>
            <BackButton />
            <div className={classes.TitleContainer}>
                <h2>Languages</h2>
            </div>
            <div className={classes.LanguageMainContainer}>
                <form className={classes.Form}>
                    <div className={classes.FormHeaders}>
                        <div className={classes.LanguagesHeader}>
                            <p>Languages</p>
                        </div>
                        <div className={classes.PreferredHeader}>
                            <p>Preferred</p>
                        </div>
                        <div className={classes.AmountPracticedHeader}>
                            <p>Amount Practiced</p>
                        </div>
                    </div>
                    <div className={classes.LanguagesContainer}>
                        <div className={classes.IndividualLanguageContainer}>
                            <div className={classes.Box}>
                                <label htmlFor="language1">English</label>
                            </div>
                            <div className={classes.Box}>
                                <input onChange={() => false} checked
                                type="checkbox" id="language1" name="english" value="eng" />
                            </div>
                            <div className={classes.Box}>
                                <div className={classes.AmountPracticedContainer}>
                                    <p>5 Days, 4hrs, 32min</p>
                                </div>
                            </div>
                        </div>
                        <div className={classes.IndividualLanguageContainer}>
                            <div className={classes.Box}>
                                <label htmlFor="language2">Japanese</label>
                            </div>
                            <div className={classes.Box}>
                                <input onChange={() => false}
                                type="checkbox" id="language2" name="japanese" value="ja" />
                            </div>
                            <div className={classes.Box}>
                                <div className={classes.AmountPracticedContainer}>
                                    <p>0 Days, 1hrs, 32min</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                
            </div>
        </div>
    );
};

export default Languages;