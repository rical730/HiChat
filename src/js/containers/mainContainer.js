import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Main from "js/components/main";
import * as actions from "js/actions";

class mainContainer extends Component {
    render() {
        return <Main {...this.props} />;
    }
}

const mapStateToProps = null;// unsubscribe to store updates

const mapDispatchToProps = (dispatch, ownProps) => {
    return bindActionCreators(
        {
            userLogin: actions.userLogin
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(mainContainer);
