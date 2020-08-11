import axios from 'axios';

const URL = 'http://localhost:3000/'



export const LoginUser = async (email: string, password: string) => {
    try {

        const response = await axios.post(`${URL}/auth/login`,{
            headers: {'token': '123456789'},
            data: {
                email,
                password
            },
        })

        console.log(response)

    } catch (error) {
        console.log(error)
    }
}