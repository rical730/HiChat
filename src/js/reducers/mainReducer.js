import * as actions from "js/actions";

const initialState = '';

export default function mainReducer(state = initialState, action) {
	switch (action.type) {
		case actions.USER_LOGIN:
			return action.userName;
		default:
			return state;
	}
}
