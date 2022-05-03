import { Card, CardContent, Container, Grid } from "@mui/material";
import { useState } from "react";
import Header from "../header/Header";
import "./Auth.css";
import { AuthForm } from "./AuthForm";
import { MessageItem } from "./MessageItem";
export const Auth = () => {
	const [signInView, setSignInView] = useState(false);
	return (
		<>
			<Header />
			<Container>
				<Card
					className={`auth-card  ${signInView ? "sign-in-view" : ""}`}
				>
					<CardContent>
						<Grid container>
							<Grid item xs={6} className="message-item">
								<MessageItem
									signInView={signInView}
									setSignInView={setSignInView}
								/>
							</Grid>
							<Grid item xs={6} className="form-item">
								<AuthForm
									signInView={signInView}
									setSignInView={setSignInView}
								/>
							</Grid>
						</Grid>
					</CardContent>
				</Card>
			</Container>
		</>
	);
};
