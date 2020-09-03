import React, { createContext, useState } from 'react';
import { GetLoginUser } from '../services/api/Login'
import { UserLogin } from '../models/UserLogin'
import { defaultTo, fromPairs } from 'lodash';

interface AutheContextData {
    signed: boolean,
    user: UserLogin | undefined;
    SignIn(): any,
    SingOut(): void
}

const AuthContext = createContext<AutheContextData>({} as AutheContextData);

export const AuthProvider: React.FC = ({ children }) => {

    const [user, setUser] = useState<UserLogin | undefined>(undefined)

    async function SignIn() {
        const response = await GetLoginUser();

        setUser(response)

        return response;
    }

    function SingOut() {
        setUser(undefined)
    }

    return (
        <AuthContext.Provider value={{ signed: !!user, user, SignIn, SingOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;

