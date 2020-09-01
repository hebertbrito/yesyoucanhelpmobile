import React, { createContext } from 'react';

const AuthContext = createContext({ signed: false });

export const AuthProvider: React.FC = ({ children }) => {
    return (
        <AuthContext.Provider value={{ signed: false }}>
            {children}
        </AuthContext.Provider>
    )
}

