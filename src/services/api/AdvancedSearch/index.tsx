import axios from 'axios';
import { BASE_URL } from '../';
import { UserLogin, AdvancedSearch, AdvancedSearchResponse, ContributionsAdvanced, HouselessAdvanced } from '../../../models';
import { ValidationException } from '../../../helpers/errors/validation'

export async function GetAdvancedSearchContributions(datas: AdvancedSearch, user: UserLogin) {
    try {
        const response = await axios.get(`${BASE_URL}useradvanced/advanced/searches/contributions`, {
            params: {
                ...datas
            },
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })

        let lstContributions: Array<ContributionsAdvanced> = []

        if (response.data) {
            lstContributions = response.data
        }
        return lstContributions
    } catch (error) {
        const value = ValidationException(error)
        Promise.reject(value)
    }
}

export async function GetAdvancedSearchAskContributions(datas: AdvancedSearch, user: UserLogin) {
    try {
        const response = await axios.get(`${BASE_URL}useradvanced/advanced/searches/askcontributions`, {
            params: {
                ...datas
            },
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })

        let lstContributions: Array<ContributionsAdvanced> = []

        if (response.data) {
            lstContributions = response.data
        }
        return lstContributions

    } catch (error) {
        const value = ValidationException(error)
        Promise.reject(value)
    }
}

export async function GetAdvancedSearchHouseless(datas: AdvancedSearch, user: UserLogin) {
    try {
        const response = await axios.get(`${BASE_URL}useradvanced/advanced/searches/houseless`, {
            params: {
                ...datas
            },
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })

        let lstHouseless: Array<HouselessAdvanced> = []

        if (response.data) {
            lstHouseless = response.data
        }
        return lstHouseless

    } catch (error) {
        const value = ValidationException(error)
        Promise.reject(value)
    }
}