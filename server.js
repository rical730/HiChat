/**
 * 这是有同构的server，后续还需要完善路由之间的跳转关系
 * @author Craig
 * @version 1.0
 * @date    2017-08-07
 */
import express from "express";
import fs from "fs";
import path from "path";
import React from "react";
import ReactDOMServer from "react-dom/server";
import http from "http";
import socketIO from "socket.io";

import { Provider } from "react-redux";
// import injectTapEventPlugin from "react-tap-event-plugin";
import chatContainer from "js/containers/chatContainer.js";
import mainContainer from "js/containers/mainContainer.js";
import { Router, Route, StaticRouter } from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import reducer from "js/reducers";
// import routes from "js/routes/route";
import { match, RoutingContext } from "react-router-dom";
import { createStore } from "redux";
let store = createStore(reducer);

const app = express();
const server = http.Server(app);
const io = socketIO(server);
// const router = express.Router();

// router.get("*", function(req, res) {
// 	res.redirect("/");
// });
// router.get("/", handler);

// the order of middleware inclusion is important.
app.use(express.static(path.join(__dirname, "./public"))); //where this file is does matter.
app.use(handler); // these 2 'use' functions are in order.
server.listen(3000);
console.log("server listens at 3000");

io.on("connection", function(socket) {
	socket.on("login", data => {
		console.log("login", data.userName);
		socket.userName = data.userName;
		io.emit("newUser", { userName: socket.userName, text: "login" });
	});
	socket.on("newMessage", data => {
		console.log("newMessage", data);
		io.emit("message", { userName: socket.userName, text: data.text });
	});
	socket.on("disconnect", data => {
		io.emit("logout", { userName: socket.userName, text: "logout" });
	});
});
const context = {};
function handler(req, res) {
	const html = ReactDOMServer.renderToString(
		<Provider store={store}>
			<MuiThemeProvider>
				<StaticRouter location={req.url} context={context}>
					<div>
						<Route exact path="/" component={mainContainer} />
						<Route path="/chat" component={chatContainer} />
					</div>
				</StaticRouter>
			</MuiThemeProvider>
		</Provider>
	);
	if (context.url) {
		res.writeHead(301, {
			Location: context.url
		});
		res.end();
	} else {
		fs.readFile("./public/index.html", "utf8", function(err, data) {
			if (err) throw err;
			const document = data.replace(
				/<div id="root"><\/div>/,
				`<div id="root">${html}</div>`
			);
			console.log(document);
			res.send(document);
		});
	}
}
// function handler(req, res) {
// 	match(
// 		{ routes, location: req.url },
// 		(error, redirectLocation, renderProps) => {
// 			if (error) {
// 				res.status(500).send(error.message);
// 			} else if (redirectLocation) {
// 				res.redirect(
// 					302,
// 					redirectLocation.pathname + redirectLocation.search
// 				);
// 			} else if (renderProps) {
// 				const html = ReactDOMServer.renderToString(
// 					<RoutingContext {...renderProps} />
// 				);
// 				console.log(html);
// 				res.status(200).send(html);
// 			} else {
// 				res.status(404).send("Not found");
// 			}
// 		}
// 	);
// }
