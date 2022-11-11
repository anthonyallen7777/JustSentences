import React from "react";
import { useLocation } from "react-router-dom";

const Base = (props) => {
    const search = useLocation().search;
    const verifyCode = new URLSearchParams(search).get('oobCode');
    console.log(verifyCode);
    return (
        <div>
            <h1>HEafdfO</h1>
        </div>
    );
};

export default Base;