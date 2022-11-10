import React from "react";
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";

const Auth = (props) => {
    return (
        <div>
            <SignIn />
            <SignUp />
        </div>
    );
};

export default Auth;