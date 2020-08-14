import React, { useRef, useEffect, useState } from 'react';
import { SafeAreaView, View, ScrollView, TextInput, Keyboard, StyleSheet, Alert } from 'react-native';
import { Text, Title, Subheading, List, Button, IconButton, Divider, RadioButton } from 'react-native-paper';
import { Picker } from '@react-native-community/picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as Animatable from 'react-native-animatable';


import { styles } from './styles'

import { ButtonCommum } from '../../components/buttonCommum'

interface Others {
    theme: any,
}



class RegisterScreen extends React.Component<Others> {
    state = {
        step: 1,
        firstName: '',
        lastName: '',
        dataBirth: '',
        genderCheck: 'first',
        cpf_cnpj: '',
        RG: '',
        country: '',
        street: '',
        city: '',
        number: '',
        email: '',
        password: '',
        State: ''
    }


    render() {
        const { theme } = this.props;

        return (
            <SafeAreaView style={styles.safeView}>

                <ScrollView style={{ width: '100%' }} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: "center" }}>
                    <Title style={{}}>Register</Title>

                    <Animatable.View style={{ justifyContent: "center", margin: 5, width: '90%' }} animation="fadeInLeft" delay={1200} useNativeDriver={true}>

                        <View>
                            {this.state.firstName.length > 1 && <Text style={{ marginLeft: '4%' }}>Firstname:</Text>}
                            <TextInput
                                value={this.state.firstName}
                                onChangeText={text => this.setState({ firstName: text })}
                                placeholder="First Name"
                                keyboardAppearance="light"
                                keyboardType="email-address"
                                style={{ margin: 10, color: `${theme.colors.text}`, width: '50%', }}
                                focusable={false}
                                underlineColorAndroid={theme.colors.text}
                                placeholderTextColor={theme.colors.text}

                            />
                            {this.state.lastName.length > 1 && <Text style={{ marginLeft: '4%' }}>LastName:</Text>}
                            <TextInput
                                value={this.state.lastName}
                                onChangeText={text => this.setState({ lastName: text })}
                                placeholder="LastName"
                                keyboardAppearance="light"
                                keyboardType="email-address"
                                style={{ margin: 10, color: `${theme.colors.text}`, width: '60%' }}
                                focusable={false}
                                underlineColorAndroid={theme.colors.text}
                                placeholderTextColor={theme.colors.text}
                            />
                        </View>
                    </Animatable.View>

                    {this.state.firstName.length > 3 && this.state.lastName.length > 4 ?


                        < Animatable.View style={{ justifyContent: "center", margin: 5, width: '90%' }} animation="fadeInRight" useNativeDriver={true}>
                            <View>
                                {this.state.cpf_cnpj.length > 1 && <Text style={{ marginLeft: '4%' }}>CPF/CNPJ:</Text>}
                                <TextInput
                                    value={this.state.cpf_cnpj}
                                    onChangeText={text => this.setState({ cpf_cnpj: text })}
                                    placeholder="CPF/CNPJ"
                                    keyboardAppearance="light"
                                    keyboardType="numeric"
                                    style={{ margin: 10, color: `${theme.colors.text}`, width: '55%' }}
                                    focusable={false}
                                    underlineColorAndroid={theme.colors.text}
                                    placeholderTextColor={theme.colors.text}
                                />

                                {this.state.RG.length > 1 && <Text style={{ marginLeft: '4%' }}>RG:</Text>}
                                <TextInput
                                    value={this.state.RG}
                                    onChangeText={text => this.setState({ RG: text })}
                                    placeholder="RG"
                                    keyboardAppearance="light"
                                    keyboardType="numeric"
                                    style={{ margin: 10, color: `${theme.colors.text}`, width: '55%' }}
                                    focusable={false}
                                    underlineColorAndroid={theme.colors.text}
                                    placeholderTextColor={theme.colors.text}
                                />
                            </View>
                        </Animatable.View>

                        :

                        null
                    }

