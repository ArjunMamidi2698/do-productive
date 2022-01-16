import { Menu } from "@mui/icons-material";
import logo from "../../assets/img/logo.png";
import AddTask from "./AddTask";

import "./Header.css";

const Header = (props) => {
	return (
		<header className="do-productive-header">
			<img src={logo} className="do-productive__logo" alt="logo" />
			<div className="do-productive-header__actions">
				<AddTask
					prioritiesList={props.prioritiesList}
					groupsList={props.groupsList}
					generateNewTaskId={props.generateNewTaskId}
					handleAddTask={props.handleAddTask}
				/>
					
				{/* handleAddTask={(taskObject) => props.handleAddTask({...taskObject}) } */}
				<Menu
				// sx={{ color: "white" }}
				/>
			</div>
		</header>
	);
};

export default Header;
