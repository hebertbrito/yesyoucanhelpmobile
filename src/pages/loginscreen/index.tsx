import React, { useState, useContext, useEffect } from 'react';
import { View, SafeAreaView, TextInput, Alert, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { DrawerContentComponentProps, DrawerContentOptions } from '@react-navigation/drawer';
import { Button, Text, useTheme, TextInput as PaperTextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as Animatable from 'react-native-animatable';
import AuthContext from '../../context/auth';
import { useFocusEffect } from '@react-navigation/native';
import { SwitchErros } from './validation'
//styles
import styles from './styles'
import { ScrollView } from 'react-native-gesture-handler';

//services
import translate from '../../services/translate/translate'

//components
import { SnackBarYes } from '../../components'

const LoginScreen = (props: DrawerContentComponentProps<DrawerContentOptions>) => {

    const paperTheme = useTheme();
    const { SignIn, signed, isLoading } = useContext(AuthContext)
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState(false);
    const [eyepassword, setEyePassword] = useState(true)
    const [isVisible, setIsVisible] = useState(false)
    const [text, setText] = useState("")
    const [colorbackground, setColorBackground] = useState("")
    const [textcolor, setTextColor] = useState("")
    const [subcolorButton, setSubcolorButton] = useState("")
    const { navigation } = props;

    function onPress() {
        setIsVisible(!isVisible)
    }

    function onDismiss() {
        setIsVisible(!isVisible)
    }

    function eyePassword() {
        setEyePassword(!eyepassword)
    }

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
            setError(false)
            if (ValidateInputs(email, password)) {

                await SignIn(email, password);

            }
        } catch (error) {
            SwitchErros(error, setError, setText, setColorBackground, setTextColor, setSubcolorButton, paperTheme)
            setIsVisible(true)
        }
    }
    // console.log(signed);
    return (

        <SafeAreaView style={styles.safeareContainer}>
            <SnackBarYes isVisible={isVisible} onDismiss={onDismiss} onPress={onPress}
                text={text} style={{ height: 50, width: "80%", backgroundColor: colorbackground, alignSelf: "center" }}
                textcolor={textcolor} subcolorButton={subcolorButton}
            />
            <ScrollView style={{ width: '100%' }} contentContainerStyle={{ flexGrow: 1, alignItems: "center", justifyContent: "center" }}>
                <Animatable.Image animation="bounceInDown" delay={1100} useNativeDriver={true} source={require('../../assets/fotospublic/logoLetra.png')} style={{ height: '40%', width: '50%' }} />

                <Animatable.View style={styles.formView} animation="fadeInLeft" delay={1200} useNativeDriver={true}>
                    <KeyboardAvoidingView behavior="padding">

                        <PaperTextInput
                            value={email}
                            onChangeText={text => setEmail(text)}
                            placeholder={`${translate('example')}: test@test.com`}
                            label={`${translate('email')}`}
                            keyboardType="email-address"
                            style={{ margin: 10, color: paperTheme.colors.text }}
                            placeholderTextColor={paperTheme.colors.text}
                            selectionColor={paperTheme.colors.text}
                            mode="outlined"
                            theme={{ colors: { placeholder: paperTheme.colors.text, text: paperTheme.colors.text } }}
                            maxLength={50}
                            error={error}
                        />

                        <PaperTextInput
                            secureTextEntry={eyepassword}
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            placeholder={`${translate('password')}*`}
                            label={`${translate('password')}`}
                            style={{ margin: 10 }}
                            placeholderTextColor={paperTheme.colors.text}
                            selectionColor={paperTheme.colors.text}
                            mode="outlined"
                            theme={{ colors: { placeholder: paperTheme.colors.text, text: paperTheme.colors.text } }}
                            maxLength={30}
                            error={error}
                            right={
                                <PaperTextInput.Icon
                                    name="eye"
                                    color={paperTheme.colors.text}
                                    onPress={() => {
                                        eyePassword()
                                    }}
                                />
                            }
                        />

                        <Button icon={iconbutton} mode="contained" onPress={() => Login(email, password)}
                            style={{ width: '45%', padding: 2, alignSelf: "center" }}
                            color="#fdd835" loading={isLoading}
                        >
                            {translate('button_login')}
                        </Button>
                        <TouchableOpacity style={{ width: 120, height: 50, alignSelf: "center" }}
                            onPress={() => navigation.navigate('RegisterUserScreen')}
                        >
                            <Text style={{ alignSelf: "center", margin: 3, color: 'red' }}>
                                {translate('register_button')}
                            </Text>
                        </TouchableOpacity>
                    </KeyboardAvoidingView>

                </Animatable.View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default LoginScreen;