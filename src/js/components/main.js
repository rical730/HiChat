import React from "react";
import TextField from "material-ui/TextField";
import socket from 'js/socket';
class Main extends React.Component {
	constructor(props) {
		super(props);
		this.socket = socket.getInstance();
	}
	go = event => {
		if (event.which === 13 && event.target.value.trim()) {
			event.preventDefault();
			const userName = event.target.value.trim();
			console.log(userName);
			this.socket.emit('login',{
				userName:userName
			});
			const { userLogin } = this.props;
			userLogin(userName);
			this.props.history.push("/chat");
		}
	};
	render() {
		return (
			<TextField floatingLabelText="WHO ARE YOU" onKeyDown={this.go} />
		);
	}
}

export default Main;
