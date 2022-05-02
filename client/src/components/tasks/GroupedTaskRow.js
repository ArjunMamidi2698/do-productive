import {
	KeyboardArrowDown,
	KeyboardArrowUp,
} from "@mui/icons-material";
import { Card, CardContent, CardHeader } from "@mui/material";
import { useState } from "react";

const GroupedTaskRow = (props) => {
	const [expanded, setExpanded] = useState(true);
	return (
		<Card className="tasks-container__content__group-container">
			<CardHeader
				title={props.group.groupName}
				action={expanded ? <KeyboardArrowUp onClick={() => setExpanded(!expanded)}/> : <KeyboardArrowDown onClick={() => setExpanded(!expanded)}/>}
			/>
			<CardContent sx={{display:!expanded ? "none" : "unset"}}>
				{props.buildTaskRowsList(props.group.tasks)}
			</CardContent>
		</Card>
	);
};

export default GroupedTaskRow;
