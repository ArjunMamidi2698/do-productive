import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../../stores/AuthContext";

export const AuthForm = ({ signInView, setSignInView }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	const { signIn, signUp } = useAuth();
	const resetForm = () => {
		setEmail("");
		setPassword("");
		setUsername("");
	};
	const submitForm = () => {
		if (signInView) {
			// AJ - TODO - Validate
			signIn({ email, password });
			resetForm();
		} else {
			// AJ - TODO - Validate
			signUp({ email, password, username });
			resetForm();
			// AJ - TODO - Verify api response
			setSignInView(true);
		}
	};
	return (
		<>
			<h1>
				{signInView ? "Sign In to Do Productive" : "Create Account"}
			</h1>
			<Box
				component="form"
				sx={{
					"& > :not(style)": { m: 1, width: "25ch" },
				}}
				noValidate
				autoComplete="off"
			>
				<TextField
					label="Email"
					required
					variant="outlined"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<TextField
					label="Password"
					type="password"
					required
					variant="outlined"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				{signInView ? (
					""
				) : (
					<TextField
						label="Username"
						variant="outlined"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				)}
			</Box>
			<p
				className="other-auth-view-action"
				onClick={() => setSignInView((prev) => !prev)}
			>
				{/* AJ - TODO - implement "Forgot Password?" */}
				{signInView
					? "Don't have an account? Register here"
					: "Already have an account? Sign in here"}
			</p>

			<Button
				variant="contained"
				fullWidth
				className="formitem__action"
				onClick={submitForm}
			>
				{signInView ? "Sign In" : "Sign Up"}
			</Button>
		</>
	);
};
