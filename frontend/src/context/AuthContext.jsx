import { createContext, useState, useContext, useEffect } from 'react';
import { registerRequest, loginRequest, verifyTokenRequest, logoutRequest } from '../api/auth';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

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
    }

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
    }

    const logout = async () => {
        try {
            await logoutRequest();
            setUser(null);
            setIsAuthenticated(false);
            Cookies.remove('token');
        } catch (error) {
            console.log(error);
        }
    }

    // const verifyToken = async () => {
    //     try {
    //         const response = await verifyTokenRequest();
    //         setUser(response.data);
    //         setIsAuthenticated(true);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

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
                Cookies.remove('token');
                setLoading(false);
                setIsAuthenticated(false);
                return setUser(null);
            }
        }
        checkLogin();
    }, []);

    return (
        <AuthContext.Provider value={{ user, register, login, logout, loading, errors, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    )
}