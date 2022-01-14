import { Box, Checkbox } from "@mui/material";
import { useState } from "react";

import "./TaskRow.css";
import TaskRowActions from "./TaskRowActions";
import TaskRowPriority from "./TaskRowPriority";

const TaskRow = ( props ) => {
    const [ priorityLevel, setPriorityLevel ] = useState( props?.priorityLevel || "NONE" );
    const [ doneTask, setDoneTask ] = useState( props?.doneTask || false );
    const [ taskTitle, setTaskTitle ] = useState( props?.taskTitle || "" );

    // actions
    const updateTaskRow = () => {
        setDoneTask( !doneTask );
        // AJ - TODO - add strike-through animation
    };

	return (
		<Box className="task-row">
			<TaskRowPriority priorityLevel={priorityLevel}/>
            <Checkbox checked={doneTask} onChange={updateTaskRow}/>
			<div className="task-row__title">{taskTitle}</div>
            <TaskRowActions />
		</Box>
	);
};

export default TaskRow;
