import React from 'react';
import { View } from 'react-native';
import { TextInput, useTheme } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';

interface FormLocation {
    CEP: string,
    setCEP: React.Dispatch<React.SetStateAction<string>>,
    number: string,
    setNumber: React.Dispatch<React.SetStateAction<string>>,
    street: string,
    setStreet: React.Dispatch<React.SetStateAction<string>>,
    neighborhood: string,
    setNeighborhood: React.Dispatch<React.SetStateAction<string>>,
    city: string,
    setCity: React.Dispatch<React.SetStateAction<string>>
    errorFormLocation: boolean
}

export function FormLocation(props: FormLocation) {

    const paperTheme = useTheme();

    const { CEP, setCEP, number, setNumber,
        neighborhood, setNeighborhood, street, setStreet,
        city, setCity, errorFormLocation
    } = props;

    return (
        <Animatable.View style={{ justifyContent: "center", margin: 5, width: '90%', alignSelf: "center" }} easing={"ease-in-out"} animation="fadeInLeft" useNativeDriver={true}>
            <View style={{ display: "flex", flexDirection: "column" }}>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    <TextInput
                        value={CEP}
                        onChangeText={text => setCEP(text)}
                        placeholder="exemple: 00000111"
                        label="CEP*"
                        keyboardType="numeric"
                        style={{ marginTop: 10, width: '50%' }}
                        placeholderTextColor={paperTheme.colors.text}
                        theme={{ colors: { placeholder: paperTheme.colors.text, text: paperTheme.colors.text } }}
                        maxLength={8}
                        mode="outlined"
                        error={CEP.length != 8 && errorFormLocation ? true : false}
                    />
                    <TextInput
                        value={number}
                        onChangeText={text => setNumber(text)}
                        placeholder="Exemple: 000"
                        label="Number*"
                        keyboardType="numeric"
                        style={{ marginTop: 10, width: '45%' }}
                        placeholderTextColor={paperTheme.colors.text}
                        theme={{ colors: { placeholder: paperTheme.colors.text, text: paperTheme.colors.text } }}
                        maxLength={10}
                        mode="outlined"
                        error={number.length == 0 && errorFormLocation ? true : false}
                    />
                </View>

                <View style={{ display: "flex", flexDirection: "column" }}>
                    <TextInput
                        value={neighborhood}
                        onChangeText={text => setNeighborhood(text)}
                        placeholder="Exemple: Morumbi"
                        label="Neighbourhood*"
                        keyboardType="email-address"
                        style={{ marginTop: 10, width: '100%' }}
                        placeholderTextColor={paperTheme.colors.text}
                        theme={{ colors: { placeholder: paperTheme.colors.text, text: paperTheme.colors.text } }}
                        maxLength={50}
                        mode="outlined"
                        error={!neighborhood && errorFormLocation ? true : false}
                    />
                    <TextInput
                        value={street}
                        onChangeText={text => setStreet(text)}
                        placeholder="Exemple: Street Park Runbo"
                        label="Street*"
                        keyboardType="default"
                        style={{ marginTop: 10, width: '100%' }}
                        placeholderTextColor={paperTheme.colors.text}
                        theme={{ colors: { placeholder: paperTheme.colors.text, text: paperTheme.colors.text } }}
                        maxLength={50}
                        mode="outlined"
                        error={!street && errorFormLocation ? true : false}
                    />
                    <TextInput
                        value={city}
                        onChangeText={text => setCity(text)}
                        placeholder="Exemple: Sao Paulo"
                        label="City*"
                        keyboardType="default"
                        style={{ marginTop: 10, width: '100%' }}
                        placeholderTextColor={paperTheme.colors.text}
                        theme={{ colors: { placeholder: paperTheme.colors.text, text: paperTheme.colors.text } }}
                        maxLength={50}
                        mode="outlined"
                        error={!city && errorFormLocation ? true : false}
                    />
                </View>
            </View>
        </Animatable.View>
    )
}