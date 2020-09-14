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
import { SearchCEPByLatLong } from '../../services/SearchCEPByLatLong'

import ListProduct from '../orderscreen/listproduct';
import { FormProduct } from '../../components/formproduct';
import { FormLocation } from '../../components/formlocation';
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
    const [dropdownvalueproduct, setDropdownValueProduct] = useState("")
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
    const [location, setLocation] = useState<LocationModel | undefined>({} as LocationModel)
    const [errorFormLocation, setErrorFormLocation] = useState<boolean>(false)

    const addProduct = () => {

        setLstProducts([...lstProducts,
        {
            id: counterId,
            product: dropdownvalueproduct,
            description: descriptionInput,
            number: numberInput
        }])
        setCounterId(counterId + 1)
    }

    function GetLocation() {
        Geolocation.getCurrentPosition(sucess => {
            console.log(JSON.stringify(sucess.timestamp))
            setLocation({ lat: sucess.coords.latitude, long: sucess.coords.longitude, message: 'complete' });
        }, erro => {
            console.log(JSON.stringify(erro))
            setMessageError(erro.message)
        }, { enableHighAccuracy: true, timeout: 2000 });

    }

    useEffect(() => {
        if (checked == 'AskUseGPS') {
            GetLocation()

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

    async function searchLatLongByAddress(pathAddress: string) {
        try {

            // const pathAddress = `${street}, ${number}, ${city}`
            const response = await SearchGeocoding(pathAddress);
            console.log('**** apos buscar a location com o endereço')
            console.log(response)
            if (response) {
                if (response.message == 'Complete') {


                    setLocation({ lat: response.lat, long: response.long, message: 'sucesso' })
                    console.log(location)
                } else {
                    setMessageError(response.message)
                }
            }

        } catch (error) {
            setMessageError(error.message)
        }
    }



    function validationData() {

        switch (checked) {
            case 'TypeLocation':
                ;
                // console.log(!errorFormLocation)
                if (validateFormLocation(CEP, number, neighborhood, street, setErrorFormLocation)) {

                    const pathAddress = `${street}, ${number}, ${city}`

                    searchLatLongByAddress(pathAddress);

                    const response = SearchCEPByLatLong(`${location!.lat!}, ${location!.long!}`)

                    setLocation({ lat: location?.lat!, long: location?.long!, message: location?.message!, cep: response })
                }

                break;
            case 'AskUseGPS':
                if (location) {
                    const response = SearchCEPByLatLong(`${location?.lat!}, ${location?.long!}`)

                    setLocation({ lat: location?.lat!, long: location?.long!, message: location?.message!, cep: response })
                }
            default:
                break;
        }

    }

    async function askcontribution() {
        try {
            validationData();

            if (lstProducts.length != 0 && location != null && location != undefined && errorFormLocation) {

                const dataRequest: AskContributionModel = {
                    idDocument: user?.idDocument!,
                    lat: location.lat,
                    long: location.long,
                    products: lstProducts
                }

                const response = await AskContribution(user, dataRequest)
                console.log(response)
            }


        } catch (error) {
            console.log(error)
            setMessageError(error.message)

        }
    }


    return (
        <SafeAreaView style={styles.safeView}>
            <ScrollView style={{ width: '100%' }} contentContainerStyle={{ display: "flex", flexGrow: 1, alignContent: "center", alignItems: "center" }}>
                <Headline style={{ color: paperTheme.colors.text, marginTop: 10, marginBottom: 10, fontWeight: "bold" }}>Ask for Contribution</Headline>

                {location &&
                    <>
                        <Text>latitude: {location.lat}</Text>
                        <Text>latitude: {location.long}</Text>
                    </>
                }

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
                        <MainButton MainActionScreen={askcontribution} />
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

export default AskContributionScreen;