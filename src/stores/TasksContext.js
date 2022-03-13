import { createContext, useContext, useState } from "react";

const initialState = [
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
];
const initialContext = {
	tasks: [],
	prioritiesList: [1, 2, 3, 4],
	addTask: (newTask) => undefined,
	updateTask: (taskObj) => undefined,
	deleteTask: (taskObj) => undefined,
};
export const TasksContext = createContext(initialContext);
export const useTasks = () => useContext(TasksContext);
export const TasksProvider = ({ children }) => {
	const [tasks, setTasks] = useState(initialState);
	const value = {
		tasks: tasks,
		prioritiesList: initialContext.prioritiesList,
		addTask: (newTask) => {
			setTasks((prevTasks) => [newTask, ...prevTasks]);
		},
		updateTask: (taskObj) => {
			setTasks((prevTasks) => {
				const taskIndex = prevTasks.findIndex(
					(task) => task.taskId === taskObj.taskId
				);
				if (taskIndex >= 0) prevTasks[taskIndex] = taskObj;
				return [...prevTasks];
			});
		},
		deleteTask: (taskObj) => {
			setTasks((prevTasks) =>
				prevTasks.filter((task) => task.taskId != taskObj.taskId)
			);
		},
	};
	return (
		<TasksContext.Provider value={value}>{children}</TasksContext.Provider>
	);
};
