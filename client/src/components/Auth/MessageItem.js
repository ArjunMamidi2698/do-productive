import { Button } from "@mui/material";

export const MessageItem = ({ signInView, setSignInView }) => {
	return (
		<>
			<h1 className="message-item__title">
				{signInView ? "Hello Friend" : "Welcome Back"}
            </h1>
			<span className="message-item__content">
				{signInView ? "Please register and start your journey to be productive." : "Please login to view you tasks"}
			</span>
			<Button
				variant="contained"
				className="message-item__action"
				onClick={() => setSignInView((prev) => !prev)}
			>
				{signInView ? "Sign Up" : "Sign In"}
			</Button>
		</>
	);
};
