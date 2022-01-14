import { Clear, DeleteForever, Done, Edit } from "@mui/icons-material";

import "./TaskRowActions.css";

const TaskRowActions = (props) => {
	// actions
	const editTaskHandler = () => {
		props.onEditAction();
	};
	const cancelEditTaskHandler = () => {
		props.onCancelEditAction();
	};
	const deleteTaskHandler = () => {
		console.log("in delete task handler");
	};
	return (
		<div className="task-row__actions">
			{props.editView ? (
				<div className="task-row__actions-edit-view">
					<Done
						className="edit-action"
						titleAccess="Edit Task"
						onClick={editTaskHandler}
					/>
					<Clear onClick={cancelEditTaskHandler}/>
				</div>
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