                    {this.state.cpf_cnpj.length > 5 || this.state.RG.length > 8 ?
                        <Animatable.View style={{ justifyContent: "center", margin: 5, width: '90%' }} animation="fadeInLeft" delay={1200} useNativeDriver={true}>

                            <View>
                                {this.state.country.length > 1 && <Text style={{ marginLeft: '4%' }}>Country:</Text>}
                                <TextInput
                                    value={this.state.country}
                                    onChangeText={text => this.setState({ country: text })}
                                    placeholder="country"
                                    keyboardAppearance="light"
                                    keyboardType="default"
                                    style={{ margin: 10, color: `${theme.colors.text}`, width: '40%' }}
                                    focusable={false}
                                    underlineColorAndroid={theme.colors.text}
                                    placeholderTextColor={theme.colors.text}
                                />

                                {this.state.State.length > 1 && <Text style={{ marginLeft: '4%' }}>State:</Text>}
                                <TextInput
                                    value={this.state.State}
                                    onChangeText={text => this.setState({ State: text })}
                                    placeholder="State"
                                    keyboardAppearance="light"
                                    keyboardType="default"
                                    style={{ margin: 10, color: `${theme.colors.text}`, width: '40%' }}
                                    focusable={false}
                                    underlineColorAndroid={theme.colors.text}
                                    placeholderTextColor={theme.colors.text}
                                />

                                {this.state.city.length > 1 && <Text style={{ marginLeft: '4%' }}>City:</Text>}
                                <TextInput
                                    value={this.state.city}
                                    onChangeText={text => this.setState({ city: text })}
                                    placeholder="City"
                                    keyboardAppearance="light"
                                    keyboardType="email-address"
                                    style={{ margin: 10, color: `${theme.colors.text}`, width: '50%' }}
                                    focusable={false}
                                    underlineColorAndroid={theme.colors.text}
                                    placeholderTextColor={theme.colors.text}
                                />

                                {this.state.number.length > 1 && <Text style={{ marginLeft: '4%' }}>Number:</Text>}
                                <TextInput
                                    value={this.state.number}
                                    onChangeText={text => this.setState({ number: text })}
                                    placeholder="Number"
                                    keyboardAppearance="light"
                                    keyboardType="numeric"
                                    style={{ margin: 10, color: `${theme.colors.text}`, width: '30%' }}
                                    focusable={false}
                                    underlineColorAndroid={theme.colors.text}
                                    placeholderTextColor={theme.colors.text}
                                />
                            </View>
                        </Animatable.View>
                        :
                        null
                    }

                    {this.state.country.length > 3 && this.state.State.length > 3 ?
                        <Animatable.View style={{ justifyContent: "center", margin: 5, width: '90%' }} animation="fadeInRight" delay={1200} useNativeDriver={true}>

                            <View>
                                {this.state.email.length > 1 && <Text style={{ marginLeft: '4%' }}>Email:</Text>}
                                <TextInput
                                    value={this.state.email}
                                    onChangeText={text => this.setState({ country: text })}
                                    placeholder="Email"
                                    keyboardAppearance="light"
                                    keyboardType="email-address"
                                    style={{ margin: 10, color: `${theme.colors.text}`, width: '90%' }}
                                    focusable={false}
                                    underlineColorAndroid={theme.colors.text}
                                    placeholderTextColor={theme.colors.text}
                                />

                                {this.state.password.length > 1 && <Text style={{ marginLeft: '4%' }}>Email:</Text>}
                                <TextInput
                                    secureTextEntry={true}
                                    value={this.state.password}
                                    onChangeText={text => this.setState({ password: text })}
                                    placeholder="Password"
                                    keyboardAppearance="light"
                                    style={{ margin: 10, color: `${theme.colors.text}`, width: '90%' }}
                                    underlineColorAndroid={theme.colors.text}
                                    placeholderTextColor={theme.colors.text}
                                    selectionColor={theme.colors.text}
                                />
                            </View>

                                <Button mode="contained">Register. Click Here!</Button>
                        </Animatable.View>
                        :
                        null
                    }
                    <ButtonCommum iconName="home" nameButton="Go to Screen Home" height={40} width="50%" screenNameNavigate="LoginScreen" colorHexa="#ef6c00"/>
                </ScrollView>
            </SafeAreaView >
        )
    }
}

export default RegisterScreen