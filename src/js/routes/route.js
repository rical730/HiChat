import React from "react";
import chatContainer from "js/containers/chatContainer.js";
import mainContainer from "js/containers/mainContainer.js";

import { Router, Route, BrowserRouter } from "react-router-dom";
import { createBrowserHistory  } from "history";

const history = createBrowserHistory();

// server rendering is something different
// amazing! history injected successfully
// V4 is different from V3. The following example has 3 differences.
const Routes = (
	<BrowserRouter history={history}>
		<div>
			<Route exact path="/" component={mainContainer} />
			<Route path="/chat" component={chatContainer} />
		</div>
	</BrowserRouter>
);

export default Routes;
