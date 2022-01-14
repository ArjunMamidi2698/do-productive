import { Add, Menu } from "@mui/icons-material";
import { Button } from "@mui/material";
import logo from "../../assets/img/logo.png";

import "./Header.css";

const Header = () => {
	return (
		<header className="do-productive-header">
			<img src={logo} className="do-productive__logo" alt="logo" />
			<div className="do-productive-header__actions">
				<Button
					variant="contained"
					startIcon={<Add />}
					className="do-productive__add-btn"
				>
					Add Task
				</Button>
				<Menu 
				// sx={{ color: "white" }}
				/>
			</div>
		</header>
	);
};

export default Header;
