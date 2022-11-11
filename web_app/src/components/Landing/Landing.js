import React, { useEffect } from "react";
import Header from "./Header/Header";
import SectionOne from "./SectionOne/SectionOne";
import SectionTwo from "./SectionTwo/SectionTwo";
import SectionThree from "./SectionThree/SectionThree";
import SectionFour from "./SectionFour/SectionFour";

const Landing = () => {
    return (
        <div>
            <Header />
            <SectionOne />
            <SectionTwo />
            <SectionThree />
            <SectionFour />
        </div>
    );
};



export default Landing;