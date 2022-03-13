import { createContext, useContext, useState } from "react";
import { generateRandomId } from "../utils/helpers";

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
	}
];
const initialContext = {
	groups: [],
	addGroup: (newGroup) => undefined,
	updateGroup: (groupObj) => undefined,
	deleteGroup: (groupObj) => undefined,
};
export const GroupsContext = createContext(initialContext);
export const useGroups = () => useContext(GroupsContext);
const formatGroup = (groupName) => {
	return {
		groupId: generateRandomId("group"),
		groupName,
	};
};
export const GroupsProvider = ({ children }) => {
	const [groups, setGroups] = useState(initialState);
	const value = {
		groups: groups,
		addGroup: (newGroup) => {
			setGroups((prevGroups) => [formatGroup(newGroup), ...prevGroups]);
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
