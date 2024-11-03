import React, { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/auth.service";
import toast from "react-hot-toast";
import { UserToken, LoginCredentials, User } from "../types";
import { getHttpErrorMessage } from "../constants";

interface AuthContextType {
  userToken: UserToken;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: (showToast: boolean) => void;
  register: (data: User) => Promise<void>;
  isAuth: boolean;
  sessionExpired: boolean;
  setSessionExpired: (expired: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userToken, setUserToken] = useState<UserToken>({ token: null });
  const [loading, setLoading] = useState(true);
  const [sessionExpired, setSessionExpired] = useState(false); // Nuevo estado
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const isValid = await authService.validateToken();
        setIsAuth(isValid);
        if (isValid) {
          setUserToken({ token });
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      setLoading(true);
      const userToken = await authService.login(credentials);
      setUserToken(userToken);
      setSessionExpired(false);
      setIsAuth(true);
      toast.success("Inicio de sesión exitoso");
    } catch (error) {
      if (error instanceof Error) {
        const message = getHttpErrorMessage(error.message);
        toast.error(`Error al iniciar sesión: ${message}`);
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = (showToast = true) => {
    setLoading(true);
    authService.logout();
    setUserToken({ token: null });
    setIsAuth(false);
    setLoading(false);
    if (showToast) {
      toast.success("Cierre de sesión exitoso");
    }
  };

  const register = async (data: User) => {
    try {
      setLoading(true);
      await authService.register(data);
      toast.success("Registro exitoso");
    } catch (error) {
      if (error instanceof Error) {
        const message = getHttpErrorMessage(error.message);
        toast.error(`Error al registrar: ${message}`);
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        userToken,
        loading,
        login,
        logout,
        isAuth,
        sessionExpired,
        setSessionExpired,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
