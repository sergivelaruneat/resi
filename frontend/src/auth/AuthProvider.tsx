import { useContext, createContext, useState, useEffect} from "react";

interface authProviderProps{
    children: React.ReactNode;
}

const AuthContext = createContext({
    isAuthenticated: false,
});

export function AuthProvider({children}: authProviderProps){
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    return (
        <AuthContext.Provider value={{isAuthenticated}}>
            {children}
        </AuthContext.Provider>
    )  
}

export const useAuth = () => useContext(AuthContext);