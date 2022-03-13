import { createContext, useContext, useState } from "react";

const initialState = [
	{
		groupId: "g1",
		groupName: "TODO APP",
	},
	{
		groupId: "g2",
		groupName: "EXPENSE APP",
	},
	{
		groupId: "group-item-other",
		groupName: "Other",
	},
];
const initialContext = {
	groups: [],
	getGroupName: (groupId) => undefined,
	addGroup: (groupObj) => undefined,
	updateGroup: (groupObj) => undefined,
	deleteGroup: (groupObj) => undefined,
};
export const GroupsContext = createContext(initialContext);
export const useGroups = () => useContext(GroupsContext);
export const GroupsProvider = ({ children }) => {
	const [groups, setGroups] = useState(initialState);
	const value = {
		groups: groups,
		getGroupName: (groupId) => {
			return groups.find((group) => group.groupId == groupId)?.groupName || "";
		},
		addGroup: (groupObj) => {
			// AJ - TODO - EMPTY VALIDATION CHECK
			setGroups((prevGroups) => [groupObj, ...prevGroups]);
		},
		updateGroup: (groupObj) => {
			setGroups((prevGroups) => {
				const groupIndex = prevGroups.findIndex(
					(group) => group.groupId === groupObj.groupId
				);
				if (groupIndex >= 0) prevGroups[groupIndex] = groupObj;
				return [...prevGroups];
			});
		},
		deleteGroup: (groupObj) => {
			setGroups((prevGroups) =>
				prevGroups.filter((group) => group.groupId != groupObj.groupId)
			);
		},
	};
	return (
		<GroupsContext.Provider value={value}>
			{children}
		</GroupsContext.Provider>
	);
};
