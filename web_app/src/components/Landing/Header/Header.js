import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
    return (
        <header>
            <h2>JstSentences</h2>
            <NavLink to='/signin'>Sign In</NavLink>
        </header>
    );
};

export default Header;