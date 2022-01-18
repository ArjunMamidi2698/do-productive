import { Card, FormControlLabel, Switch } from "@mui/material";
import DateRangeFilter from "./DateRangeFilter";
import SearchFilter from "./SearchFilter";

import "./TaskActions.css";

const TaskActions = (props) => {
	return (
		<Card className="task-actions-card">
			<SearchFilter />
			<DateRangeFilter />
			<div className="task-actions__switches">
				<FormControlLabel
					control={
						<Switch
							checked={props.isGroupView}
							onChange={(event) =>
								props.setGroupView(event.target.checked)
							}
						/>
					}
					label="Group View"
				/>
				<FormControlLabel
					control={
						<Switch
							checked={props.isAllView}
							onChange={(event) =>
								props.setAllView(event.target.checked)
							}
						/>
					}
					label="Show All"
				/>
			</div>
		</Card>
	);
};
export default TaskActions;
