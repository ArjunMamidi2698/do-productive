import {
	MenuItem,
	Menu,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import { useState } from "react";
import { GroupsList } from "./GroupsList";
export const HeaderMenu = () => {
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const [dialogOpen, setDialogOpen] = useState(false);
	const handleDialogClose = () => {
		setDialogOpen(false);
	};
	const showGroups = () => {
		setDialogOpen(true);
		handleClose();
	};
	return (
		<>
			{/* For now only side button */}
			{/* <MenuIcon onClick={handleClick} />
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					"aria-labelledby": "basic-button",
				}}
			>
				<MenuItem onClick={handleClose}>Priotities</MenuItem>
				<MenuItem onClick={showGroups}>Groups</MenuItem>
			</Menu> */}
			<Button variant="contained" onClick={showGroups}>
				Groups
			</Button>
			<Dialog open={dialogOpen} onClose={handleDialogClose}>
				<DialogTitle>Groups List</DialogTitle>
				<DialogContent>
					<GroupsList />
				</DialogContent>
				<DialogActions>
					<Button onClick={handleDialogClose}>Close</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};
