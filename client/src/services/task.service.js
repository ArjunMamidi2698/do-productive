import { client } from "../utils/helpers";
export const addTaskRequest = async (params, headers) => {
	const response = await client.post(`/addTask`, params, { headers });
	return response;
};

export const updateTaskRequest = async (params, headers) => {
	const response = await client.put(`/updateTask`, params, { headers });
	return response;
};

export const deleteTaskRequest = async (params, headers) => {
	const response = await client.post(`/deleteTask`, params, { headers });
	return response;
};

export const getTasksRequest = async (headers) => {
	const response = await client.get(`/getTasks`, { headers });
	return response;
};
