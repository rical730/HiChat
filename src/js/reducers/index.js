import { combineReducers } from "redux";
import chatReducer from "./chatReducer.js";
import mainReducer from "./mainReducer.js";

const rootReducer = combineReducers({
	messages:chatReducer,
	userName:mainReducer
});
// const rootReducer = chatReducer;
export default rootReducer;
