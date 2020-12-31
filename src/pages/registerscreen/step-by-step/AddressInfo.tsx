import React from 'react';
import { useTheme, TextInput, Card, Title } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import { View } from 'react-native';

//services
import translate from '../../../services/translate/translate';

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
    setStreet: React.Dispatch<React.SetStateAction<string>>,
    showsErros: boolean
}

export function AddressInfo(props: AddressInfo) {

    const theme = useTheme();

    const { CEP, setCEP, country, setCountry, state, setState, city, setCity,
        neighbourhood, setNeighbourhood, number, setNumber, street, setStreet,
        showsErros
    } = props

    return (
        <Animatable.View style={{ justifyContent: "center", margin: 5, width: '90%' }} easing={"ease-in-out"} animation="fadeInLeft" useNativeDriver={true}>
            <Card style={{ backgroundColor: '#eeeeee', elevation: 4 }}>
                <Card.Content style={{ backgroundColor: '#eeeeee' }}>
                    <Title style={{ color: '#000000' }}>Informações de Endereço</Title>
                    <View style={{ display: "flex", flexDirection: "column" }}>
                        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                            <TextInput
                                value={CEP}
                                onChangeText={text => setCEP(text)}
                                placeholder={`${translate('example')}: 00000111`}
                                label={`${translate('cep')}*`}
                                keyboardType="default"
                                style={{ marginTop: 10, width: '50%' }}
                                placeholderTextColor={theme.colors.text}
                                theme={{ colors: { placeholder: '#000000', background: '#eeeeee', text: '#000000' } }}
                                maxLength={8}
                                mode="outlined"
                                error={CEP.length < 8 && showsErros}
                            />
                            <TextInput
                                value={number}
                                onChangeText={text => setNumber(text)}
                                placeholder={`${translate('example')}: 000`}
                                label={`${translate('number')}*`}
                                keyboardType="numeric"
                                style={{ marginTop: 10, width: '45%' }}
                                placeholderTextColor={theme.colors.text}
                                theme={{ colors: { placeholder: '#000000', background: '#eeeeee', text: '#000000' } }}
                                maxLength={10}
                                mode="outlined"
                                error={number.length == 0 && showsErros}
                            />
                        </View>

                        <View style={{ display: "flex", flexDirection: "column" }}>
                            <TextInput
                                value={neighbourhood}
                                onChangeText={text => setNeighbourhood(text)}
                                placeholder={`${translate('example')}: Morumbi`}
                                label={`${translate('neighbourhood')}*`}
                                keyboardType="email-address"
                                style={{ marginTop: 10, width: '100%' }}
                                placeholderTextColor={theme.colors.text}
                                theme={{ colors: { placeholder: '#000000', background: '#eeeeee', text: '#000000' } }}
                                maxLength={50}
                                mode="outlined"
                            />
                            <TextInput
                                value={street}
                                onChangeText={text => setStreet(text)}
                                placeholder={`${translate('example')}: ${street} Park Strat`}
                                label={`${translate('street')}*`}
                                keyboardType="default"
                                style={{ marginTop: 10, width: '100%' }}
                                placeholderTextColor={theme.colors.text}
                                theme={{ colors: { placeholder: '#000000', background: '#eeeeee', text: '#000000' } }}
                                maxLength={50}
                                mode="outlined"
                            />
                        </View>

                        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                            <TextInput
                                value={city}
                                onChangeText={text => setCity(text)}
                                placeholder={`${translate('example')}: São Paulo`}
                                label={`${translate('city')}*`}
                                keyboardType="email-address"
                                style={{ marginTop: 10, width: '45%' }}
                                placeholderTextColor={theme.colors.text}
                                theme={{ colors: { placeholder: '#000000', background: '#eeeeee', text: '#000000' } }}
                                maxLength={30}
                                mode="outlined"
                            />

                            <TextInput
                                value={state}
                                onChangeText={text => setState(text)}
                                placeholder={`XX`}
                                label={`${translate('state')}*`}
                                keyboardType="default"
                                style={{ marginTop: 10, width: '25%' }}
                                placeholderTextColor={theme.colors.text}
                                theme={{ colors: { placeholder: '#000000', background: '#eeeeee', text: '#000000' } }}
                                maxLength={2}
                                mode="outlined"
                            />

                            <TextInput
                                value={country}
                                onChangeText={text => setCountry(text)}
                                placeholder="XX"
                                label={`${translate('country')}*`}
                                keyboardType="default"
                                style={{ marginTop: 10, width: '25%' }}
                                placeholderTextColor={theme.colors.text}
                                theme={{ colors: { placeholder: '#000000', background: '#eeeeee', text: '#000000' } }}
                                maxLength={2}
                                mode="outlined"
                                error={country.length < 2 && showsErros}
                            />
                        </View>
                    </View>
                </Card.Content>
            </Card>
        </Animatable.View>
    )
}