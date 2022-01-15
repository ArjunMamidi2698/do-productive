import { Clear, DeleteForever, Done, Edit } from "@mui/icons-material";
import { useState } from "react";
import Confirmation from "../common/Confirmation";

import "./TaskRowActions.css";

const TaskRowActions = (props) => {
	// actions
	const editTaskHandler = () => {
		props.handleEditAction();
	};
	const cancelEditTaskHandler = () => {
		props.handleCancelEditAction();
	};
	const deleteTaskHandler = () => {
		/// browsers confirm popup
		// if (window.confirm("Action irreversible! Continue?")) {
		// 	console.log("yes");
		// } else {
		// 	console.log("no");
		// }
		// AJ - TODO - we have to remove now permanatly
		setAskConfirmation(false);
		props.handleDeleteTask();
	};
	const [askConfirmation, setAskConfirmation] = useState(false);
	return (
		<div className="task-row__actions">
			{props.editView ? (
				<div className="task-row__actions-edit-view">
					<Done
						className="edit-action"
						titleAccess="Edit Task"
						onClick={editTaskHandler}
					/>
					<Clear onClick={cancelEditTaskHandler} />
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
				onClick={() => setAskConfirmation(true)}
			/>
			{askConfirmation ? (
				<Confirmation
					title="Delete Confirmation"
					message="Action is irreversible, Are you sure?"
					open={askConfirmation}
					handleAccept={deleteTaskHandler}
					handleClose={() => setAskConfirmation(false)}
				/>
			) : (
				""
			)}
		</div>
	);
};

export default TaskRowActions;
