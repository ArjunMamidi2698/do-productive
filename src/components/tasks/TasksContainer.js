import { Card, CardContent, CardHeader } from "@mui/material";
import TaskRow from "./TaskRow";

import "./TasksContainer.css";

const TasksContainer = (props) => {
	const tasks = props.tasks;
	// actions
	const deleteTaskHandler = (taskId) => {
		props.updateTasks( tasks.filter((task) => task.taskId !== taskId) );
	};
	const updateTaskHandler = (taskObj) => {
		const taskIndex = tasks.findIndex(
			(task) => task.taskId === taskObj.taskId
		);
		if (taskIndex >= 0) tasks[taskIndex] = taskObj;
		props.updateTasks( tasks );
	};
	return (
		<Card className="tasks-container">
			<CardHeader title="Tasks To-DO" />
			<CardContent className="tasks-container__content">
				{tasks.map((task, index) => (
					<TaskRow
						key={"task-" + index}
						taskId={task.taskId}
						priorityLevel={task.priorityLevel}
						doneTask={task.doneTask}
						taskTitle={task.taskTitle}
						groupName={task.groupName}
						handleDeleteTask={deleteTaskHandler}
						handleTaskUpdate={updateTaskHandler}
						prioritiesList={props.prioritiesList}
					/>
				))}
				{/* <TaskRow priorityLevel={1} doneTask={true} taskTitle="test"/>
				<TaskRow taskTitle="task2"/>
				<TaskRow priorityLevel={0} taskTitle="task3" />
				<TaskRow />
				<TaskRow taskTitle="task-n" />
				<TaskRow />
				<TaskRow taskTitle="task-n" />
				<TaskRow priorityLevel="MEDIUM" taskTitle="task-n"/> */}
			</CardContent>
		</Card>
	);
};

export default TasksContainer;
