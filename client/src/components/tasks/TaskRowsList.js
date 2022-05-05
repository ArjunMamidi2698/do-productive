import NoTasksView from "./NoTasksView";
import TaskRow from "./TaskRow";

const TaskRowsList = (props) => {
	const getSortedTasksByPriority = (tasks) => {
		if (!tasks) return [];
		return tasks.sort((a, b) =>
			a.priorityLevel > b.priorityLevel
				? 1
				: b.priorityLevel > a.priorityLevel
				? -1
				: 0
		);
	};
	const getFilteredTasks = (tasks) => {
		return tasks.filter((task) => props.isAllView || !task.doneTask);
	};
	const buildTaskRows = (tasks) => {
		const filteredTasks = getFilteredTasks(tasks);
		if (!filteredTasks.length) return <NoTasksView />;
		return getSortedTasksByPriority(filteredTasks).map((task, index) => (
			<TaskRow key={"task-" + task.taskId} task={task} />
		));
	};
	return buildTaskRows(props.tasks);
};

export default TaskRowsList;
