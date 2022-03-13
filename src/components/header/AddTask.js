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
import { useGroups } from "../../stores/GroupsContext";
import { useTasks } from "../../stores/TasksContext";
import { generateRandomId } from "../../utils/helpers";

import "./AddTask.css";

const AddTask = (props) => {
	const { updateTask, addTask, prioritiesList } = useTasks();
	const { groups, addGroup } = useGroups();

	const [open, setOpen] = useState(false);
	const [taskTitle, setTaskTitle] = useState(
		props.isUpdate ? props.taskObject?.taskTitle : ""
	);
	const [priorityLevel, setPriorityLevel] = useState(
		props.isUpdate ? props.taskObject?.priorityLevel : ""
	);
	const [groupId, setGroupId] = useState(
		props.isUpdate ? props.taskObject?.groupId : ""
	);

	const [newGroupName, setNewGroupName] = useState("");
	const [showNewGroupField, setShowNewGroupField] = useState(false);
	// form actions
	const handleAddGroup = (event) => {
		setGroupId(event.target.value);
		setShowNewGroupField(event.target.value === "group-item-other");
	};

	// Dialog actions
	const handleClose = () => {
		setOpen(false);
	};
	let newGroupId = "";
	const getGroupId = () => {
		if (showNewGroupField) {
			if (newGroupName.trim() !== "")
				return (newGroupId = generateRandomId("group"));
		} else {
			if (groupId !== "") return groupId;
		}
		return "";
	};
	const handleAddTask = () => {
		const taskObj = {
			taskId: props.isUpdate
				? props.taskObject?.taskId
				: generateRandomId("task"),
			taskTitle: taskTitle,
			priorityLevel: priorityLevel,
			doneTask: false,
			groupId: getGroupId(),
		};
		if (props.isUpdate) updateTask(taskObj);
		else addTask(taskObj);
		if (showNewGroupField && newGroupName.trim() !== "") {
			addGroup({
				groupId: newGroupId,
				groupName: newGroupName.trim(),
			});
		}
		if (!props.isUpdate) resetValues();
		setOpen(false);
	};
	const resetValues = () => {
		setTaskTitle("");
		setPriorityLevel("");
		setGroupId(props.isUpdate ? props.taskObject?.groupId : "");
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
								value={groupId}
								onChange={handleAddGroup}
							>
								{groups.map((group) => (
									<MenuItem
										key={group.groupId}
										value={group.groupId}
										className={"group-" + group.groupName}
									>
										{group.groupName}
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
