import { createContext, useContext, useEffect, useState } from "react";
import {
	addGroupRequest,
	deleteGroupRequest,
	getGroupsRequest,
	updateGroupRequest,
} from "../services/group.service";
import { useAuth } from "./AuthContext";
import { useSnackbar } from "./SnackbarContext";

const initialState = [];
const otherTypeGroupItem = {
	groupId: "group-item-other",
	groupName: "Other",
};
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
	const { token } = useAuth();
	async function fetchData() {
		const res = await getGroupsRequest({ Authorization: token });
		if (res.status == 200 && res.data && res.data.groups) {
			res.data.groups.push(otherTypeGroupItem);
			setGroups(res.data.groups);
		} else {
			// AJ - TODO - Show error message
		}
	}
	useEffect(() => {
		if( token ) {
			fetchData();
		}
	}, [token]); // get after first render
	const { showSuccessSnackbar, showErrorSnackbar } = useSnackbar();
	const value = {
		groups: groups,
		getGroupName: (groupId) => {
			return (
				groups.find((group) => group.groupId == groupId)?.groupName ||
				""
			);
		},
		addGroup: async (groupObj) => {
			// AJ - TODO - EMPTY VALIDATION CHECK
			try {
				const res = await addGroupRequest(groupObj, {
					Authorization: token,
				});
				if (res.status == 200 && res.data && res.data.group) {
					setGroups((prevGroups) => [res.data.group, ...prevGroups]);
					showSuccessSnackbar(res.data.message);
				} else {
					showErrorSnackbar(res.data.error);
				}
			} catch (error) {
				showErrorSnackbar(error?.response?.data?.error);
			}
		},
		updateGroup: async (groupObj) => {
			try {
				const res = await updateGroupRequest(groupObj, {
					Authorization: token,
				});
				if (res.status == 200 && res.data && res.data.group) {
					const updatedGroup = res.data.group;
					setGroups((prevGroups) => {
						const groupIndex = prevGroups.findIndex(
							(group) => group.groupId === updatedGroup.groupId
						);
						if (groupIndex >= 0)
							prevGroups[groupIndex] = updatedGroup;
						return [...prevGroups];
					});
					showSuccessSnackbar(res.data.message);
				} else {
					showErrorSnackbar(res.data.error);
				}
			} catch (error) {
				showErrorSnackbar(error?.response?.data?.error);
			}
		},
		deleteGroup: async (groupObj) => {
			try {
				const res = await deleteGroupRequest(groupObj, {
					Authorization: token,
				});
				if (res.status == 200 && res.data && res.data.group) {
					const deletedGroup = res.data.group;
					setGroups((prevGroups) =>
						prevGroups.filter(
							(group) => group.groupId != deletedGroup.groupId
						)
					);
					showSuccessSnackbar(res.data.message);
				} else {
					showErrorSnackbar(res.data.error);
				}
			} catch (error) {
				showErrorSnackbar(error?.response?.data?.error);
			}
		},
	};
	return (
		<GroupsContext.Provider value={value}>
			{children}
		</GroupsContext.Provider>
	);
};
