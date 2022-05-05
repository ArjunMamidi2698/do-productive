import { client } from "../utils/helpers";
export const signInRequest = async (params, headers) => {
	const response = await client.post(`/signin`, params);
	return response;
};

export const signUpRequest = async (params, headers) => {
	const response = await client.post(`/signup`, params);
	return response;
};

// export const addTask = async (params, headers) => {
// 	const dummyHeaders = { Authorization: "aj" };
// 	const response = await client.post(`/signup`, params, {
// 		headers: dummyHeaders,
// 	});
// 	return response;
// };
