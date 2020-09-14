import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, ScrollView } from 'react-native';
import { useTheme, Text, Title, TextInput, RadioButton, Button, Paragraph, Subheading, Headline, Divider } from 'react-native-paper'
import Geolocation from 'react-native-geolocation-service';
import * as Animatable from 'react-native-animatable'
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { FormLocation } from '../../components/formlocation'
import { MainButton } from '../../components/buttons'

import { GeolocationUI } from '../../models/Geolocation';

import styles from './styles'

const HouseLessScreen = () => {
    const paperTheme = useTheme()

    const options = {
        title: 'Select Avatar',
        storageOptions: {
            skipBackup: true,
            path: "images",
        },
    };

    const [photo, setPhoto] = useState<any>();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [CEP, setCEP] = useState('');
    const [number, setNumber] = useState('');
    const [street, setStreet] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [checked, setChecked] = useState('GPS');
    const [city, setCity] = useState("");
    const [geolocalization, setGeolocalization] = useState<GeolocationUI>();

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

    const getImage = () => {
        ImagePicker.launchImageLibrary(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                // const source = { uri: response.uri };

                setPhoto(
                    response
                );
            }
        });
    }


    async function Send() {
        try {

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <SafeAreaView style={styles.safeView}>
            <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.contentContainerStyle}>
                <View style={styles.viewTitle}>
                    <Headline>Inform Houseless</Headline>
                </View>
                {geolocalization &&
                    <>
                        <Text>latitude: {geolocalization.coords.latitude}</Text>
                        <Text>latitude: {geolocalization.coords.longitude}</Text>
                    </>
                }
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
                        errorFormLocation={false}
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
                    <MainButton MainActionScreen={Send} />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default HouseLessScreen;
