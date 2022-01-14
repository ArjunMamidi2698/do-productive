import { Card, CardContent, CardHeader } from "@mui/material";
import TaskRow from "./TaskRow";

import "./TasksContainer.css";

const TasksContainer = () => {
	return (
		<Card className="tasks-container">
			<CardHeader title="Tasks To-DO" />
			<CardContent className="tasks-container__content">
				<TaskRow priorityLevel="HIGH" doneTask={true} taskTitle="test"/>
				<TaskRow taskTitle="task2"/>
				<TaskRow priorityLevel="LOW" taskTitle="task3" />
				<TaskRow />
				<TaskRow taskTitle="task-n" />
				<TaskRow />
				<TaskRow taskTitle="task-n" />
				<TaskRow priorityLevel="MEDIUM" taskTitle="task-n"/>
			</CardContent>
		</Card>
	);
};

export default TasksContainer;
