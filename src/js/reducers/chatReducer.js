import * as actions from "js/actions";

const initialState = [
	{ text: "hi", userName: "host", messageType: actions.NOTIFICATION }
];

export default function chatReducer(state = initialState, action) {
	switch (action.type) {
		case actions.ADD_MESSAGE:
			return [
				...state,
				{
					text: action.text,
					userName: action.userName,
					messageType: actions.MESSAGE
				}
			];
		case actions.ADD_NOTIFICATION:
			return [
				...state,
				{
					text: action.text,
					userName: action.userName,
					messageType: actions.NOTIFICATION
				}
			];
		default:
			return state;
	}
}
