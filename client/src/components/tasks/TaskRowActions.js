import { DeleteForever } from "@mui/icons-material";
import { useState } from "react";
import { useTasks } from "../../stores/TasksContext";
import Confirmation from "../common/Confirmation";
import AddTask from "../header/AddTask";

import "./TaskRowActions.css";

const TaskRowActions = (props) => {
	const { deleteTask } = useTasks();

	const deleteTaskHandler = () => {
		setAskConfirmation(false);
		deleteTask({ taskId: props.task.taskId });
	};
	const [askConfirmation, setAskConfirmation] = useState(false);
	return (
		<div className="task-row__actions">
			<AddTask
				isUpdate={true}
				taskObject={props.task}
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
