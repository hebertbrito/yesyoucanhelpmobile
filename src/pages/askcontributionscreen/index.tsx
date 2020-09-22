import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, View, Keyboard, Alert } from 'react-native';
import { Text, useTheme, Title, Subheading, Button, Divider, RadioButton, TextInput, Paragraph, Headline } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Geolocation from 'react-native-geolocation-service';
import * as Animatable from 'react-native-animatable'
import AuthContext from '../../context/auth'
import { AskContribution } from '../../services/api/AskContribution'

import { styles } from './styles'

import { SearchCEP } from '../../services/SearchCEP';
import { SearchGeocoding } from '../../services/SearchGeocoding'

import ListProduct from '../orderscreen/listproduct';
import { FormProduct } from '../../components/formproduct';
import FormLocation from '../../components/formlocation';
import { MainButton } from '../../components/buttons'

import { GeolocationUI } from 'src/models/Geolocation';
import { ModelList } from '../../models/ModelList';
import { CEPjson } from '../../models/CEPjson';
import { LocationModel } from '../../models/Location';
import { AskContributionModel } from '../../models/AskContributionModel'

import { validateFormLocation } from '../../mocks/validateFormLocation'


const AskContributionScreen = () => {

    const paperTheme = useTheme();
    const { user } = useContext(AuthContext);

    const [numberInput, setNumberInput] = useState("")
    const [descriptionInput, setDescriptionInput] = useState("")
    const [dropdownvalueproduct, setDropdownValueProduct] = useState("Clothes")
    const [lstProducts, setLstProducts] = useState<Array<ModelList>>([] as Array<ModelList>);
    const [checked, setChecked] = useState('TypeLocation');
    const [CEP, setCEP] = useState("");
    const [number, setNumber] = useState("");
    const [street, setStreet] = useState("");
    const [neighborhood, setNeighborhood] = useState<string>('');
    const [counterId, setCounterId] = useState<number>(0);
    const [showError, setShowError] = useState<boolean>(false);
    const [cepJSON, setCEPJSON] = useState<CEPjson | undefined>({} as CEPjson);
    const [city, setCity] = useState("");
    const [messageError, setMessageError] = useState("");
    const [location, setLocation] = useState({} as LocationModel)
    const [errorFormLocation, setErrorFormLocation] = useState<boolean>(false)
    const [IdWatch, setIdWatch] = useState<number>(0)
    const [isSend, setIsSend] = useState<boolean>(false);

    function resetStateCard() {
        setDescriptionInput('');
        setDropdownValueProduct('Clothes');
        setNumberInput('');
    }

    const addProduct = () => {

        if (dropdownvalueproduct.length != 0 && numberInput.length != 0 && descriptionInput.length > 5) {

            setLstProducts([...lstProducts,
            {
                id: counterId,
                product: dropdownvalueproduct,
                description: descriptionInput,
                number: numberInput
            }])
            setCounterId(counterId + 1)

            resetStateCard();
            setShowError(false);
        } else {
            setShowError(true)
        }
    }

    function GetLocation() {
        const idWatch = Geolocation.watchPosition((sucess) => {
            if (sucess) {
                setLocation({ lat: sucess.coords.latitude, long: sucess.coords.longitude, message: 'complete' });
            }
        }, (error) => {
            setMessageError(error.message)
        }, { enableHighAccuracy: true, distanceFilter: 1, interval: 2000 });

        setIdWatch(idWatch)
    }

    useEffect(() => {
        if (checked == 'AskUseGPS') {
            GetLocation();

            if (errorFormLocation)
                setErrorFormLocation(false)

        } else {
            setMessageError("");
        }

    }, [checked])

    useEffect(() => {
        if (messageError != "")
            Alert.alert(messageError)

    }, [messageError])

    function removeItemList(id: number) {
        lstProducts.forEach(item => {
            if (item.id == id) {
                lstProducts.splice(lstProducts.indexOf(item), 1)
            }
        });
        setLstProducts([...lstProducts])

        console.log(lstProducts)
    }

    //#region find lat and long by CEP

    useEffect(() => {

        async function executeSearchCEP() {
            try {
                if (CEP.length == 8) {
                    const response = await SearchCEP(CEP);
                    if (response) {
                        setCEPJSON(response);
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }

        executeSearchCEP();

    }, [CEP])

    //#endregion

    //#region set address finded by cep

    useEffect(() => {

        if (cepJSON) {
            Keyboard.dismiss()
            setStreet(cepJSON.logradouro!)
            setCity(cepJSON.localidade!);
            setNeighborhood(cepJSON.bairro!);

        }

    }, [cepJSON])

    //#endregion

    async function SendAksContribution() {

        try {
            switch (checked) {
                case 'TypeLocation':

                    if (validateFormLocation(number, neighborhood, street, setErrorFormLocation)) {

                        const pathAddress = `${street}, ${number}, ${city}`

                        const response = await SearchGeocoding(pathAddress, setMessageError, CEP);

                        if (response != undefined && response != null && lstProducts.length > 0) {
                            const objdata: AskContributionModel = {
                                idDocument: user?.idDocument!,
                                CEP: response.cep,
                                lat: response.lat,
                                long: response.long,
                                products: lstProducts
                            }

                            await AskContribution(user, objdata)
                        } else {
                            setMessageError('Dados Insuficientes para pedir contribuição')

                        }

                    } else {
                        setMessageError('Dados Insuficientes para pedir contribuição')
                    }

                    break;
                case 'AskUseGPS':
                    if (location) {

                        const pathAddress = `${location.lat}, ${location.long}`
                        const response = await SearchGeocoding(pathAddress, setMessageError, CEP);

                        if (response != undefined && response != null && lstProducts.length > 0) {
                            const objdata: AskContributionModel = {
                                idDocument: user?.idDocument!,
                                CEP: response.cep,
                                lat: response.lat,
                                long: response.long,
                                products: lstProducts
                            }

                            await AskContribution(user, objdata)
                        } else {
                            setMessageError('Dados Insuficientes para pedir contribuição')
                        }

                    } else {
                        setMessageError('Dados Insuficientes para pedir contribuição')
                    }
                default:
                    break;
            }
        } catch (error) {
            setMessageError(error.message)
        }

    }

    async function askcontribution() {
        try {
            setIsSend(true);
            await SendAksContribution();
            setIsSend(false);

        } catch (error) {
            console.log(error)
            setMessageError(error.message)
            setIsSend(false);
        }
    }


    return (
        <SafeAreaView style={styles.safeView}>
            <ScrollView style={{ width: '100%' }} contentContainerStyle={{ display: "flex", flexGrow: 1, alignContent: "center", alignItems: "center" }}>
                <Headline style={{ color: paperTheme.colors.text, marginTop: 10, marginBottom: 10, fontWeight: "bold" }}>Ask for Contribution</Headline>

                <FormProduct dropdownvalueproduct={dropdownvalueproduct} setDropdownValueProduct={setDropdownValueProduct}
                    numberInput={numberInput} setNumberInput={setNumberInput}
                    descriptionInput={descriptionInput} setDescriptionInput={setDescriptionInput}
                    addProduct={addProduct} showError={showError}
                />

                {<ListProduct lstProducts={lstProducts} removeItemList={removeItemList} />}


                <Divider style={{ backgroundColor: paperTheme.colors.accent, width: '95%', height: 1, marginTop: 15, marginBottom: 8 }} />

                <View style={styles.containerCheckpoint}>
                    <Subheading style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        color: paperTheme.colors.text,
                        padding: 5
                    }}
                    >
                        Inform Location</Subheading>
                    <View style={styles.viewCardCheckBox}>
                        <View style={{
                            paddingLeft: "2.5%",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            alignContent: "center",
                            backgroundColor: paperTheme.colors.onSurface,
                            justifyContent: "center",
                            borderRadius: 10,
                            width: '45%',
                            elevation: 2
                        }}>
                            <Text style={{ color: '#000000', display: "flex", flexWrap: "wrap", width: '70%' }}>Type the location</Text>
                            <RadioButton
                                value="TypeLocation"
                                status={checked === 'TypeLocation' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked('TypeLocation')}
                                color={'#000000'}
                                uncheckedColor={'#000000'}
                            />
                        </View>
                        <View style={{
                            paddingLeft: "2.5%",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            alignContent: "center",
                            backgroundColor: paperTheme.colors.onSurface,
                            justifyContent: "center",
                            borderRadius: 10,
                            width: '45%',
                            elevation: 2
                        }}>
                            <Text style={{ color: '#000000', display: "flex", flexWrap: "wrap", width: '70%' }}>Use GPS</Text>
                            <RadioButton
                                value="AskUseGPS"
                                status={checked === 'AskUseGPS' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked('AskUseGPS')}
                                color={'#000000'}
                                uncheckedColor={'#000000'}
                            />
                        </View>
                    </View>

                    {checked === "TypeLocation" ?
                        <FormLocation CEP={CEP} setCEP={setCEP}
                            number={number} setNumber={setNumber}
                            neighborhood={neighborhood} setNeighborhood={setNeighborhood}
                            street={street} setStreet={setStreet} city={city} setCity={setCity}
                            errorFormLocation={errorFormLocation}
                        />
                        :
                        null
                    }
                    {checked === "AskUseGPS" &&
                        <Animatable.View style={styles.informationAnimatable} animation="fadeIn" easing="ease-in-out" delay={200}>
                            <Subheading style={{ color: '#e53935' }}>Warning *</Subheading>
                            <Paragraph style={{ color: '#000000' }}>
                                For the best possible use, check if there is an internet connection and if the GPS is turned on, check the app's permissions in the system tools.
                        </Paragraph>
                        </Animatable.View>
                    }

                    <View style={{ width: '95%' }}>
                        <MainButton MainActionScreen={askcontribution} isSend={isSend} />
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

export default AskContributionScreen;