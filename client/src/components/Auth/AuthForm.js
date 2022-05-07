import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuth } from "../../stores/AuthContext";
import { useSnackbar } from "../../stores/SnackbarContext";

export const AuthForm = ({ signInView, setSignInView }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	const { signIn, signUp } = useAuth();
	const { showErrorSnackbar } = useSnackbar();
	const resetForm = () => {
		setEmail("");
		setPassword("");
		setUsername("");
	};
	const submitForm = async () => {
		if (!validateForm()) return;
		if (signInView) {
			const signinSuccess = await signIn({ email, password });
			if (signinSuccess) resetForm();
		} else {
			const signupSuccess = await signUp({ email, password, username });
			if (signupSuccess) {
				resetForm();
				setSignInView(true);
			}
		}
	};
	const switchView = () => {
		setSignInView((prev) => !prev);
	};
	const validateEmail = (email) => {
		var re = /\S+@\S+\.\S+/;
		return re.test(email);
	};
	const validatePassword = (password) => {
		var strongRegex = new RegExp(
			"^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
		);
		return strongRegex.test(password);
	};
	const validateForm = () => {
		for (let index = 0; index < inputFields.length; index++) {
			const element = inputFields[index];
			if (element.validator) {
				if (!element.validator(element.value)) {
					showErrorSnackbar(
						"Invalid Form, Please fill all required fields with valid input"
					);
					return false;
				}
			}
		}
		return true;
	};
	const inputFields = [
		{
			id: "email-input",
			label: "Email",
			type: "email",
			required: true,
			variant: "outlined",
			value: email,
			onChangeHandler: setEmail,
			enable: true,
			error: !!email && !validateEmail(email),
			helperText:
				!!email && !validateEmail(email)
					? "This is not a valid email"
					: "",
			validator: validateEmail,
		},
		{
			id: "password-input",
			label: "Password",
			type: "password",
			required: true,
			variant: "outlined",
			value: password,
			onChangeHandler: setPassword,
			enable: true,
			error: !!password && !validatePassword(password),
			helperText:
				!!password && !validatePassword(password)
					? "Strong password requires atleast 1 number, 1 uppercase, 1 lowercase, 1 special character and min 8 characters"
					: "",
			validator: validatePassword,
		},
		{
			id: "username-input",
			label: "Username",
			type: "text",
			required: false,
			variant: "outlined",
			value: username,
			onChangeHandler: setUsername,
			enable: !signInView,
		},
	];
	useEffect(() => {
		resetForm();
	}, [signInView]);
	return (
		<Box className="form-item__box">
			<h1>
				{signInView ? "Sign In to Do Productive" : "Create Account"}
			</h1>
			<Box
				component="form"
				sx={{
					"& > :not(style)": { m: 1, width: "25ch" },
				}}
				className="form-item__fieldset"
				noValidate
				autoComplete="off"
			>
				{inputFields.map(
					(field) =>
						field.enable && (
							<TextField
								key={field.id}
								label={field.label}
								type={field.type}
								required={field.required}
								variant={field.variant}
								value={field.value}
								onChange={(e) =>
									field.onChangeHandler(e.target.value)
								}
								error={field.error}
								helperText={field.helperText}
							/>
						)
				)}
			</Box>
			<p className="other-auth-view-action" onClick={switchView}>
				{/* AJ - TODO - implement "Forgot Password?" */}
				{signInView
					? "Don't have an account? Register here"
					: "Already have an account? Sign in here"}
			</p>
			<div style={{ flexGrow: 1 }}></div>
			<Button
				variant="contained"
				fullWidth
				className="formitem__action"
				onClick={submitForm}
			>
				{signInView ? "Sign In" : "Sign Up"}
			</Button>
		</Box>
	);
};
