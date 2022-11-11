import React, { useEffect, useState } from "react";

//redux
import { connect } from "react-redux";
import * as actions from '../../../store/actions/index';

const VerifyBanner = (props) => {
    const {shouldWeShowVerifyBanner, firstTimeSigningUp, onCheckVerification} = props;
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        onCheckVerification();
        setLoading(false);
    }, [onCheckVerification]);

    let banner = null;

    if (!loading) {
        if (shouldWeShowVerifyBanner) {
            if (firstTimeSigningUp) {
                banner = (
                    <React.Fragment>
                        <p>Thank you for signing up!</p>
                        <p>Please check your email to verify your account!</p>
                    </React.Fragment>
                );
            } else {
                banner = (
                <React.Fragment>
                        <p>Please check your email to verify your account!</p>
                        <p>If you don't verify your account by Dec 21st</p>
                        <p>it will be deleted!</p>
                </React.Fragment>
                );
            }
        }
    }

    return banner;
};

const mapStateToProps = state => {
    return {
        shouldWeShowVerifyBanner: state.authenticate.shouldWeShowVerifyBanner,
        firstTimeSigningUp: state.authenticate.firstTimeSigningUp
    };
}

const mapDispatchToProps = dispatch => {
    return {
      onCheckVerification: () => dispatch(actions.checkVerification())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyBanner);