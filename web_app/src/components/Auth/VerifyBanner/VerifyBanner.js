import React, { useEffect } from "react";
import classes from './VerifyBanner.module.css';

//redux
import { connect } from "react-redux";
import * as actions from '../../../store/actions/index';

const VerifyBanner = (props) => {
    const {shouldWeShowVerifyBanner, firstTimeSigningUp, onCheckVerification} = props;
    useEffect(() => {
        onCheckVerification();
    }, [onCheckVerification]);

    let banner = null;

    if (JSON.parse(shouldWeShowVerifyBanner) === true) {
        if (JSON.parse(firstTimeSigningUp) === true) {
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
                    <p>If you don't verify your account by [EmailVerification Deadline Date]</p>
                    <p>it will be deleted!</p>
            </React.Fragment>
            );
        }
    }

    return (
        <div className={classes.Banner}>
            {banner}
        </div>
    );
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