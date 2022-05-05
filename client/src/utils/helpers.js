import axios from "axios";

const baseURL =
	process.env.NODE_ENV !== "production" ? `http://localhost:2022` : "";
export const client = axios.create({
	baseURL,
});

export const generateRandomId = (prefix) => {
	return prefix + "-" + Date.now() + Math.random();
};
