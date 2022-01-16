import { Add } from "@mui/icons-material";
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
	groupsList.push("Other");
	groupsList = groupsList.filter(
		(val, index) => groupsList.indexOf(val) === index
	);
	const [open, setOpen] = useState(false);
	const [taskTitle, setTaskTitle] = useState("");
	const [priorityLevel, setPriorityLevel] = useState("");
	const [groupName, setGroupName] = useState("");

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
			taskId: props.generateNewTaskId(),
			taskTitle: taskTitle,
			priorityLevel: priorityLevel,
			doneTask: false,
			groupName: getGroupName(),
		};
		props.handleAddTask(taskObj);
		resetValues();
		setOpen(false);
	};
	const resetValues = () => {
		setTaskTitle("");
		setPriorityLevel("");
		setGroupName("");
	};
	return (
		<div>
			<Button
				variant="contained"
				startIcon={<Add />}
				className="do-productive__add-btn"
				onClick={() => setOpen(true)}
			>
				Add Task
			</Button>
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
								{groupsList.map((option) => (
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
						Add
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default AddTask;
