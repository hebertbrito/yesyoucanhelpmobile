import React, { useEffect, useState, useContext } from 'react';
import { SafeAreaView, View, ScrollView, Alert, Keyboard } from 'react-native';
import { useTheme, Text, Title, TextInput, RadioButton, Button, Paragraph, Subheading, Headline, Divider } from 'react-native-paper'
import Geolocation from 'react-native-geolocation-service';
import * as Animatable from 'react-native-animatable'
import ImagePicker, { ImagePickerResponse } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';

//ContextApplication
import AuthContext from '../../context/auth'

//compoenents
import FormLocation from '../../components/formlocation'
import { MainButton } from '../../components'

//Models
import { LocationModel, CEPjson, HouseLessModel } from '../../models';

//Mocks
import { validateFormLocation } from '../../mocks/validateFormLocation'

//Services
import { SearchCEP } from '../../services/SearchCEP';
import { SearchGeocoding } from '../../services/SearchGeocoding'
import { SendInformHouseless } from '../../services/api/InformHouseless'

//CSS
import styles from './styles'

const HouseLessScreen = () => {
    const { user } = useContext(AuthContext);
    const paperTheme = useTheme()

    const options = {
        title: 'Select Avatar',
        storageOptions: {
            skipBackup: true,
            path: "images",
        },
    };

    const [photo, setPhoto] = useState<ImagePickerResponse>();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [CEP, setCEP] = useState('');
    const [number, setNumber] = useState('');
    const [street, setStreet] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [checked, setChecked] = useState('GPS');
    const [city, setCity] = useState("");
    const [cepJSON, setCEPJSON] = useState<CEPjson | undefined>({} as CEPjson);
    const [location, setLocation] = useState({} as LocationModel);
    const [messageError, setMessageError] = useState("");
    const [IdWatch, setIdWatch] = useState<number>(0);
    const [errorFormLocation, setErrorFormLocation] = useState<boolean>(false);
    const [isSend, setIsSend] = useState<boolean>(false);



    //#region Get and Clear GEOLOCATION

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

    function StopSearchGeolocation() {
        Geolocation.clearWatch(IdWatch)
    }

    //#endregion

    //#region GetLocation

    useEffect(() => {
        GetLocation()
    }, [])

    //#endregion

    const getImage = () => {
        ImagePicker.launchImageLibrary(options, (response) => {

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                // const source = { uri: response.uri };

                setPhoto(response);
            }
        });
    }

    //#region Watch MessageError

    useEffect(() => {
        if (messageError != "")
            Alert.alert(messageError)

    }, [messageError])

    //#endregion

    //#region Verify type send data

    useEffect(() => {

        if (checked == 'GPS') {
            GetLocation();

            if (errorFormLocation)
                setErrorFormLocation(false)

        } else {
            setMessageError("");
            StopSearchGeolocation()
        }

    }, [checked])

    //#endregion

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

    //#region VERIFY TYPE SEND MAIN ACTION

    async function SendAksContribution() {

        try {
            switch (checked) {
                case 'AddAddress':

                    if (validateFormLocation(number, neighborhood, street, setErrorFormLocation)) {

                        const pathAddress = `${street}, ${number}, ${city}`

                        const response = await SearchGeocoding(pathAddress, setMessageError, CEP);

                        if (response != undefined && response != null
                            && photo != null && photo != undefined
                            && name && description
                        ) {
                            const objdata: HouseLessModel = {
                                idDocument: user?.idDocument!,
                                CEP: response.cep,
                                lat: response.lat,
                                long: response.long,
                                name: name,
                                description: description
                            }

                            // await AskContribution(user, objdata)
                            await SendInformHouseless(objdata, user);

                        } else {
                            setMessageError('Dados Insuficientes para pedir contribuição')

                        }

                    } else {
                        setMessageError('Dados Insuficientes para pedir contribuição')
                    }

                    break;
                case 'GPS':
                    if (location) {

                        const pathAddress = `${location.lat}, ${location.long}`
                        const response = await SearchGeocoding(pathAddress, setMessageError, CEP);

                        if (response != undefined && response != null && photo != null && photo != undefined
                            && name && description
                        ) {

                            console.log('dentro do if para construir o objeto')

                            const objdata: HouseLessModel = {
                                idDocument: user?.idDocument!,
                                CEP: response.cep,
                                lat: response.lat,
                                long: response.long,
                                name,
                                description
                            }

                            // await AskContribution(user, objdata)
                            await SendInformHouseless(objdata, user);

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

    //#endregion

    async function teste() {
        try {
            setIsSend(true);
            await SendAksContribution();
            setIsSend(false);

        } catch (error) {
            console.log(error)
            setIsSend(false);
        }
    }

    return (
        <SafeAreaView style={styles.safeView}>
            <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.contentContainerStyle}>
                <View style={styles.viewTitle}>
                    <Headline>Inform Houseless</Headline>
                </View>
                <View style={{ width: '95%' }}>
                    <TextInput
                        value={name}
                        onChangeText={text => setName(text)}
                        placeholder="Name"
                        keyboardAppearance="light"
                        keyboardType="email-address"
                        style={{ margin: 10, color: `${paperTheme.colors.text}`, width: '60%' }}
                        focusable={false}
                        mode="outlined"
                        label="Name"
                        underlineColor={paperTheme.colors.text}
                        placeholderTextColor={paperTheme.colors.text}
                        selectionColor={paperTheme.colors.text}
                        theme={{ colors: { placeholder: paperTheme.colors.text, text: paperTheme.colors.text } }}
                    />
                    <TextInput
                        value={description}
                        onChangeText={text => setDescription(text)}
                        placeholder="Description *"
                        keyboardAppearance="light"
                        keyboardType="email-address"
                        style={{ margin: 10, color: `${paperTheme.colors.text}`, width: '78%' }}
                        focusable={false}
                        multiline={true}
                        numberOfLines={4}
                        mode="outlined"
                        label="Description *"
                        underlineColor={paperTheme.colors.text}
                        placeholderTextColor={paperTheme.colors.text}
                        selectionColor={paperTheme.colors.text}
                        theme={{ colors: { placeholder: paperTheme.colors.text, text: paperTheme.colors.text } }}
                    />
                </View>

                <Divider style={{ backgroundColor: paperTheme.colors.accent, width: '90%', height: 1, marginTop: 15, marginBottom: 8 }} />

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
                        <Text style={{ color: '#000000' }}>Inform Address</Text>
                        <RadioButton
                            value="AddAddress"
                            status={checked === 'AddAddress' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('AddAddress')}
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
                        <Text style={{ color: '#000000' }}>To Use GPS</Text>
                        <RadioButton
                            value="GPS"
                            status={checked === 'GPS' ? 'checked' : 'unchecked'}
                            onPress={() => setChecked('GPS')}
                            color={'#000000'}
                            uncheckedColor={'#000000'}
                        />
                    </View>
                </View>

                {checked === "AddAddress" ?
                    <FormLocation CEP={CEP} setCEP={setCEP}
                        neighborhood={neighborhood} setNeighborhood={setNeighborhood}
                        number={number} setNumber={setNumber}
                        street={street} setStreet={setStreet}
                        city={city} setCity={setCity}
                        errorFormLocation={errorFormLocation}
                    />
                    :
                    null
                }
                {checked === "GPS" ?
                    <Animatable.View style={styles.informationAnimatable} animation="fadeIn" easing="ease-in-out" delay={200}>
                        <Subheading style={{ color: '#e53935' }}>Warning *</Subheading>
                        <Paragraph style={{ color: '#000000' }}>
                            For the best possible use, check if there is an internet connection and if the GPS is turned on, check the app's permissions in the system tools.
                        </Paragraph>
                    </Animatable.View>
                    :
                    null
                }
                <View style={{ width: "95%", display: "flex", flexDirection: "column" }}>
                    {photo &&
                        <Animatable.Image source={{ uri: photo.uri }} style={styles.ImageAnimatable} animation="bounceIn"
                            easing="ease-in-out" delay={200} resizeMode="cover" useNativeDriver={true} resizeMethod="scale"
                        />
                    }
                    <View style={styles.containerButton}>
                        <Button icon={() => <Icon name="camera-retro" size={20} color={paperTheme.colors.surface} />}
                            mode="outlined" style={{ width: '40%', borderWidth: 1, borderColor: paperTheme.colors.surface }}
                            theme={{ colors: { primary: paperTheme.colors.surface } }}
                            onPress={() => getImage()}
                        >
                            Chose Image
                        </Button>
                        {photo &&
                            <Button icon={() => <Icon name="trash-alt" size={20} color={paperTheme.colors.notification} />}
                                mode="outlined"
                                style={{ width: '40%', borderWidth: 1, borderColor: paperTheme.colors.notification }}
                                onPress={() => setPhoto(undefined)}
                                color={paperTheme.colors.notification}
                            >
                                Delete Image
                            </Button>
                        }
                    </View>
                    <MainButton MainActionScreen={teste} isSend={isSend} />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default HouseLessScreen;
