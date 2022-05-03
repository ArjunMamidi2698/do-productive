import { Box, Button, TextField } from "@mui/material";

export const AuthForm = ({ signInView, setSignInView }) => {
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
				<TextField label="Email" required variant="filled" />
				<TextField
					label="Password"
					type="password"
					required
					variant="filled"
				/>
				{signInView ? (
					""
				) : (
					<TextField label="Username" variant="filled" />
				)}
			</Box>
			<p>
				{signInView ? (
					"Forgot Password"
				) : (
					<span onClick={() => setSignInView((prev) => !prev)}>
						Already have an account
					</span>
				)}
			</p>
			<Button variant="contained" fullWidth>
				{signInView ? "Sign In" : "Sign Up"}
			</Button>
		</>
	);
};
