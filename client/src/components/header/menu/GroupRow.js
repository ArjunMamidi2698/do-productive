import { useState } from "react";
import { Box, TextField } from "@mui/material";
import { Close, DeleteForever, Done, Edit } from "@mui/icons-material";
import { useGroups } from "../../../stores/GroupsContext";

import "./GroupRow.css";
import Confirmation from "../../common/Confirmation";

export const GroupRow = (props) => {
	const [editView, setEditView] = useState(false);
	const [newGroup, setNewGroup] = useState(props.group.groupName);
	const { updateGroup, deleteGroup } = useGroups();
	const editGroupHandler = () => {
		updateGroup({
			...props.group,
			groupName: newGroup,
		});
		setEditView(false);
	};
	const [askConfirmation, setAskConfirmation] = useState(false);
	return (
		<Box className="group-row">
			{editView ? (
				<TextField
					className="group-name"
					value={newGroup}
					onChange={(e) => setNewGroup(e.target.value)}
				/>
			) : (
				<TextField
					disabled={props.group.groupId === "group-item-other"}
					className="group-name"
					value={props.group.groupName}
					InputProps={{
						readOnly: true,
					}}
				/>
			)}
			<div
				className={
					"group-row-actions " +
					(props.group.groupId === "group-item-other" ? "hide" : "")
				}
			>
				{editView ? (
					<div>
						<Done color="success" onClick={editGroupHandler} />
						<Close
							color="error"
							onClick={() => setEditView(false)}
						/>
					</div>
				) : (
					<Edit color="primary" onClick={() => setEditView(true)} />
				)}
				<DeleteForever
					color="error"
					onClick={() => setAskConfirmation(true)}
				/>
				{askConfirmation ? (
					<Confirmation
						title="Delete Confirmation"
						message="Action is irreversible, Are you sure?"
						open={askConfirmation}
						handleAccept={() =>
							deleteGroup({ groupId: props.group.groupId })
						}
						handleClose={() => setAskConfirmation(false)}
					/>
				) : (
					""
				)}
			</div>
		</Box>
	);
};
