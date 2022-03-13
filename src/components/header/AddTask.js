import { Add, Edit } from "@mui/icons-material";
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Grid,
	MenuItem,
	TextField,
} from "@mui/material";
import { useState } from "react";

import "./AddTask.css";

const AddTask = (props) => {
	const prioritiesList = props?.prioritiesList || [];
	let groupsList = props?.groupsList || [];
	groupsList = groupsList.filter(
		(val, index) => groupsList.indexOf(val) === index
	);
	const [open, setOpen] = useState(false);
	const [taskTitle, setTaskTitle] = useState(
		props.isUpdate ? props.taskObject?.taskTitle : ""
	);
	const [priorityLevel, setPriorityLevel] = useState(
		props.isUpdate ? props.taskObject?.priorityLevel : ""
	);
	const [groupName, setGroupName] = useState(
		props.isUpdate ? props.taskObject?.groupName : ""
	);

	const [newGroupName, setNewGroupName] = useState("");
	const [showNewGroupField, setShowNewGroupField] = useState(false);
	// form actions
	const handleAddGroup = (event) => {
		setGroupName(event.target.value);
		setShowNewGroupField(event.target.value === "Other");
	};

	// Dialog actions
	const handleClose = () => {
		setOpen(false);
	};
	const getGroupName = () => {
		let gname = "";
		if (showNewGroupField) {
			if (newGroupName.trim() !== "") gname = newGroupName.trim();
		} else {
			if (groupName.trim() !== "") gname = groupName.trim();
		}
		return gname;
	};
	const handleAddTask = () => {
		const taskObj = {
			taskId: props.isUpdate
				? props.taskObject?.taskId
				: props.generateNewTaskId(),
			taskTitle: taskTitle,
			priorityLevel: priorityLevel,
			doneTask: false,
			groupName: getGroupName(),
		};
		if (props.isUpdate) props.handleUpdateTask(taskObj);
		else props.handleAddTask(taskObj);
		if (showNewGroupField && newGroupName.trim() !== "") {
			props.addToGroupsList(newGroupName.trim());
		}
		if (!props.isUpdate) resetValues();
		setOpen(false);
	};
	const resetValues = () => {
		setTaskTitle("");
		setPriorityLevel("");
		setGroupName("");
		setNewGroupName("");
		setShowNewGroupField(false);
	};
	return (
		<div>
			{!props.isUpdate ? (
				<Button
					variant="contained"
					startIcon={<Add />}
					className="do-productive__add-btn"
					onClick={() => setOpen(true)}
				>
					Add Task
				</Button>
			) : (
				<Edit
					className="edit-action"
					titleAccess="Edit Task"
					onClick={() => setOpen(true)}
				/>
			)}

			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Add Task</DialogTitle>
				<DialogContent className="add-task-content">
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								fullWidth
								label="Task Title"
								value={taskTitle}
								onChange={(event) =>
									setTaskTitle(event.target.value)
								}
							/>
						</Grid>
						<Grid item xs={6}>
							<TextField
								fullWidth
								select
								label="Priority"
								value={priorityLevel}
								onChange={(event) =>
									setPriorityLevel(event.target.value)
								}
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
						</Grid>
						<Grid item xs={6}>
							<TextField
								fullWidth
								select
								label="Group/Goal"
								value={groupName}
								onChange={handleAddGroup}
							>
								{[...groupsList, "Other"].map((option) => (
									<MenuItem
										key={option}
										value={option}
										className={"group-" + option}
									>
										{option}
									</MenuItem>
								))}
							</TextField>
						</Grid>
						{showNewGroupField ? (
							<Grid item xs={12}>
								<TextField
									fullWidth
									label="New Group"
									value={newGroupName}
									onChange={(event) =>
										setNewGroupName(event.target.value)
									}
								/>
							</Grid>
						) : (
							""
						)}
					</Grid>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleAddTask} autoFocus>
						{props.isUpdate ? "Update" : "Add"}
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default AddTask;
