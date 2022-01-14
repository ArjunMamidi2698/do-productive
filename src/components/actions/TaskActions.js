import {
	Card,
	FormControlLabel,
	Switch,
} from "@mui/material";
import DateRangeFilter from "./DateRangeFilter";
import SearchFilter from "./SearchFilter";

import "./TaskActions.css";

const TaskActions = () => {
	return (
		<Card className="task-actions-card">
			<SearchFilter />
			<DateRangeFilter />
			<div className="task-actions__switches">
				<FormControlLabel control={<Switch />} label="Group View" />
				<FormControlLabel control={<Switch />} label="Show All" />
			</div>
		</Card>
	);
};
export default TaskActions;
