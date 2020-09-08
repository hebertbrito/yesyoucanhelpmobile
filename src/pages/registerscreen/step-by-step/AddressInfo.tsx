import React from 'react';
import { useTheme, TextInput, Card, Title } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import { View } from 'react-native';

interface AddressInfo {
    CEP: string,
    setCEP: React.Dispatch<React.SetStateAction<string>>,
    country: string,
    setCountry: React.Dispatch<React.SetStateAction<string>>,
    state: string,
    setState: React.Dispatch<React.SetStateAction<string>>,
    city: string,
    setCity: React.Dispatch<React.SetStateAction<string>>,
    neighbourhood: string,
    setNeighbourhood: React.Dispatch<React.SetStateAction<string>>,
    number: string,
    setNumber: React.Dispatch<React.SetStateAction<string>>,
    street: string,
    setStreet: React.Dispatch<React.SetStateAction<string>>
}

export function AddressInfo(props: AddressInfo) {

    const theme = useTheme();

    const { CEP, setCEP, country, setCountry, state, setState, city, setCity,
        neighbourhood, setNeighbourhood, number, setNumber, street, setStreet
    } = props

    return (
        <Animatable.View style={{ justifyContent: "center", margin: 5, width: '90%' }} easing={"ease-in-out"} animation="fadeInLeft" useNativeDriver={true}>
            <Card>
                <Card.Content>
                    <Title style={{ color: '#000000' }}>Address Info</Title>
                    <View style={{ display: "flex", flexDirection: "column" }}>
                        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                            <TextInput
                                value={CEP}
                                onChangeText={text => setCEP(text)}
                                placeholder="exemple: 00000111"
                                label="CEP"
                                keyboardType="default"
                                style={{ marginTop: 10, width: '50%' }}
                                placeholderTextColor={theme.colors.text}
                                theme={{ colors: { primary: '#ef6c00', placeholder: '#000000', background: '#eeeeee', text: '#000000' } }}
                                maxLength={8}
                                mode="outlined"
                            />
                            <TextInput
                                value={number}
                                onChangeText={text => setNumber(text)}
                                placeholder="Exemple: 000"
                                label="Number"
                                keyboardType="numeric"
                                style={{ marginTop: 10, width: '45%' }}
                                placeholderTextColor={theme.colors.text}
                                theme={{ colors: { primary: '#ef6c00', placeholder: '#000000', background: '#eeeeee', text: '#000000' } }}
                                maxLength={10}
                                mode="outlined"
                            />
                        </View>

                        <View style={{ display: "flex", flexDirection: "column" }}>
                            <TextInput
                                value={neighbourhood}
                                onChangeText={text => setNeighbourhood(text)}
                                placeholder="Exemple: Morumbi"
                                label="Neighbourhood"
                                keyboardType="email-address"
                                style={{ marginTop: 10, width: '100%' }}
                                placeholderTextColor={theme.colors.text}
                                theme={{ colors: { primary: '#ef6c00', placeholder: '#000000', background: '#eeeeee', text: '#000000' } }}
                                maxLength={50}
                                mode="outlined"
                            />
                            <TextInput
                                value={street}
                                onChangeText={text => setStreet(text)}
                                placeholder="Exemple: Street Park Runbo"
                                label="Street"
                                keyboardType="default"
                                style={{ marginTop: 10, width: '100%' }}
                                placeholderTextColor={theme.colors.text}
                                theme={{ colors: { primary: '#ef6c00', placeholder: '#000000', background: '#eeeeee', text: '#000000' } }}
                                maxLength={50}
                                mode="outlined"
                            />
                        </View>

                        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                            <TextInput
                                value={city}
                                onChangeText={text => setCity(text)}
                                placeholder="Exemple: São Paulo"
                                label="City"
                                keyboardType="email-address"
                                style={{ marginTop: 10, width: '45%' }}
                                placeholderTextColor={theme.colors.text}
                                theme={{ colors: { primary: '#ef6c00', placeholder: '#000000', background: '#eeeeee', text: '#000000' } }}
                                maxLength={30}
                                mode="outlined"
                            />

                            <TextInput
                                value={state}
                                onChangeText={text => setState(text)}
                                placeholder="XX"
                                label="State"
                                keyboardType="default"
                                style={{ marginTop: 10, width: '25%' }}
                                placeholderTextColor={theme.colors.text}
                                theme={{ colors: { primary: '#ef6c00', placeholder: '#000000', background: '#eeeeee', text: '#000000' } }}
                                maxLength={2}
                                mode="outlined"
                            />

                            <TextInput
                                value={country}
                                onChangeText={text => setCountry(text)}
                                placeholder="XX"
                                label="Country"
                                keyboardType="default"
                                style={{ marginTop: 10, width: '25%' }}
                                placeholderTextColor={theme.colors.text}
                                theme={{ colors: { primary: '#ef6c00', placeholder: '#000000', background: '#eeeeee', text: '#000000' } }}
                                maxLength={2}
                                mode="outlined"
                            />
                        </View>
                    </View>
                </Card.Content>
            </Card>
        </Animatable.View>
    )
}