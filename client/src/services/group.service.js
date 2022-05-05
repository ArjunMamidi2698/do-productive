import { client } from "../utils/helpers";
export const addGroupRequest = async (params, headers) => {
	const response = await client.post(`/addGroup`, params, { headers });
	return response;
};

export const updateGroupRequest = async (params, headers) => {
	const response = await client.put(`/updateGroup`, params, { headers });
	return response;
};

export const deleteGroupRequest = async (params, headers) => {
	const response = await client.post(`/deleteGroup`, params, { headers });
	return response;
};

export const getGroupsRequest = async (headers) => {
	const response = await client.get(`/getGroups`, { headers });
	return response;
};
