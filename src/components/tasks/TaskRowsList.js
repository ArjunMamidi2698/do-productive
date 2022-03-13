import TaskRow from "./TaskRow";

const TaskRowsList = (props) => {
	const getSortedTasksByPriority = (tasks) => {
		if( !tasks ) return [];
		return tasks.sort((a, b) =>
			a.priorityLevel > b.priorityLevel
				? 1
				: b.priorityLevel > a.priorityLevel
				? -1
				: 0
		);
	};
	const filteredTasks = (tasks) => {
		return tasks.filter((task) => props.isAllView || !task.doneTask);
	};
	const buildTaskRows = (tasks) => {
		return getSortedTasksByPriority(filteredTasks(tasks)).map(
			(task, index) => (
				<TaskRow
					key={"task-" + task.taskId}
					taskId={task.taskId}
					priorityLevel={task.priorityLevel}
					doneTask={task.doneTask}
					taskTitle={task.taskTitle}
					groupName={task.groupName}
					handleDeleteTask={props.deleteTaskHandler}
					handleTaskUpdate={props.updateTaskHandler}
					prioritiesList={props.prioritiesList}
					groupsList={props.groupsList}
					addToGroupsList={props.addToGroupsList}
				/>
			)
		);
	};
	return buildTaskRows(props.tasks);
		
	
};

export default TaskRowsList;