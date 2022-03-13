import { useGroups } from "../../../stores/GroupsContext";
import { GroupRow } from "./GroupRow";

export const GroupsList = () => {
	const { groups } = useGroups();
	return (
		<>
			{groups.map((group) => (
				<GroupRow
					className="group-row"
					key={group.groupId}
					group={group}
				/>
			))}
		</>
	);
};
