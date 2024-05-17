import React, { createContext, useState, ReactNode, useMemo } from "react";
import { getTokenFromLocalStorage } from "../store/LocalStorage";

type AuthContextType = {
  isAuthenticated: boolean;
  setAuth: (auth: boolean) => void;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setAuth: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setAuth] = useState(() => {
    const { isAuthenticated: storedIsAuthenticated } =
      getTokenFromLocalStorage();
    const { token } = getTokenFromLocalStorage();
    return !!token && (!!storedIsAuthenticated as boolean);
  });
  const contextValue = useMemo(
    () => ({ isAuthenticated, setAuth }),
    [isAuthenticated],
  );
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export default AuthContext;
