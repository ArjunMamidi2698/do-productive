import { Card, CardContent, CardHeader } from "@mui/material";
import { useState } from "react";
import TaskRow from "./TaskRow";

import "./TasksContainer.css";

const TasksContainer = () => {
	const [tasks, setTasks] = useState([
		{
			taskId: "t1",
			taskTitle: "Something",
			priorityLevel: 0,
			doneTask: false,
		},
		{
			taskId: "t2",
			taskTitle: "Something-2",
			priorityLevel: 1,
			doneTask: false,
		},
		{
			taskId: "t3",
			taskTitle: "Something-3",
			priorityLevel: 2,
			doneTask: false,
		},
		{
			taskId: "t4",
			taskTitle: "Something-n",
			priorityLevel: 3,
			doneTask: false,
		},
		{
			taskId: "t5",
			taskTitle: "",
			priorityLevel: -1,
			doneTask: false,
		},
		{
			taskId: "t6",
			taskTitle: "Something-6",
			priorityLevel: 5,
			doneTask: false,
		},
	]);
	// actions
	const deleteTaskHandler = (taskId) => {
		setTasks((prevStateTasks) =>
			prevStateTasks.filter((task) => task.taskId !== taskId)
		);
	};
	const updateTaskHandler = (taskObj) => {
		const taskIndex = tasks.findIndex(
			(task) => task.taskId === taskObj.taskId
		);
		if (taskIndex >= 0) tasks[taskIndex] = taskObj;
		setTasks([...tasks]); // consider new array for rebuilding
		// // AJ - TODO - UPDATE in DB
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
						handleDeleteTask={deleteTaskHandler}
						handleTaskUpdate={updateTaskHandler}
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
