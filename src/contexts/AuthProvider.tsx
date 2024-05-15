import { createContext } from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  setAuth: (auth: boolean) => void;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setAuth: () => {},
});

/* export function AuthProvider({ children }: { children: JSX.Element }) {
  const [isAuthenticated, setAuth] = useState<boolean>(false);
  return (
    <AuthContext.Provider value={{isAuthenticated, setAuth}}>
      {children}
    </AuthContext.Provider>
  );
} */

export default AuthContext;
