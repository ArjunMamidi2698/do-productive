import { Button } from "@mui/material";
import logo from "../../assets/img/logo.png";
import { useAuth } from "../../stores/AuthContext";
import AddTask from "./AddTask";

import "./Header.css";
import { HeaderMenu } from "./menu/Menu";

const Header = (props) => {
	const { token, signOut } = useAuth();
	return (
		<header className="do-productive-header">
			<img src={logo} className="do-productive__logo" alt="logo" />
			{token && (
				<div className="do-productive-header__actions">
					<AddTask />
					<HeaderMenu />
					<Button onClick={signOut} variant="contained">
						Sign Out
					</Button>
				</div>
			)}
		</header>
	);
};

export default Header;
