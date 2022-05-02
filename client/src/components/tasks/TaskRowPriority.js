import "./TaskRowPriority.css";

const TaskRowPriority = ( props ) => {
	let priorityLevel = props?.priorityLevel || 4;
	if( isNaN( parseInt( priorityLevel ) ) ) {
		priorityLevel = 4;
	}
	const priorityNumbertoNameMap = {
		1: "HIGH",
		2: "MEDIUM",
		3: "LOW",
		4: "NONE"
	};
	const getPriorityName = ( priorityLevel ) => {
		if( priorityLevel <= 0 || priorityLevel >= 4 ) {
			return priorityNumbertoNameMap[ 4 ];
		}
		return priorityNumbertoNameMap[ priorityLevel ];
	};
	const classes = "task-row__priority " + getPriorityName( priorityLevel );
	return <div className={classes}></div>;
};

export default TaskRowPriority;
