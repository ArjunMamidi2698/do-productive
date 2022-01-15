import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";
import { useState } from "react";

const Confirmation = (props) => {
	const title = props?.title || "Confirmation";
	const message = props?.message || "Are you sure!";
	const [open, setOpen] = useState(props.open);
console.log( open);
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleAccept = () => {
		setOpen(false);
		props.handleAccept();
	};
	const handleClose = () => {
		setOpen(false);
		props.handleClose();
	};
	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">{title}</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					{message}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Cancel</Button>
				<Button onClick={handleAccept} autoFocus>
					Ok
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default Confirmation;
