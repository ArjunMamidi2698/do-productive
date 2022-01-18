import { Card, CardContent, CardHeader } from "@mui/material";
import GroupedTaskRowsList from "./GroupedTaskRowsList";
import TaskRowsList from "./TaskRowsList";

import "./TasksContainer.css";

const TasksContainer = (props) => {
	const tasks = props.tasks;
	// actions
	const deleteTaskHandler = (taskId) => {
		props.updateTasks(tasks.filter((task) => task.taskId !== taskId));
	};
	const updateTaskHandler = (taskObj) => {
		const taskIndex = tasks.findIndex(
			(task) => task.taskId === taskObj.taskId
		);
		if (taskIndex >= 0) tasks[taskIndex] = taskObj;
		props.updateTasks(tasks);
	};

	const buildTaskRowsList = (tasks) => {
		return (
			<TaskRowsList
				tasks={tasks}
				deleteTaskHandler={deleteTaskHandler}
				updateTaskHandler={updateTaskHandler}
				prioritiesList={props.prioritiesList}
				isAllView={props.isAllView}
			/>
		);
	};

	return (
		<Card className="tasks-container">
			<CardHeader title="Tasks To-DO" />
			<CardContent className="tasks-container__content">
				{props.isGroupView ? (
					<GroupedTaskRowsList
						groupsList={props.groupsList}
						tasks={props.tasks}
						buildTaskRowsList={buildTaskRowsList}
					/>
				) : (
					buildTaskRowsList(tasks)
				)}
			</CardContent>
		</Card>
	);
};

export default TasksContainer;
