import { Card, CardContent, CardHeader } from "@mui/material";
import { useTasks } from "../../stores/TasksContext";
import GroupedTaskRowsList from "./GroupedTaskRowsList";
import TaskRowsList from "./TaskRowsList";

import "./TasksContainer.css";

const TasksContainer = (props) => {
	const { tasks } = useTasks();
	const buildTaskRowsList = (tasks) => {
		return (
			<TaskRowsList
				tasks={tasks}
				isAllView={props.isAllView}
			/>
		);
	};

	return (
		<Card className="tasks-container">
			<CardHeader title="Tasks To-DO" />
			<CardContent className="tasks-container__content">
				{props.isGroupView ? (
					<GroupedTaskRowsList
						tasks={tasks}
						buildTaskRowsList={buildTaskRowsList}
					/>
				) : (
					buildTaskRowsList(tasks)
				)}
			</CardContent>
		</Card>
	);
};

export default TasksContainer;
