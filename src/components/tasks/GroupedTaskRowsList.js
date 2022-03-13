import { useGroups } from "../../stores/GroupsContext";
import GroupedTaskRow from "./GroupedTaskRow";

const GroupedTaskRowsList = (props) => {
	const { groups } = useGroups();
	const getGroupedTasks = () => {
		let groupedTasks = [];
		groups.forEach(({groupName}) => {
			groupedTasks.push({
				groupName: groupName,
				tasks: props.tasks.filter(
					(task) => task.groupName === groupName
				),
			});
		});
		groupedTasks.push({
			groupName: "Non-Grouped",
			tasks: props.tasks.filter((task) => task.groupName === ""),
		});
		return groupedTasks;
	};
	return getGroupedTasks().map((group, index) => (
		<GroupedTaskRow
			key={"group-" + index}
			group={group}
			buildTaskRowsList={props.buildTaskRowsList}
		/>
	));
};

export default GroupedTaskRowsList;
