import React from 'react';
import { SafeAreaView, View, ScrollView, Keyboard, StyleSheet, Alert } from 'react-native';
import { Text, Title, Subheading, Card, RadioButton, useTheme, TextInput } from 'react-native-paper';
import { Picker } from '@react-native-community/picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as Animatable from 'react-native-animatable';

//styles
import { styles } from './styles'

import { lstGenders } from '../../../data/dataUserRegister'

//services
import translate from '../../../services/translate/translate'

interface DataCommum {
    firstname: string,
    setFirstName: React.Dispatch<React.SetStateAction<string>>,
    lastname: string,
    setLastName: React.Dispatch<React.SetStateAction<string>>,
    datebirth: string,
    setDateBirth: React.Dispatch<React.SetStateAction<string>>,
    gender: string,
    setGender: React.Dispatch<React.SetStateAction<string>>,
    typeuser: string,
    setTypeUser: React.Dispatch<React.SetStateAction<string>>,
    showsErros: boolean
}


export function CommomData(props: DataCommum) {

    const theme = useTheme();

    const { firstname, setFirstName, lastname, setLastName,
        datebirth, setDateBirth, gender, setGender,
        typeuser, setTypeUser, showsErros
    } = props;

    return (
        <Animatable.View style={{ justifyContent: "center", margin: 5, width: '90%' }} easing={"ease-in-out"} animation="fadeInLeft" useNativeDriver={true}>

            <Card style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-evenly", flexDirection: "column", elevation: 4, backgroundColor: '#eeeeee' }}
            >
                <Card.Content style={{ backgroundColor: '#eeeeee' }}>
                    <Title style={{ color: '#000000' }}>
                        {translate('commom_data')}
                    </Title>
                    <View style={styles.viewCardCheckBox}>
                        <View style={{
                            paddingLeft: "2.5%",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            alignContent: "center",
                            backgroundColor: theme.colors.onSurface,
                            justifyContent: "center",
                            borderRadius: 10,
                            width: '45%',
                            elevation: 2
                        }}>
                            <Text style={{ color: '#000000', display: "flex", flexWrap: "wrap", width: '70%' }}>
                                {translate('check_register_physic_person')}
                            </Text>
                            <RadioButton
                                value={typeuser}
                                status={typeuser === '1' ? 'checked' : 'unchecked'}
                                onPress={() => setTypeUser('1')}
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
                            backgroundColor: theme.colors.onSurface,
                            justifyContent: "center",
                            borderRadius: 10,
                            width: '45%',
                            elevation: 2
                        }}>
                            <Text style={{ color: '#000000', display: "flex", flexWrap: "wrap", width: '70%' }}>
                                {translate('check_register_legal_perosn')}
                            </Text>
                            <RadioButton
                                value={typeuser}
                                status={typeuser === '2' ? 'checked' : 'unchecked'}
                                onPress={() => setTypeUser('2')}
                                color={'#000000'}
                                uncheckedColor={'#000000'}
                            />
                        </View>
                    </View>

                    <View style={{ display: "flex", flexDirection: "column", width: '100%', justifyContent: "center" }}>
                        <TextInput
                            value={firstname}
                            onChangeText={text => setFirstName(text)}
                            placeholder={`${translate('example')}: T'Challa`}
                            label={`${translate('firstname')}*`}
                            keyboardType="email-address"
                            style={{ marginTop: 10, width: '96.5%' }}
                            selectionColor={theme.colors.text}
                            placeholderTextColor={theme.colors.text}
                            theme={{ colors: { placeholder: '#000000', background: '#eeeeee', text: '#000000' } }}
                            maxLength={20}
                            mode="outlined"
                            returnKeyType="next"
                            blurOnSubmit={false}
                            error={firstname.length < 3 && showsErros}
                        />

                        <TextInput
                            value={lastname}
                            onChangeText={text => setLastName(text)}
                            placeholder={`${translate('example')}: Aoubu`}
                            label={`${translate('lastname')}*`}
                            keyboardType="email-address"
                            style={{ marginTop: 10, width: '96.5%' }}
                            placeholderTextColor={theme.colors.text}
                            theme={{ colors: { placeholder: '#000000', background: '#eeeeee', text: '#000000' } }}
                            maxLength={20}
                            mode="outlined"
                            returnKeyType="next"
                            blurOnSubmit={false}
                            error={lastname.length < 3 && showsErros}
                        />
                    </View>

                    {typeuser == '1' ?

                        <View style={{ display: "flex", flexDirection: "row", width: '100%', alignItems: "center" }}>
                            <TextInput
                                value={datebirth}
                                onChangeText={text => setDateBirth(text)}
                                placeholder="DDMMYYYY"
                                label={`${translate('datebirth')}*`}
                                keyboardType="numeric"
                                style={{ marginTop: 10, width: '50%' }}
                                placeholderTextColor={theme.colors.text}
                                theme={{ colors: { placeholder: '#000000', background: '#eeeeee', text: '#000000' } }}
                                maxLength={20}
                                mode="outlined"
                                error={datebirth.length < 8 && showsErros}
                            />
                            <Picker mode="dropdown" style={{ width: '50%', color: theme.colors.text }}
                                selectedValue={gender}
                                onValueChange={(itemvalue, itemindex) => setGender(itemvalue.toString())}
                            >
                                {lstGenders.length > 0 && (
                                    lstGenders.map((item) => {
                                        return (
                                            <Picker.Item key={item.id} label={item.name} value={item.name} />
                                        )
                                    })
                                )}
                            </Picker>
                        </View>

                        :

                        null

                    }
                </Card.Content>
            </Card>
        </Animatable.View>
    )
}