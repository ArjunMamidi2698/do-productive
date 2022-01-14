import { Box, Checkbox, MenuItem, TextField } from "@mui/material";
import { useState } from "react";

import "./TaskRow.css";
import TaskRowActions from "./TaskRowActions";
import TaskRowPriority from "./TaskRowPriority";

const TaskRow = (props) => {
	const [priorityLevel, setPriorityLevel] = useState(
		props?.priorityLevel || 4
	);
	const [doneTask, setDoneTask] = useState(props?.doneTask || false);
	const [taskTitle, setTaskTitle] = useState(props?.taskTitle || "");
	const prioritiesList = [1, 2, 3, 4];

	// actions
	const updateTaskRow = () => {
		setDoneTask(!doneTask);
		// AJ - TODO - add strike-through animation
	};
	const [editView, setEditView] = useState(false);
	const editTaskRow = () => {
		setEditView(!editView);
		if (editView) {
			setTaskTitle(newTitle);
			setPriorityLevel(newPriority);
		}
	};
	//// new items
	const [newTitle, setNewTitle] = useState(taskTitle);
	const [newPriority, setNewPriority] = useState(priorityLevel);

	return (
		<Box className="task-row">
			<TaskRowPriority priorityLevel={priorityLevel} />
			<Checkbox checked={doneTask} onChange={updateTaskRow} />
			{editView ? (
				<div className="task-row__edit-view">
					<TextField
						className="task-row__title"
						defaultValue={taskTitle}
						value={newTitle}
						onChange={(event) => setNewTitle(event.target.value)}
					/>
					<TextField
						className="task-row__priority"
						select
						defaultValue={priorityLevel}
						value={newPriority}
						onChange={(event) => setNewPriority(event.target.value)}
					>
						{prioritiesList.map((option) => (
							<MenuItem key={option} value={option} className={"priority-" + option}>
								{option}
							</MenuItem>
						))}
					</TextField>
				</div>
			) : (
				<div className="task-row__title">{taskTitle}</div>
			)}
			<TaskRowActions onEditAction={editTaskRow} editView={editView} />
		</Box>
	);
};

export default TaskRow;
