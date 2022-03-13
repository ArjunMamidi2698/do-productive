import logo from "../../assets/img/logo.png";
import AddTask from "./AddTask";

import "./Header.css";
import { HeaderMenu } from "./menu/Menu";

const Header = (props) => {
	return (
		<header className="do-productive-header">
			<img src={logo} className="do-productive__logo" alt="logo" />
			<div className="do-productive-header__actions">
				<AddTask />
				<HeaderMenu />
			</div>
		</header>
	);
};

export default Header;
