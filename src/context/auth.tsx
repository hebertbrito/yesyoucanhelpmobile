import React, { createContext, useState, useEffect } from 'react';
import { GetLoginUser } from '../services/api/Login'
import { GetUserTORefresh } from '../services/api/GetProfile'
import { UserLogin } from '../models/UserLogin';
import AsyncStorage from '@react-native-async-storage/async-storage';
interface AutheContextData {
    signed: boolean,
    user: UserLogin | undefined;
    SignIn(email: string, password: string): any,
    SingOut(): void,
    isLoading: boolean,
    UpdateStorageUser_User(): Promise<void>
}

const AuthContext = createContext<AutheContextData>({} as AutheContextData);

export const AuthProvider: React.FC = ({ children }) => {

    const [user, setUser] = useState<UserLogin | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function loadStorageData() {
            const storagedataUser = await AsyncStorage.getItem('@yycanhelp:user')

            if (storagedataUser) {
                setUser(JSON.parse(storagedataUser))
            }

        }
        loadStorageData()
    }, [])

    async function UpdateStorageUser_User() {
        try {
            //getUser especifico para trazer novos dados
            const teste = await GetUserTORefresh(user!)

            //setar o user state
            if (teste) {
                setUser(teste)
                //atualizar o asyncstorage do usuario atual
                await AsyncStorage.mergeItem("@yycanhelp:user", JSON.stringify(teste))

            }


        } catch (error) {
            console.log(error)
        }
    }

    async function SignIn(email: string, password: string) {
        try {
            setIsLoading(true)
            const response = await GetLoginUser(email, password);

            if (response) {
                setUser(response)

                await AsyncStorage.setItem('@yycanhelp:user', JSON.stringify(response))
                setIsLoading(false)
            }
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            return Promise.reject(error)
        }
    }

    async function SingOut() {
        setUser(undefined)
        await AsyncStorage.removeItem('@yycanhelp:user');
    }

    return (
        <AuthContext.Provider value={{ signed: !!user, user, SignIn, SingOut, isLoading: isLoading, UpdateStorageUser_User: UpdateStorageUser_User }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;

