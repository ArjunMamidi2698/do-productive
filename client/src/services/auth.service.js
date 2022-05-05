import { client } from "../utils/helpers";
export const signInRequest = async (params, headers) => {
	const response = await client.post(`/signin`, params);
	return response;
};

export const signUpRequest = async (params, headers) => {
	const response = await client.post(`/signup`, params);
	return response;
};
