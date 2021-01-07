import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./store";
import { Socket } from "./services/sockets";

ReactDOM.render(
	<React.StrictMode>
		<Socket.Provider>
			<Provider store={store}>
				<App />
			</Provider>
		</Socket.Provider>
	</React.StrictMode>,
	document.getElementById("root")
);

reportWebVitals();
