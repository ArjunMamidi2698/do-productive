import { createContext, useContext, useEffect, useState } from "react";
import {
	addTaskRequest,
	deleteTaskRequest,
	getTasksRequest,
	updateTaskRequest,
} from "../services/task.service";
import { useAuth } from "./AuthContext";

const initialState = [];
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
	const { token } = useAuth();
	useEffect(() => {
		async function fetchData() {
			const res = await getTasksRequest({ Authorization: token });
			if (res.status == 200 && res.data && res.data.tasks) {
				setTasks(res.data.tasks);
			} else {
				// AJ - TODO - Show error message
			}
		}
		fetchData();
	}, []); // get after first render
	const value = {
		tasks: tasks,
		prioritiesList: initialContext.prioritiesList,
		addTask: async (newTask) => {
			// AJ - TODO - EMPTY VALIDATION CHECK
			const res = await addTaskRequest(newTask, { Authorization: token });
			if (res.status == 200 && res.data && res.data.task) {
				setTasks((prevTasks) => [res.data.task, ...prevTasks]);
			} else {
				// AJ - TODO - Show error message
			}
		},
		updateTask: async (taskObj) => {
			const res = await updateTaskRequest(taskObj, {
				Authorization: token,
			});
			if (res.status == 200 && res.data && res.data.task) {
				const updatedTask = res.data.task;
				setTasks((prevTasks) => {
					const taskIndex = prevTasks.findIndex(
						(task) => task.taskId === updatedTask.taskId
					);
					if (taskIndex >= 0) prevTasks[taskIndex] = updatedTask;
					return [...prevTasks];
				});
			} else {
				// AJ - TODO - Show error message
			}
		},
		deleteTask: async (taskObj) => {
			const res = await deleteTaskRequest(taskObj, {
				Authorization: token,
			});
			if (res.status == 200 && res.data && res.data.task) {
				const deletedTask = res.data.task;
				setTasks((prevTasks) =>
					prevTasks.filter(
						(task) => task.taskId !== deletedTask.taskId
					)
				);
			} else {
				// AJ - TODO - Show error message
			}
		},
	};
	return (
		<TasksContext.Provider value={value}>{children}</TasksContext.Provider>
	);
};
