import React, { useState, useEffect } from 'react';
import { SafeAreaView, View } from 'react-native';
import { Text, useTheme, Title, Subheading, Button, Divider, RadioButton, TextInput, Paragraph } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Geolocation from 'react-native-geolocation-service';
import * as Animatable from 'react-native-animatable'

import ListProduct from '../orderscreen/listproduct'
import { FormProduct } from '../../components/formproduct'
import { FormLocation } from '../../components/formlocation'

import { styles } from './styles'
import { GeolocationUI } from 'src/models/Geolocation';

const AskContributionScreen = () => {

    const paperTheme = useTheme();

    const [numberInput, setNumberInput] = useState("")
    const [descriptionInput, setDescriptionInput] = useState("")
    const [dropdownvalueproduct, setDropdownValueProduct] = useState("")
    const [lstProducts, setLstProducts] = useState<any>([]);
    const [checked, setChecked] = useState('TypeLocation');

    const [CEP, setCEP] = useState('');
    const [number, setNumber] = useState('');
    const [street, setStreet] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [geolocalization, setGeolocalization] = useState<GeolocationUI>();
    const [counterId, setCounterId] = useState<number>(0);


    const addProduct = () => {

        setLstProducts([...lstProducts,
        {
            id: counterId,
            product: dropdownvalueproduct,
            description: descriptionInput,
            number: numberInput
        }])
        setCounterId(counterId + 1)
        console.log(lstProducts)
    }

    async function GetLocation() {
        await Geolocation.getCurrentPosition(sucess => {
            console.log(JSON.stringify(sucess.timestamp))
            setGeolocalization(sucess)
        }, erro => {
            console.log(JSON.stringify(erro))
        }, { enableHighAccuracy: true, timeout: 2000 });

    }

    useEffect(() => {
        GetLocation()
    }, [])

    return (
        <SafeAreaView style={styles.safeView}>
            <ScrollView style={{ width: '100%' }} contentContainerStyle={{ display: "flex", flexGrow: 1, alignContent: "center", alignItems: "center" }}>
                <Title style={{ color: paperTheme.colors.text, marginTop: 10, marginBottom: 10, fontWeight: "bold", letterSpacing: 1.3 }}>Ask for Contribution</Title>

                {geolocalization &&
                    <>
                        <Text>latitude: {geolocalization.coords.latitude}</Text>
                        <Text>latitude: {geolocalization.coords.longitude}</Text>
                    </>
                }

                <FormProduct dropdownvalueproduct={dropdownvalueproduct} setDropdownValueProduct={setDropdownValueProduct}
                    numberInput={numberInput} setNumberInput={setNumberInput}
                    descriptionInput={descriptionInput} setDescriptionInput={setDescriptionInput}
                    addProduct={addProduct}
                />

                {<ListProduct lstProducts={lstProducts} />}


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
                        <View style={styles.itemCheckBox}>
                            <Text style={{ color: '#000000', display: "flex", flexWrap: "wrap", width: '70%' }}>Type the location</Text>
                            <RadioButton
                                value="TypeLocation"
                                status={checked === 'TypeLocation' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked('TypeLocation')}
                                color={'#000000'}
                                uncheckedColor={'#000000'}
                            />
                        </View>
                        <View style={styles.itemCheckBox}>
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
                            street={street} setStreet={setStreet}
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
                        <Button icon={() => <Icon name='paper-plane' size={20} />}
                            mode="contained" color="#76ff03"
                            style={{ width: '55%', alignSelf: "center", marginBottom: 10, marginTop: 15 }}
                            onPress={() => { }}
                        >
                            Send
                        </Button>
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

export default AskContributionScreen;