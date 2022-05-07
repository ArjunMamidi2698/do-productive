import React, { createContext, useContext, useState } from "react";
import { Alert, IconButton, Slide, Snackbar } from "@mui/material";
import { Close } from "@mui/icons-material";

const initialContext = {
	showSuccessSnackbar: (message) => undefined,
	showErrorSnackbar: (message) => undefined,
	showWarningSnackbar: (message) => undefined,
	showInfoSnackbar: (message) => undefined,
};
const SnackbarContext = createContext(initialContext);

export const useSnackbar = () => useContext(SnackbarContext);

export const SnackbarProvider = ({ children }) => {
	const [snackbarOptions, setSnackbarOptions] = useState({ open: false }); // for now only open
	const [snackMessage, setSnackMessage] = useState("");
	const [snackbarType, setSnackbarType] = useState("info");
	const [snackKey, setSnackKey] = useState(Date.now());
	const updateStateWithOptions = (message, type) => {
		setSnackbarType(type);
		setSnackbarOptions((prev) => {
			return {
				...prev,
				open: true,
			};
		});
		setSnackMessage(message);
		setSnackKey( Date.now() );
	};
	const showSuccessSnackbar = (message) => {
		updateStateWithOptions(message, "success");
	};
	const showErrorSnackbar = (message) => {
		updateStateWithOptions(message, "error");
	};
	const showWarningSnackbar = (message) => {
		updateStateWithOptions(message, "warning");
	};
	const showInfoSnackbar = (message) => {
		updateStateWithOptions(message, "info");
	};
	const value = {
		showSuccessSnackbar,
		showErrorSnackbar,
		showWarningSnackbar,
		showInfoSnackbar,
	};
	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setSnackKey(undefined);
		setSnackMessage(undefined);
		setSnackbarOptions((prev) => {
			return {
				...prev,
				open: false,
			};
		});
	};
	return (
		<SnackbarContext.Provider value={value}>
			{children}
			<Snackbar
				key={snackKey}
				anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
				autoHideDuration={6000}
				onClose={handleClose}
				TransitionComponent={(props) => (
					<Slide {...props} direction="left" />
				)}
				action={
					<React.Fragment>
						<IconButton
							size="small"
							aria-label="close"
							color="inherit"
							onClick={handleClose}
						>
							<Close fontSize="small" />
						</IconButton>
					</React.Fragment>
				}
				{...snackbarOptions}
			>
				<Alert
					severity={snackbarType}
					onClose={handleClose}
					variant="filled"
				>
					{snackMessage}
				</Alert>
			</Snackbar>
		</SnackbarContext.Provider>
	);
};
export default SnackbarContext;
