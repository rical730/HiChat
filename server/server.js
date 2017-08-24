/**
 * 这是没有同构的server
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


const app = express();
const server = http.Server(app);
const io = socketIO(server);
const router = express.Router();

console.log(__dirname);
router.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.use(router); // the order of middleware inclusion is important.
app.use(express.static(path.join(__dirname, "../public")));
server.listen(3000);
console.log("server listens at 3000");

io.on("connection", function(socket) {
	socket.on("login", data => {
		console.log("login",data.userName);
		socket.userName = data.userName;
		io.emit("newUser", { userName: socket.userName ,text:"login"});
	});
	socket.on("newMessage", data => {
		console.log("newMessage",data);
		io.emit("message", { userName: socket.userName ,text:data.text});
	});
	socket.on("disconnect", data => {
		io.emit("logout", { userName: socket.userName ,text:"logout"});
	});
});

