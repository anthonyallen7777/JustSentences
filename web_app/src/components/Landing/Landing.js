import React, { useEffect } from "react";
import Header from "./Header/Header";
import SectionOne from "./SectionOne/SectionOne";
import SectionTwo from "./SectionTwo/SectionTwo";
import SectionThree from "./SectionThree/SectionThree";
import SectionFour from "./SectionFour/SectionFour";

//redux
import { connect } from "react-redux";
import * as actions from '../../store/actions/index';

const Landing = (props) => {
    const {loading, onGlobalFetch, sampleSentences, fetchedLanguages} = props;
    useEffect(() => {
        onGlobalFetch();
    }, [onGlobalFetch]);

    let content = <p>Loading...</p>;
    if (!loading) {
        content = (
            <div>
                <Header />
                <SectionOne sampleSentences={sampleSentences} loading={loading} />
                <SectionTwo fetchedLanguages={fetchedLanguages} />
                <SectionThree fetchedLanguages={fetchedLanguages} sampleSentences={sampleSentences} />
                <SectionFour />
            </div>
        );
    }
    return content;
};

const mapStateToProps = state => {
    return {
        sampleSentences: state.global.sampleSentences,
        fetchedLanguages: state.global.fetchedLanguages,
        loading: state.global.loading
    };
}
  
const mapDispatchToProps = dispatch => {
    return {
        onGlobalFetch: () => dispatch(actions.globalFetch())
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(Landing);