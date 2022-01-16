// AJ - TODO 
import {
	Grid,
	MenuItem,
	TextField,
} from "@mui/material";
import { useState } from "react";
const AddTaskContent = (props) => {
	const [showNewGroupField, setShowNewGroupField] = useState(false);

	const handleAddGroup = (event) => {
		props.setGroupName(event.target.value);
		setShowNewGroupField(event.target.value === "Other");
	};
	// <AddTaskContent 
	// 					taskTitle={taskTitle}
	// 					setTaskTitle={setTaskTitle}
	// 					priorityLevel={priorityLevel}
	// 					setPriorityLevel={setPriorityLevel}
	// 					groupName={groupName}
	// 					setGroupName={setGroupName}
	// 					newGroupName={newGroupName}
	// 					setNewGroupName={setNewGroupName}
	// 					showNewGroupField={showNewGroupField}
	// 					setShowNewGroupField={setShowNewGroupField}
	// 				/>
	return (
		
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<TextField
					fullWidth
					label="Task Title"
					value={props.taskTitle}
					onChange={(event) => props.setTaskTitle(event.target.value)}
				/>
			</Grid>
			<Grid item xs={6}>
				<TextField
					fullWidth
					select
					label="Priority"
					value={props.priorityLevel}
					onChange={(event) => props.setPriorityLevel(event.target.value)}
				>
					{props.prioritiesList.map((option) => (
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
					value={props.groupName}
					onChange={handleAddGroup}
				>
					{props.groupsList.map((option) => (
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
						value={props.newGroupName}
						onChange={(event) =>
							props.setNewGroupName(event.target.value)
						}
					/>
				</Grid>
			) : (
				""
			)}
		</Grid>
	);
};

export default AddTaskContent;
