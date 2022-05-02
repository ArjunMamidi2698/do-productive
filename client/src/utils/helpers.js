export const generateRandomId = (prefix) => {
	return prefix + "-" + Date.now() + Math.random();
};
