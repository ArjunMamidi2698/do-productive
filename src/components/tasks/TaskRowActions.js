import { Clear, DeleteForever, Done, Edit } from "@mui/icons-material";
import { useState } from "react";
import Confirmation from "../common/Confirmation";
import AddTask from "../header/AddTask";

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
			<AddTask
				prioritiesList={props.prioritiesList}
				groupsList={props.groupsList}
				handleUpdateTask={props.handleUpdateTask}
				addToGroupsList={props.addToGroupsList}
				isUpdate={true}
				taskObject={props.taskObject}
			/>
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
