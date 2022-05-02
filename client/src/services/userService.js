import { client } from "../utils/helpers";
export const signIn = async (params) => {
	const response = await client.post(`/signin`, params);
	return response;
};
