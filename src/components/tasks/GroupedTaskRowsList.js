import GroupedTaskRow from "./GroupedTaskRow";

const GroupedTaskRowsList = (props) => {
	const getGroupedTasks = () => {
		let groupedTasks = [];
		props.groupsList.forEach((groupName) => {
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
