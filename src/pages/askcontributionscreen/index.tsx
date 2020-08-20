import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, TextInput } from 'react-native';
import { Text, useTheme, Title, Subheading, Button, Divider, RadioButton, TextInput as PaperTextInput, Paragraph } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { Picker } from '@react-native-community/picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Geolocation from 'react-native-geolocation-service';
import * as Animatable from 'react-native-animatable'

//dataOrderMenu
import { itemsDropdown } from '../../data/dataOrderscreen'

import ListProduct from '../orderscreen/listproduct'


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

    const AddProductInTheList = () => {

        setLstProducts([...lstProducts,
        {
            id: Math.floor(Math.random() * 10) + 1,
            product: dropdownvalueproduct,
            description: descriptionInput,
            number: numberInput
        }])
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

                <View style={styles.containerCard}>
                    <View style={styles.card}>
                        <View style={styles.titleCard}>
                            <Subheading style={styles.titleText}>Item Product</Subheading>
                        </View>
                        <View style={styles.bodyCard_1}>
                            <Picker mode="dropdown" style={{ width: '50%', color: paperTheme.colors.text }}
                                selectedValue={dropdownvalueproduct}
                                onValueChange={(itemvalue, itemindex) => setDropdownValueProduct(itemvalue.toString())}
                            >
                                {itemsDropdown.length > 0 && (
                                    itemsDropdown.map((item) => {
                                        return (
                                            <Picker.Item key={item.id} label={item.name} value={item.name} />
                                        )
                                    })
                                )}
                            </Picker>
                            <TextInput

                                defaultValue=""
                                value={numberInput}
                                onChangeText={text => setNumberInput(text)}
                                placeholder="number"
                                keyboardType="number-pad"
                                maxLength={3}
                                underlineColorAndroid={paperTheme.colors.text}
                                placeholderTextColor={paperTheme.colors.text}
                                style={{ width: '50%', color: paperTheme.colors.text }}

                            />
                        </View>
                        <View style={{ padding: 5 }}>
                            <TextInput
                                value={descriptionInput}
                                onChangeText={(text) => setDescriptionInput(text.toString())}
                                multiline={true}
                                numberOfLines={4}
                                maxLength={150}
                                autoCompleteType="off"
                                placeholder="Description"
                                underlineColorAndroid={paperTheme.colors.text}
                                placeholderTextColor={paperTheme.colors.text}
                                style={{ color: paperTheme.colors.text, width: '99%' }}
                            />
                        </View>
                    </View>
                </View>
                <Button color={'#fafafa'} style={styles.button_produt_add}
                    onPress={() => AddProductInTheList()}
                >+ Product</Button>

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

                    {checked === "TypeLocation" &&
                        <View style={{ width: '95%', marginTop: 10 }}>
                            <PaperTextInput
                                value={CEP}
                                onChangeText={text => setCEP(text)}
                                placeholder="Ex: 00000000"
                                keyboardAppearance="light"
                                keyboardType="numeric"
                                style={{ margin: 10, color: `${paperTheme.colors.text}`, width: '35%' }}
                                focusable={false}
                                mode="flat"
                                label="CEP*"
                                underlineColor={paperTheme.colors.text}
                                placeholderTextColor={paperTheme.colors.text}
                                selectionColor={paperTheme.colors.text}
                                theme={{ colors: { primary: '#fdd835', placeholder: paperTheme.colors.text } }}
                            />
                            <PaperTextInput
                                value={number}
                                onChangeText={text => setNumber(text)}
                                placeholder="Number"
                                keyboardAppearance="light"
                                keyboardType="numeric"
                                style={{ margin: 10, color: `${paperTheme.colors.text}`, width: '30%' }}
                                focusable={false}
                                mode="flat"
                                label="Number *"
                                underlineColor={paperTheme.colors.text}
                                placeholderTextColor={paperTheme.colors.text}
                                selectionColor={paperTheme.colors.text}
                                theme={{ colors: { primary: '#fdd835', placeholder: paperTheme.colors.text } }}
                            />
                            <PaperTextInput
                                value={street}
                                onChangeText={text => setStreet(text)}
                                placeholder="Ex: Rua exemplo dois"
                                keyboardAppearance="light"
                                keyboardType="email-address"
                                style={{ margin: 10, color: `${paperTheme.colors.text}`, width: '60%' }}
                                focusable={false}
                                mode="flat"
                                label="Street *"
                                underlineColor={paperTheme.colors.text}
                                placeholderTextColor={paperTheme.colors.text}
                                selectionColor={paperTheme.colors.text}
                                theme={{ colors: { primary: '#fdd835', placeholder: paperTheme.colors.text } }}
                            />
                            <PaperTextInput
                                value={neighborhood}
                                onChangeText={text => setNeighborhood(text)}
                                placeholder="Neighborhood"
                                keyboardAppearance="light"
                                keyboardType="email-address"
                                style={{ margin: 10, color: `${paperTheme.colors.text}`, width: '50%' }}
                                focusable={false}
                                mode="flat"
                                label="Neighborhood *"
                                underlineColor={paperTheme.colors.text}
                                placeholderTextColor={paperTheme.colors.text}
                                selectionColor={paperTheme.colors.text}
                                theme={{ colors: { primary: '#fdd835', placeholder: paperTheme.colors.text } }}
                            />
                        </View>
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