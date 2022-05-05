import { Container } from "@mui/material";
import "./App.css";
import Header from "./components/header/Header";
import TaskActions from "./components/filters/TaskActions";
import TasksContainer from "./components/tasks/TasksContainer";
import { useState } from "react";
import { Auth } from "./components/Auth/Auth";
import { useAuth } from "./stores/AuthContext";
function App() {
	const { token } = useAuth();
	const [isGroupView, setGroupView] = useState(false);
	const [isAllView, setAllView] = useState(false);
	return (
		<div className="App do-productive">
			{token ? (
				<>
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
				</>
			) : (
				<Auth />
			)}
		</div>
	);
}

export default App;
