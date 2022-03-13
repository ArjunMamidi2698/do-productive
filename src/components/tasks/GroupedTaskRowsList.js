import { useGroups } from "../../stores/GroupsContext";
import GroupedTaskRow from "./GroupedTaskRow";

const GroupedTaskRowsList = (props) => {
	const { groups, getGroupName } = useGroups();

	const getGroupedTasks = () => {
		let groupedTasks = [];
		groups.forEach(({ groupId, groupName }) => {
			if (groupId != "group-item-other") {
				groupedTasks.push({
					groupName: groupName,
					tasks: props.tasks.filter(
						(task) => task.groupId === groupId
					),
				});
			}
		});
		groupedTasks.push({
			groupName: "Non-Grouped",
			tasks: props.tasks.filter(
				(task) =>
					task.groupId === "" || getGroupName(task.groupId) === ""
			),
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
