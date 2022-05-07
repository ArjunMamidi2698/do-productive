import { createContext, useContext, useState } from "react";
import { signInRequest, signUpRequest } from "../services/auth.service";
import { DO_PRODUCTIVE_AUTH_TOKEN } from "../utils/constants";
import { useSnackbar } from "./SnackbarContext";

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
	const { showSuccessSnackbar, showErrorSnackbar } = useSnackbar();
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
				return true; // signinSuccess
			}
			showErrorSnackbar(res.data.error);
			return false;
		} catch (error) {
			showErrorSnackbar(error?.response?.data?.error);
			return false;
		}
	};
	const signUp = async (params) => {
		try {
			const res = await signUpRequest(params);
			if (res.status == 200) {
				showSuccessSnackbar(res.data.message);
				return true; // signupSuccess
			}
			showErrorSnackbar(res.data.error);
			return false;
		} catch (error) {
			showErrorSnackbar(error?.response?.data?.error);
			return false;
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
