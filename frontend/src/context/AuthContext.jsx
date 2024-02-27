import { createContext, useState, useContext, useEffect, useRef } from "react";
import { registerRequest, loginRequest, verifyTokenRequest, logoutRequest, forgotPasswordRequest, resetPasswordRequest } from "../api/auth";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [errors, setErrors] = useState([]);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isResetTokenValid, setIsResetTokenValid] = useState(false);
	const userToken = useRef(null);

	const register = async (user) => {
		try {
			const response = await registerRequest(user);
			setUser(response.data);
			setIsAuthenticated(true);
		} catch (error) {
			if (Array.isArray(error.response.data)) {
				setErrors(error.response.data);
			} else {
				setErrors([error.response.data]);
			}
		}
	};

	const login = async (user) => {
		try {
			const response = await loginRequest(user);
			setUser(response.data);
			setIsAuthenticated(true);
		} catch (error) {
			if (Array.isArray(error.response.data)) {
				setErrors(error.response.data);
			} else {
				setErrors([error.response.data]);
			}
		}
	};

	const logout = async () => {
		try {
			await logoutRequest();
			setUser(null);
			setIsAuthenticated(false);
			Cookies.remove("token");
			userToken.current = null;
		} catch (error) {
			console.log(error);
		}
	};

	const forgotPassword = async (email) => {
		try {
			await forgotPasswordRequest(email);
			setIsResetTokenValid(true);
		} catch (error) {
			if (Array.isArray(error.response.data)) {
				setErrors(error.response.data);
			} else {
				setErrors([error.response.data]);
			}
		}
	};

	const resetPassword = async (data) => {
		try {
			await resetPasswordRequest(data);
			setIsResetTokenValid(false);
		} catch (error) {
			if (Array.isArray(error.response.data)) {
				setErrors(error.response.data);
			} else {
				setErrors([error.response.data]);
			}
		}
	};

	// Para que desaparezcan los errores
	useEffect(() => {
		if (errors.length > 0) {
			const timer = setTimeout(() => {
				setErrors([]);
			}, 5000);
			return () => clearTimeout(timer);
		}
	}, [errors]);

	useEffect(() => {
		async function checkLogin() {
			const cookies = Cookies.get();
			if (!cookies.token) {
				setLoading(false);
				setIsAuthenticated(false);
				return setUser(null);
			}

			try {
				const response = await verifyTokenRequest(cookies.token);

				if (!response.data) {
					setLoading(false);
					setIsAuthenticated(false);
					return setUser(null);
				}

				setUser(response.data);
				setIsAuthenticated(true);
				setLoading(false);
			} catch (error) {
				console.log(error);
				Cookies.remove("token");
				setLoading(false);
				setIsAuthenticated(false);
				return setUser(null);
			}
		}
		checkLogin();
	}, []);

	useEffect(() => {
		if (isAuthenticated) {
			const cookies = Cookies.get();
			userToken.current = cookies.token;
		}
	}, [isAuthenticated]);

	return (
		<AuthContext.Provider
			value={{
				user,
				register,
				login,
				logout,
				forgotPassword,
				resetPassword,
				loading,
				errors,
				isAuthenticated,
				isResetTokenValid,
				userToken: userToken.current,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
