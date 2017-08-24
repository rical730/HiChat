import client from "socket.io-client";
const singleTon = (function() {
	function init() {
		const socket = client.connect("http://localhost:3000");
		return socket;
	}
	let _instance;
	let _static = {
		getInstance: function() {
			if (_instance == undefined) {
				_instance = new init();
			}
			return _instance;
		}
	};

	return _static;
})();

export default singleTon;
