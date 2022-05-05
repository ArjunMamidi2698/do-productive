import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { TasksProvider } from "./stores/TasksContext.js";
import { GroupsProvider } from "./stores/GroupsContext";
import { AuthProvider } from "./stores/AuthContext";

ReactDOM.render(
	<React.StrictMode>
		<AuthProvider>
			<TasksProvider>
				<GroupsProvider>
					<App />
				</GroupsProvider>
			</TasksProvider>
		</AuthProvider>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
