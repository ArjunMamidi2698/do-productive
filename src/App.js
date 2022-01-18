import { Container } from "@mui/material";
import "./App.css";
import Header from "./components/header/Header";
import TaskActions from "./components/filters/TaskActions";
import TasksContainer from "./components/tasks/TasksContainer";
import { useState } from "react";
function App() {
	const prioritiesList = [1, 2, 3, 4];
	const [groupsList, setGroupsList] = useState(["TODO APP", "EXPENSE APP"]);
	const [tasks, setTasks] = useState([
		{
			taskId: "t1",
			taskTitle: "Something",
			priorityLevel: 4,
			doneTask: false,
			groupName: "TODO APP",
		},
		{
			taskId: "t2",
			taskTitle: "Something-2",
			priorityLevel: 1,
			doneTask: false,
			groupName: "EXPENSE APP",
		},
		{
			taskId: "t3",
			taskTitle: "Something-3",
			priorityLevel: 2,
			doneTask: false,
			groupName: "",
		},
		{
			taskId: "t4",
			taskTitle: "Something-n",
			priorityLevel: 3,
			doneTask: false,
			groupName: "",
		},
		{
			taskId: "t5",
			taskTitle: "",
			priorityLevel: 4,
			doneTask: false,
			groupName: "TODO APP",
		},
		{
			taskId: "t6",
			taskTitle: "Something-6",
			priorityLevel: 4,
			doneTask: false,
			groupName: "",
		},
	]);
	const generateNewTaskId = () => {
		// AJ - TODO - NOT A OPTIMAL WAY
		const lastTaskId = tasks[tasks.length - 1].taskId;
		console.log(lastTaskId);
		return "t" + (parseInt(lastTaskId.slice(1)) + 1);
	};
	const handleAddTask = (taskObj) => {
		console.log(taskObj, "ASDasdasdasdsda");
		// // AJ - TODO - UPDATE in DB
		setTasks((prevTasks) => [...prevTasks, taskObj]);
	};
	const updateTasks = (tasks) => {
		// // AJ - TODO - UPDATE in DB
		setTasks(() => [...tasks]); // consider new array for rebuilding
	};
	const addToGroupsList = ( groupName ) => {
		console.log( groupName, groupsList );
		setGroupsList( (prevList) => [...prevList, groupName]);
	};

	const [isGroupView, setGroupView] = useState(false);
	const [isAllView, setAllView] = useState(false);
	return (
		<div className="App do-productive">
			<Header
				prioritiesList={prioritiesList}
				groupsList={groupsList}
				generateNewTaskId={generateNewTaskId}
				handleAddTask={handleAddTask}
				addToGroupsList={addToGroupsList}
			/>
			<Container>
				<TaskActions
					isGroupView={isGroupView}
					setGroupView={setGroupView}
					isAllView={isAllView}
					setAllView={setAllView}
				/>
				<TasksContainer
					tasks={tasks}
					prioritiesList={prioritiesList}
					groupsList={groupsList}
					updateTasks={updateTasks}
					isGroupView={isGroupView}
					isAllView={isAllView}
				/>
			</Container>
		</div>
	);
}

export default App;
