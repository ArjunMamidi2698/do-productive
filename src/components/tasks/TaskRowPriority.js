import "./TaskRowPriority.css";

const TaskRowPriority = (props) => {
	const classes = "task-row__priority " + (props?.priorityLevel || "NONE");
	return <div className={classes}></div>;
};

export default TaskRowPriority;
