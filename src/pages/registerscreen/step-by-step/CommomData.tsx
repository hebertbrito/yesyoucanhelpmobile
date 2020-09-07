import React from 'react';
import { SafeAreaView, View, ScrollView, Keyboard, StyleSheet, Alert } from 'react-native';
import { Text, Title, Subheading, Card, RadioButton, useTheme, TextInput } from 'react-native-paper';
import { Picker } from '@react-native-community/picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as Animatable from 'react-native-animatable';

//styles
import { styles } from './styles'

import { lstGenders } from '../../../data/dataUserRegister'

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
    setTypeUser: React.Dispatch<React.SetStateAction<string>>
}


export function CommomData(props: DataCommum) {

    const theme = useTheme();

    const { firstname, setFirstName, lastname, setLastName,
        datebirth, setDateBirth, gender, setGender,
        typeuser, setTypeUser
    } = props;

    return (
        <Animatable.View style={{ justifyContent: "center", margin: 5, width: '90%' }} easing={"ease-in-out"} animation="fadeInLeft" useNativeDriver={true}>

            <Card style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-evenly", flexDirection: "column" }}>
                <Card.Content >
                    <Title style={{ color: '#000000' }}>Commom data</Title>
                    <View style={styles.viewCardCheckBox}>
                        <View style={styles.itemCheckBox}>
                            <Text style={{ color: '#000000', display: "flex", flexWrap: "wrap", width: '70%' }}>Physical person</Text>
                            <RadioButton
                                value="SendBranch"
                                status={typeuser === '1' ? 'checked' : 'unchecked'}
                                onPress={() => setTypeUser('1')}
                                color={'#000000'}
                                uncheckedColor={'#000000'}
                            />
                        </View>
                        <View style={styles.itemCheckBox}>
                            <Text style={{ color: '#000000', display: "flex", flexWrap: "wrap", width: '70%' }}>Legal person</Text>
                            <RadioButton
                                value="ChoseMPlace"
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
                            placeholder="exemple: T'Challa"
                            label="First Name"
                            keyboardType="email-address"
                            style={{ marginTop: 10, width: '96.5%' }}
                            selectionColor={theme.colors.text}
                            placeholderTextColor={theme.colors.text}
                            theme={{ colors: { primary: '#ef6c00', placeholder: '#000000', background: '#eeeeee', text: '#000000' } }}
                            maxLength={20}
                            mode="outlined"
                            returnKeyType="next"
                            blurOnSubmit={false}
                        />

                        <TextInput
                            value={lastname}
                            onChangeText={text => setLastName(text)}
                            placeholder="exemple: Aoubu"
                            label="Last Name"
                            keyboardType="email-address"
                            style={{ marginTop: 10, width: '96.5%' }}
                            placeholderTextColor={theme.colors.text}
                            theme={{ colors: { primary: '#ef6c00', placeholder: '#000000', background: '#eeeeee', text: '#000000' } }}
                            maxLength={20}
                            mode="outlined"
                            returnKeyType="next"
                            blurOnSubmit={false}
                        />
                    </View>

                    {typeuser == '1' ?

                        <View style={{ display: "flex", flexDirection: "row", width: '100%', alignItems: "center" }}>
                            <TextInput
                                value={datebirth}
                                onChangeText={text => setDateBirth(text)}
                                placeholder="DD/MM/YYYY"
                                label="Date Birth"
                                keyboardType="numeric"
                                style={{ marginTop: 10, width: '50%' }}
                                placeholderTextColor={theme.colors.text}
                                theme={{ colors: { primary: '#ef6c00', placeholder: '#000000', background: '#eeeeee', text: '#000000' } }}
                                maxLength={20}
                                mode="outlined"
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