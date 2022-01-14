import { DateRange, Search } from "@mui/icons-material";
import {
	Card,
	CardContent,
	FormControlLabel,
	InputAdornment,
	Switch,
	TextField,
} from "@mui/material";

import "./TaskActions.css";

const TaskActions = () => {
	return (
		<Card className="task-actions-card">
			<TextField
				label="search"
				variant="outlined"
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<Search />
						</InputAdornment>
					),
					endAdornment: (
						<InputAdornment position="end">
							<DateRange
								onClick={() => {
									// AJ TODO - ATTACH DATEPICKER
									console.log("DateRange clicked");
								}}
							/>
						</InputAdornment>
					),
				}}
			/>
			<div className="task-actions__switches">
				<FormControlLabel control={<Switch />} label="Group View" />
				<FormControlLabel control={<Switch />} label="Show All" />
			</div>
		</Card>
	);
};
export default TaskActions;
