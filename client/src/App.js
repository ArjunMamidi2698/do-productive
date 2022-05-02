import { Container } from "@mui/material";
import "./App.css";
import Header from "./components/header/Header";
import TaskActions from "./components/filters/TaskActions";
import TasksContainer from "./components/tasks/TasksContainer";
import { useState } from "react";
function App() {
	const [isGroupView, setGroupView] = useState(false);
	const [isAllView, setAllView] = useState(false);
	return (
		<div className="App do-productive">
			<Header />
			<Container>
				<TaskActions
					isGroupView={isGroupView}
					setGroupView={setGroupView}
					isAllView={isAllView}
					setAllView={setAllView}
				/>
				<TasksContainer
					isGroupView={isGroupView}
					isAllView={isAllView}
				/>
			</Container>
		</div>
	);
}

export default App;