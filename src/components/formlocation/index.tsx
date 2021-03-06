import React, { memo } from 'react';
import { View } from 'react-native';
import { TextInput, useTheme } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';

//services
import translate from '../../services/translate/translate'

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

function FormLocation(props: FormLocation) {

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
                        placeholder={`${translate('example')}: 0000111`}
                        label={`${translate('cep')}*`}
                        keyboardType="numeric"
                        style={{ marginTop: 10, width: '50%' }}
                        placeholderTextColor={paperTheme.colors.text}
                        theme={{ colors: { placeholder: paperTheme.colors.text, text: paperTheme.colors.text } }}
                        maxLength={8}
                        mode="outlined"
                    />
                    <TextInput
                        value={number}
                        onChangeText={text => setNumber(text)}
                        placeholder={`${translate('example')}: 000`}
                        label={`${translate('number')}*`}
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
                        placeholder={`${translate('example')}: Morumbi`}
                        label={`${translate('neighbourhood')}*`}
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
                        placeholder={`${translate('example')}: ${translate('street')} Park Runbo`}
                        label={`${translate('street')}*`}
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
                        placeholder={`${translate('example')}: São Paulo`}
                        label={`${translate('city')}*`}
                        keyboardType="default"
                        style={{ marginTop: 10, width: '100%' }}
                        placeholderTextColor={paperTheme.colors.text}
                        theme={{ colors: { placeholder: paperTheme.colors.text, text: paperTheme.colors.text } }}
                        maxLength={50}
                        mode="outlined"
                    />
                </View>
            </View>
        </Animatable.View>
    )
}

export default memo(FormLocation)