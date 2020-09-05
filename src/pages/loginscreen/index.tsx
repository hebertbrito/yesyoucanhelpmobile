import React, { useState, useContext, useEffect } from 'react';
import { View, SafeAreaView, TextInput, Alert, TouchableOpacity } from 'react-native';
import { DrawerContentComponentProps, DrawerContentOptions } from '@react-navigation/drawer';
import { Button, Text, useTheme, TextInput as PaperTextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as Animatable from 'react-native-animatable';
import AuthContext from '../../context/auth';

//styles
import styles from './styles'
import { pad } from 'lodash';


const LoginScreen = (props: DrawerContentComponentProps<DrawerContentOptions>) => {

    const paperTheme = useTheme();
    const { SignIn, signed } = useContext(AuthContext)
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [errorEmail, setErrorEmail] = useState(false as boolean);
    const [errorPassword, setErrorPassword] = useState(false as boolean);
    const { navigation } = props;


    const iconbutton = () => {
        return <Icon name="sign-in-alt" size={20} />
    }

    function ValidateInputs(email: string, password: string) {

        if (email === '')
            return false

        if (password === '')
            return false

        if (password.length < 6)
            return false

        return true
    }

    async function Login(email: string, password: any) {
        try {

            if (ValidateInputs(email, password)) {
                const response = await SignIn(email, password);
                console.log(response);
                console.log(signed)
            }

        } catch (error) {

        }
    }
    console.log(signed);
    return (

        <SafeAreaView style={styles.safeareContainer}>

            <View ></View>

            <Animatable.Image animation="bounceInDown" delay={1100} useNativeDriver={true} source={require('../../assets/fotospublic/logoLetra.png')} style={{ height: '40%', width: '50%' }} />

            <Animatable.View style={styles.formView} animation="fadeInLeft" delay={1200} useNativeDriver={true}>
                <PaperTextInput
                    value={email}
                    onChangeText={text => setEmail(text)}
                    placeholder="Email"
                    label="Email"
                    keyboardAppearance="light"
                    keyboardType="email-address"
                    style={{ margin: 10, color: paperTheme.colors.text }}
                    placeholderTextColor={paperTheme.colors.text}
                    selectionColor={paperTheme.colors.text}
                    mode={"outlined"}
                    theme={{ colors: { primary: '#ef6c00' } }}
                />

                <PaperTextInput
                    secureTextEntry={true}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    placeholder="Password"
                    label="Password"
                    keyboardAppearance="light"
                    style={{ margin: 10 }}
                    placeholderTextColor={paperTheme.colors.text}
                    selectionColor={paperTheme.colors.text}
                    mode={"outlined"}
                    theme={{ colors: { primary: '#ef6c00' } }}
                />

                <Button icon={iconbutton} mode="contained" onPress={() => Login(email, password)}
                    style={{ width: '45%', padding: 2, alignSelf: "center" }}
                    color="#fdd835"
                >
                    Login
                </Button>
                <TouchableOpacity style={{ width: 120, height: 50, alignSelf: "center" }}
                    onPress={() => navigation.navigate('RegisterUserScreen')}
                >
                    <Text style={{ alignSelf: "center", margin: 3, color: 'red' }}>
                        Register
                    </Text>
                </TouchableOpacity>
            </Animatable.View>
        </SafeAreaView>
    )
}

export default LoginScreen;