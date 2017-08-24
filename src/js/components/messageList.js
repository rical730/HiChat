import List from "material-ui/List";
import ListItem from "material-ui/List/ListItem";
import Paper from "material-ui/Paper";
import React from "react";
import * as actions from "js/actions";
class MessageList extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div>
				{this.props.messages.length &&
					this.props.messages.map((value, index) => {
						if (value.messageType == actions.MESSAGE) {
							return (
								<Paper
									zDepth={1}
									key={index}
									children={
										<ListItem
											primaryText={
												<span>{value.userName}{' : '}</span>
											}
											secondaryText={
												<span
													style={{
														color: "#000",
														fontSize: "16px"
													}}
												>
													{value.text}
												</span>
											}
											onTouchTap={event => {
												event.preventDefault();
											}}
											onClick={event => {
												event.preventDefault();
											}}
										/>
									}
								/>
							);
						}
						if (value.messageType == actions.NOTIFICATION) {
							return (
								<Paper
									zDepth={1}
									key={index}
									children={
										<ListItem
											primaryText={
												<span>
													{value.userName}
													{" "}
													{value.text}
												</span>
											}
										/>
									}
								/>
							);
						}
					})}
			</div>
		);
	}
}
export default MessageList;
