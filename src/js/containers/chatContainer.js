import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Chat from "js/components/chat";
import * as actions from "js/actions";

class chatContainer extends Component {
    render() {
        return <Chat {...this.props} />;
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        userName: state.userName,
        messages: state.messages
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return bindActionCreators(
        {
            addMessage: actions.addMessage,
            addNotification: actions.addNotification
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(chatContainer);
