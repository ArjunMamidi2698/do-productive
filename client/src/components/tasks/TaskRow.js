import { Box, Checkbox, Chip, MenuItem, TextField } from "@mui/material";
import { useState } from "react";
import { useGroups } from "../../stores/GroupsContext";
import { useTasks } from "../../stores/TasksContext";

import "./TaskRow.css";
import TaskRowActions from "./TaskRowActions";
import TaskRowPriority from "./TaskRowPriority";

const TaskRow = (props) => {
	const priorityLevel = props?.task?.priorityLevel || 4;
	const doneTask = props?.task?.doneTask || false;
	const taskTitle = props?.task?.taskTitle || "";
	const { updateTask } = useTasks();
	const { getGroupName } = useGroups();
	// actions
	const updateTaskRow = () => {
		// AJ - TODO - add strike-through animation
		updateTask({
			...props.task,
			doneTask: !doneTask,
		});
	};

	return (
		<Box className={"task-row " + (doneTask ? "done" : "")}>
			<TaskRowPriority priorityLevel={priorityLevel} />
			<Checkbox checked={doneTask} onChange={updateTaskRow} />

			<div className="task-row__normal-view">
				<div className="task-row__title">{taskTitle}</div>
				{props.task?.groupId?.trim() !== "" && getGroupName(props.task.groupId) != ""? (
					<Chip
						className="task-row__group-chip"
						label={getGroupName(props.task.groupId)}
					/>
				) : (
					""
				)}
			</div>
			<TaskRowActions task={props.task} />
		</Box>
	);
};

export default TaskRow;
