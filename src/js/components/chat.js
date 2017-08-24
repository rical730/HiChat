import React from "react";
import TextField from "material-ui/TextField";
import MessageList from "./MessageList";
import socket from "js/socket";

class Chat extends React.Component {
	constructor(props) {
		super(props);
		this.socket = socket.getInstance();
	}
	componentDidMount() {
		const { addMessage,addNotification } = this.props;
		this.socket.on("newUser", data => {
			addNotification(data);
		});
		this.socket.on("message", data => {
			// alert('data'); //console.log didn't work
			addMessage(data);
		});
		this.socket.on("logout", data => {
			addNotification(data);
		});
	}
	addM = event => {
		if (event.which === 13 && event.target.value.trim()) {
			event.preventDefault();
			this.socket.emit("newMessage", {
				text: event.target.value.trim()
			});
			event.target.value = "";
		}
	};
	render() {
		return (
			<div>
				<h1>Welcome to the online chat room</h1>

				<MessageList messages={this.props.messages}	/>

				<TextField
					hintText="type something here..."
					fullWidth={true}
					onKeyDown={this.addM}
				/>
			</div>
		);
	}
}
export default Chat;
