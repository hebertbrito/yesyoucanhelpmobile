import React, { createContext, useState, useEffect } from 'react';
import { GetLoginUser } from '../services/api/Login'
import { UserLogin } from '../models/UserLogin';
import AsyncStorage from '@react-native-community/async-storage';
interface AutheContextData {
    signed: boolean,
    user: UserLogin | undefined;
    SignIn(email: string, password: string): any,
    SingOut(): void,
    isLoadingLogin: boolean
}

const AuthContext = createContext<AutheContextData>({} as AutheContextData);

export const AuthProvider: React.FC = ({ children }) => {

    const [user, setUser] = useState<UserLogin | undefined>(undefined);
    const [isLoadingLogin, setIsLoadingLogin] = useState<boolean>(false);


    useEffect(() => {
        async function loadStorageData() {
            const storagedataUser = await AsyncStorage.getItem('@yycanhelp:user')

            if (storagedataUser) {
                setUser(JSON.parse(storagedataUser))
            }

        }
        loadStorageData()
    }, [])

    async function SignIn(email: string, password: string) {
        setIsLoadingLogin(true);
        const response = await GetLoginUser(email, password);

        if (response.message != undefined && response.message === 'login_sucessfull') {

            setUser(response)

            await AsyncStorage.setItem('@yycanhelp:user', JSON.stringify(response))
            setIsLoadingLogin(false);
        }
        setIsLoadingLogin(false);

        return response;
    }

    async function SingOut() {
        setUser(undefined)
        await AsyncStorage.removeItem('@yycanhelp:user');
    }

    return (
        <AuthContext.Provider value={{ signed: !!user, user, SignIn, SingOut, isLoadingLogin }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;

