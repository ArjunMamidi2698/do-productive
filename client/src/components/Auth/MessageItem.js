import { Button } from "@mui/material";

export const MessageItem = ({ signInView, setSignInView }) => {
	const switchView = () => {
		setSignInView((prev) => !prev);
	};
	return (
		<>
			<h1 className="message-item__title">
				{signInView ? "Hello Friend" : "Welcome Back"}
			</h1>
			<span className="message-item__content">
				{signInView
					? "Please register and start your journey to be productive."
					: "Your tasks are waiting for you inside, Please login to view you tasks"}
			</span>
			<Button
				variant="outlined"
				className="message-item__action"
				onClick={switchView}
			>
				{signInView ? "Sign Up" : "Sign In"}
			</Button>
		</>
	);
};
