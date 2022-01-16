import { Box, Checkbox, Chip, MenuItem, TextField } from "@mui/material";
import { useState } from "react";

import "./TaskRow.css";
import TaskRowActions from "./TaskRowActions";
import TaskRowPriority from "./TaskRowPriority";

const TaskRow = (props) => {
	const priorityLevel = props?.priorityLevel || 4;
	const doneTask = props?.doneTask || false;
	const taskTitle = props?.taskTitle || "";
	const prioritiesList = props.prioritiesList;

	console.log(taskTitle, props.taskTitle);
	// actions
	const updateTask = ( doneStatus ) => {
		props.handleTaskUpdate({
			taskId: props.taskId,
			taskTitle: newTitle,
			priorityLevel: newPriority,
			doneTask: doneStatus !== undefined ? doneStatus : doneTask,
			groupName: props.groupName
		});
	};
	const updateTaskRow = () => {
		// AJ - TODO - add strike-through animation
		updateTask( !doneTask );
	};
	const [editView, setEditView] = useState(false);
	const editTaskRow = () => {
		setEditView(!editView);
		if (editView) updateTask();
	};
	const cancelEditTaskRow = () => {
		setEditView(false);
		// reset
		setNewTitle(taskTitle);
		setNewPriority(priorityLevel);
	};
	const deleteTaskHandler = () => {
		props.handleDeleteTask(props.taskId);
	};
	//// new items
	const [newTitle, setNewTitle] = useState(taskTitle);
	const [newPriority, setNewPriority] = useState(priorityLevel);

	return (
		<Box className={"task-row " + (doneTask ? "done" : "")}>
			<TaskRowPriority priorityLevel={priorityLevel} />
			<Checkbox checked={doneTask} onChange={updateTaskRow} />
			{editView ? (
				<div className="task-row__edit-view">
					<TextField
						className="task-row__title"
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
							<MenuItem
								key={option}
								value={option}
								className={"priority-" + option}
							>
								{option}
							</MenuItem>
						))}
					</TextField>
				</div>
			) : (
				<div className="task-row__normal-view">
					<div className="task-row__title">{taskTitle}</div>
					{
						props.groupName.trim() !== "" ? <Chip className="task-row__group-chip" label={props.groupName} /> : ""
					}
				</div>
			)}
			<TaskRowActions
				handleEditAction={editTaskRow}
				handleCancelEditAction={cancelEditTaskRow}
				editView={editView}
				handleDeleteTask={deleteTaskHandler}
			/>
		</Box>
	);
};

export default TaskRow;
