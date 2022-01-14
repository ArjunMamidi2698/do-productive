import { DeleteForever, Edit } from "@mui/icons-material";

import './TaskRowActions.css';

const TaskRowActions = () => {
	return (
		<div className="task-row__actions">
			<Edit className="edit-action"/>
			<DeleteForever className="delete-action" />
		</div>
	);
};

export default TaskRowActions;
