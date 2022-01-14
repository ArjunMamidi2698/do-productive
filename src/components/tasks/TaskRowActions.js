import { DeleteForever, Done, Edit } from "@mui/icons-material";

import "./TaskRowActions.css";

const TaskRowActions = (props) => {
	// actions
	const editTaskHandler = () => {
		props.onEditAction();
	};
	const deleteTaskHandler = () => {
		console.log("in delete task handler");
	};
	return (
		<div className="task-row__actions">
			{props.editView ? (
				<Done
					className="edit-action"
					titleAccess="Edit Task"
					onClick={editTaskHandler}
				/>
			) : (
				<Edit
					className="edit-action"
					titleAccess="Edit Task"
					onClick={editTaskHandler}
				/>
			)}
			<DeleteForever
				className="delete-action"
				titleAccess="Delete Task"
				onClick={deleteTaskHandler}
			/>
		</div>
	);
};

export default TaskRowActions;
