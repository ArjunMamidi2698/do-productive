import { Button, Container } from "@mui/material";
import "./App.css";
import Header from "./components/header/Header";
import TaskActions from "./components/filters/TaskActions";
import TasksContainer from "./components/tasks/TasksContainer";
import { useState } from "react";
import { Auth } from "./components/Auth/Auth";
import { useAuth } from "./stores/AuthContext";
import { useSnackbar } from "./stores/SnackbarContext";
function App() {
	const { token } = useAuth();
	const [isGroupView, setGroupView] = useState(false);
	const [isAllView, setAllView] = useState(false);

	const {
		showSuccessSnackbar,
		showErrorSnackbar,
		showInfoSnackbar,
		showWarningSnackbar,
	} = useSnackbar();
	const snackbarHandler = () => {
		showSuccessSnackbar("Snackbar message sample");
	};
	const snackbarHandler2 = () => {
		showErrorSnackbar("Snackbar message sample");
	};
	const snackbarHandler3 = () => {
		showWarningSnackbar("Snackbar message sample");
	};
	const snackbarHandler4 = () => {
		showInfoSnackbar("Snackbar message sample");
	};
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
					<Button onClick={snackbarHandler}>
						Show Success Snackbar
					</Button>
					<Button onClick={snackbarHandler2}>
						Show error Snackbar
					</Button>
					<Button onClick={snackbarHandler3}>
						Show warning Snackbar
					</Button>
					<Button onClick={snackbarHandler4}>
						Show info Snackbar
					</Button>
				</>
			) : (
				<Auth />
			)}
		</div>
	);
}

export default App;
