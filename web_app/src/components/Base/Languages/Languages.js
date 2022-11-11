import React from "react";
import classes from './Languages.module.css';

const Languages = (props) => {
    return (
        <div>
            <div>
                <h2>Languages</h2>
            </div>
            <div>
                <div className={classes.Language}>
                    <div>
                        <form>
                            <label htmlFor="language1">English</label>
                            <div>
                                <p>Preferred</p>
                                <input type="checkbox" id="language1" name="english" value="Eng" />
                            </div>
                        </form>
                        <div>
                            <p>Amount Practiced</p>
                            <p>5:32</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Languages;