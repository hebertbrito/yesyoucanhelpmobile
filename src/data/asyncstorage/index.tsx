import AsyncStorage from '@react-native-community/async-storage';

const idDarkTheme = 'idDarkTheme';

export const storeData = async (value: string) => {

    const objDarkTheme = {
        darthemevalue: value
    }

    try {
        await AsyncStorage.setItem(idDarkTheme, JSON.stringify(objDarkTheme))
    } catch (e) {
        // saving error
    }
}


export const ChangeDataDarkTheme = async (value: string) => {

    const objDarkTheme = {
        darthemevalue: value
    }

    try {

        let retornoGet = await AsyncStorage.getItem(idDarkTheme)

        if (retornoGet == null) {

            await AsyncStorage.mergeItem(idDarkTheme, JSON.stringify(objDarkTheme))

        } else {
            await AsyncStorage.setItem(idDarkTheme, JSON.stringify(objDarkTheme))
        }


    } catch (e) {
        console.log(e)
    }
}




