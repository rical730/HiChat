import React from "react";
import ReactDOM from "react-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { Provider } from "react-redux";
import injectTapEventPlugin from "react-tap-event-plugin";
import Routes from "js/routes/route";
import reducer from "js/reducers";
import { createStore } from "redux";
//inject to avoid warnings of tap event
injectTapEventPlugin();

let store = createStore(reducer);

ReactDOM.render(
	<Provider store={store}>
		<MuiThemeProvider>
			{Routes}
		</MuiThemeProvider>
	</Provider>,
	document.getElementById("root")
);
