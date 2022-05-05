import { createContext, useContext, useState } from "react";
import { signInRequest, signUpRequest } from "../services/auth.service";
import { DO_PRODUCTIVE_AUTH_TOKEN } from "../utils/constants";

const initialContext = {
	token: null,
	signIn: (params) => undefined,
	signUp: (params) => undefined,
	signOut: (params) => undefined,
};
const AuthContext = createContext(initialContext);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
	const [token, setToken] = useState(
		localStorage.getItem(DO_PRODUCTIVE_AUTH_TOKEN)
	);
	const addToken = (token) => {
		localStorage.setItem(DO_PRODUCTIVE_AUTH_TOKEN, token);
		setToken(token);
	};
	const removeToken = () => {
		localStorage.removeItem(DO_PRODUCTIVE_AUTH_TOKEN);
		setToken(null);
	};
	const signIn = async (params) => {
		const res = await signInRequest(params);
		if (res.status == 200 && res.data && res.data.token) {
			addToken(res.data.token);
		} else {
			// AJ - TODO - Show error message
		}
	};
	const signUp = async (params) => {
		const res = await signUpRequest(params);
		if (res.status == 200 && res.data && res.data.token) {
			// AJ - TODO - Show success message
		} else {
			// AJ - TODO - Show error message
		}
	};
	const signOut = () => {
		removeToken();
	};
	const value = {
		token,
		signIn,
		signUp,
		signOut,
	};
	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
};

export default AuthContext;
