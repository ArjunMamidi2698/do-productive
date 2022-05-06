import { createContext, useContext, useState } from "react";
import { signInRequest, signUpRequest } from "../services/auth.service";
import { DO_PRODUCTIVE_AUTH_TOKEN } from "../utils/constants";

const initialContext = {
	token: null,
	authFormError: null,
	setAuthFormError: (value) => undefined,
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
	const [authFormError, setAuthFormError] = useState(null);
	const addToken = (token) => {
		localStorage.setItem(DO_PRODUCTIVE_AUTH_TOKEN, token);
		setToken(token);
	};
	const removeToken = () => {
		localStorage.removeItem(DO_PRODUCTIVE_AUTH_TOKEN);
		setToken(null);
	};
	const signIn = async (params) => {
		try {
			const res = await signInRequest(params);
			console.log(res);
			if (res.status == 200 && res.data && res.data.token) {
				addToken(res.data.token);
				setAuthFormError(null);
				return true; // signinSuccess
			}
			setAuthFormError(res.data.error);
			return false;
		} catch (error) {
			setAuthFormError(error.response.data.error);
			return false;
		}
	};
	const signUp = async (params) => {
		try {
			const res = await signUpRequest(params);
			if (res.status == 200) {
				// AJ - TODO - Show success message
				setAuthFormError(null);
				return true; // signupSuccess
			}
			setAuthFormError(res.data.error);
			return false;
		} catch (error) {
			setAuthFormError(error.response.data.error);
			return false;
		}
	};
	const signOut = () => {
		removeToken();
	};
	const value = {
		token,
		authFormError,
		setAuthFormError,
		signIn,
		signUp,
		signOut,
	};
	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
};

export default AuthContext;
