import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, View, Keyboard, Alert } from 'react-native';
import { Text, useTheme, Title, Subheading, Button, Divider, RadioButton, TextInput, Paragraph, Headline } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Geolocation from 'react-native-geolocation-service';
import * as Animatable from 'react-native-animatable'
import AuthContext from '../../context/auth'
import { AskContribution } from '../../services/api/AskContribution'

//CSS
import { styles } from './styles'

//Serivices/API
import translate from '../../services/translate/translate'
import { SearchCEP } from '../../services/SearchCEP';
import { SearchGeocoding } from '../../services/SearchGeocoding'

//Components
import { ButtonDrawer, MainButton, FormProduct, SnackBarYes } from '../../components'
import FormLocation from '../../components/formlocation';

//SubComponent
import ListProduct from '../orderscreen/listproduct';

//Models
import { ModelList, CEPjson, LocationModel, AskContributionModel } from '../../models';

//Mocks
import { validateFormLocation } from '../../mocks/validateFormLocation'

//validate
import { SwitchErros } from './validation'


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

    //state about notification
    const [isVisible, setIsVisible] = useState(false)
    const [text, setText] = useState("")
    const [colorbackground, setColorBackground] = useState("")
    const [textcolor, setTextColor] = useState("")
    const [subcolorButton, setSubcolorButton] = useState("")
    const [title, setTitle] = useState("")

    function clearfieldsaddress() {
        setCEP("")
        setNumber("")
        setStreet("")
        setNeighborhood("")
        setCity("")
    }

    function resetStateCard() {
        setDescriptionInput('');
        setDropdownValueProduct('');
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

                        if (response != undefined && lstProducts.length > 0) {
                            const objdata: AskContributionModel = {
                                idDocument: user?.idDocument!,
                                CEP: response.cep,
                                lat: response.lat,
                                long: response.long,
                                products: lstProducts
                            }

                            await AskContribution(user!, objdata)
                            setErrorFormLocation(false)
                            clearfieldsaddress()
                            SwitchErros(201, setText, setColorBackground, setTextColor, setSubcolorButton, setTitle, paperTheme)
                            setIsVisible(true)
                        } else {
                            SwitchErros(204, setText, setColorBackground, setTextColor, setSubcolorButton, setTitle, paperTheme)
                            setIsVisible(true)
                        }

                    } else {
                        setErrorFormLocation(true)
                        SwitchErros(204, setText, setColorBackground, setTextColor, setSubcolorButton, setTitle, paperTheme)
                        setText("error_location_address")
                        setIsVisible(true)
                    }

                    break;
                case 'AskUseGPS':
                    if (location) {

                        const pathAddress = `${location.lat}, ${location.long}`
                        const response = await SearchGeocoding(pathAddress, setMessageError, CEP);
                        console.log(lstProducts)
                        if (response != undefined && lstProducts.length > 0) {
                            const objdata: AskContributionModel = {
                                idDocument: user?.idDocument!,
                                CEP: response.cep,
                                lat: response.lat,
                                long: response.long,
                                products: lstProducts
                            }

                            await AskContribution(user!, objdata)
                            SwitchErros(201, setText, setColorBackground, setTextColor, setSubcolorButton, setTitle, paperTheme)
                            setIsVisible(true)
                        } else {
                            SwitchErros(204, setText, setColorBackground, setTextColor, setSubcolorButton, setTitle, paperTheme)
                            setIsVisible(true)
                        }

                    } else {
                        SwitchErros(204, setText, setColorBackground, setTextColor, setSubcolorButton, setTitle, paperTheme)
                        setText("error_location")
                        setIsVisible(true)
                    }
                default:
                    break;
            }
        } catch (error) {
            return Promise.reject(error)
        }

    }

    async function askcontribution() {
        try {
            setIsSend(true);
            await SendAksContribution();
            setIsSend(false);
        } catch (error) {
            setIsSend(false);
            SwitchErros(error, setText, setColorBackground, setTextColor, setSubcolorButton, setTitle, paperTheme)
        }
    }

    function onPress() {
        setIsVisible(!isVisible)
    }

    function onDismiss() {
        setIsVisible(!isVisible)
    }

    return (
        <SafeAreaView style={styles.safeView}>
            <ScrollView style={{ width: '100%' }} contentContainerStyle={{ display: "flex", flexGrow: 1, alignContent: "center", alignItems: "center" }}>
                <Headline style={{ color: paperTheme.colors.text, marginTop: 10, marginBottom: 10, fontWeight: "bold" }}>
                    {translate('Ask_for_Contribution')}
                </Headline>

                <FormProduct dropdownvalueproduct={dropdownvalueproduct} setDropdownValueProduct={setDropdownValueProduct}
                    numberInput={numberInput} setNumberInput={setNumberInput}
                    descriptionInput={descriptionInput} setDescriptionInput={setDescriptionInput}
                    addProduct={addProduct} showError={showError}
                />

                {<ListProduct lstProducts={lstProducts} removeItemList={removeItemList} />}


                <Divider style={{ backgroundColor: paperTheme.colors.accent, width: '95%', height: 1, marginTop: 15, marginBottom: 8 }} />

                <View style={styles.containerCheckpoint}>

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
                            <Text style={{ color: '#000000', display: "flex", flexWrap: "wrap", width: '70%' }}>{translate('check_use_address')}</Text>
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
                            <Text style={{ color: '#000000', display: "flex", flexWrap: "wrap", width: '70%' }}>{translate('check_use_gps')}</Text>
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
                            <Subheading style={{ color: '#e53935' }}>{translate("warning")} *</Subheading>
                            <Paragraph style={{ color: '#000000' }}>
                                {translate("message_gps")}
                            </Paragraph>
                        </Animatable.View>
                    }

                    <View style={{ width: '95%' }}>
                        <MainButton MainActionScreen={askcontribution} isSend={isSend} />
                    </View>
                </View>

            </ScrollView>
            <SnackBarYes isVisible={isVisible} onDismiss={onDismiss} onPress={onPress}
                text={text}
                style={{
                    height: 50, width: "90%",
                    backgroundColor: colorbackground, alignSelf: "center", bottom: 15,
                    display: "flex", flexWrap: "wrap", justifyContent: "center", alignContent: "center"
                }}
                textcolor={textcolor} subcolorButton={subcolorButton} title={title}
            />
        </SafeAreaView>
    )
}

export default AskContributionScreen;