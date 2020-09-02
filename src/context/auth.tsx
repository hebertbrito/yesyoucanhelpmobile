import React, { createContext } from 'react';

interface AutheContextData {
    signed: boolean,
    token: string,
    user: object;
}

const AuthContext = createContext<AutheContextData>({} as AutheContextData);

export const AuthProvider: React.FC = ({ children }) => {
    return (
        <AuthContext.Provider value={{ signed: false, token: "", user: {} }}>
            {children}
        </AuthContext.Provider>
    )
}

