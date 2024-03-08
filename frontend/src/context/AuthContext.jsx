import { createContext, useState, useContext, useEffect, useRef } from "react";
import { registerRequest, loginRequest, verifyTokenRequest, logoutRequest, forgotPasswordRequest, resetPasswordRequest, verifyEmailRequest, checkEmailRequest, getProfileRequest, getUserRoleRequest } from "../api/auth";
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
    const [existEmail, setExistEmail] = useState(false);
	const [userRole, setUserRole] = useState(null);
    const [profile, setProfile] = useState([]);
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [errors, setErrors] = useState([]);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	// const [isResetTokenValid, setIsResetTokenValid] = useState(false);
	const [isResetTokenSent, setIsResetTokenSent] = useState(false);
	const userToken = useRef(null);
	const [isEmailVerified, setIsEmailVerified] = useState(false);

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
			setIsEmailVerified(true)
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

    const getExistEmail = async (email) => {
		try {
			const response = await checkEmailRequest(email);
			setExistEmail(!response.data.userExists);
		} catch (error) {
			if (Array.isArray(error.response.data)) {
				setErrors(error.response.data);
			} else {
				setErrors([error.response.data]);
			}
		}
	};

	const getProfile = async () => {
		try {
			const response = await getProfileRequest();
			setProfile(response.data);
		} catch (error) {
			if (Array.isArray(error.response.data)) {
				setErrors(error.response.data);
			} else {
				setErrors([error.response.data]);
			}
		}
	};

	const getUserRole = async () => {
		try {
			const response = await getUserRoleRequest();
			setUserRole(response.data.role);
		} catch (error) {
			if (Array.isArray(error.response.data)) {
				setErrors(error.response.data);
			} else {
				setErrors([error.response.data]);
			}
		}
	};

	const forgotPassword = async (email) => {
		try {
			await forgotPasswordRequest(email);
			console.log("Email enviado");
			// Por que?
			// Si es valido o no lo determina el backend no yo
			// setIsResetTokenValid(true);
			// Me habia confundido con el valido, se trata de saber si esta enviado
			setIsResetTokenSent(true);
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
			// setIsResetTokenValid(false);
			setIsResetTokenSent(false);
			// TODO Ver como autentico
			// setIsAuthenticated(true);
		} catch (error) {
			if (Array.isArray(error.response.data)) {
				setErrors(error.response.data);
			} else {
				setErrors([error.response.data]);
			}
		}
	};

	const verifyEmail = async (token) => {
		try {
			await verifyEmailRequest(token);
			setIsEmailVerified(true);
		} catch (error) {
			console.log(error);
			setIsEmailVerified(false);
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
                userRole,
				register,
				login,
				logout,
				forgotPassword,
				resetPassword,
				verifyEmail,
                existEmail,
                getExistEmail,
                profile,
                getProfile,
                getUserRole,
				loading,
				errors,
				isAuthenticated,
				isResetTokenSent,
				isEmailVerified,
				userToken: userToken.current,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
