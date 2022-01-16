import { Card, CardContent, CardHeader } from "@mui/material";
import TaskRow from "./TaskRow";

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
	const getSortedTasksByPriority = (tasks) => {
		console.log( tasks );
		console.log(tasks.sort((a, b) =>
		a.priorityLevel > b.priorityLevel ? 1 : b.priorityLevel > a.priorityLevel ? -1 : 0
	));
		return tasks.sort((a, b) =>
			a.priorityLevel > b.priorityLevel ? 1 : b.priorityLevel > a.priorityLevel ? -1 : 0
		);
	};
	const getGroupedTasks = () => {
		let groupedTasks = [];
		props.groupsList.forEach((groupName) => {
			groupedTasks.push({
				groupName: groupName,
				tasks: tasks.filter((task) => task.groupName === groupName),
			});
		});
		groupedTasks.push({
			groupName: "Non-grouped",
			tasks: tasks.filter((task) => task.groupName === ""),
		});
		return groupedTasks;
	};
	const buildTaskRows = (tasks) => {
		return getSortedTasksByPriority(tasks).map((task, index) => (
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
		));
	};
	return (
		<Card className="tasks-container">
			<CardHeader title="Tasks To-DO" />
			<CardContent className="tasks-container__content">
				{props.isGroupView
					? getGroupedTasks().map((group, index) => (
							<div key={"group-"+index} className="tasks-container__content__group-container">
								<h4>{group.groupName}</h4>
								{buildTaskRows(group.tasks)}
							</div>
					  ))
					: buildTaskRows(tasks)}
			</CardContent>
		</Card>
	);
};

export default TasksContainer;
