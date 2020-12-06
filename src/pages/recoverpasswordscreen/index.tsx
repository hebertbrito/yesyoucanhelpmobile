import React, { useState, useContext, useEffect } from 'react';
import { View, SafeAreaView, TextInput, Alert, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { DrawerContentComponentProps, DrawerContentOptions } from '@react-navigation/drawer';
import { Button, Text, useTheme, TextInput as PaperTextInput, Title } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as Animatable from 'react-native-animatable';
import AuthContext from '../../context/auth';
import { SwitchErros } from './validation';
import { ScrollView } from 'react-native-gesture-handler';
import Lottie from 'lottie-react-native';

//styles
import styles from './styles'

//services
import translate from '../../services/translate/translate'

//components
import { SnackBarYes } from '../../components'

//services
import { RecoverPassword as RecoverPasswordUser } from '../../services/api/RecoverPassword'
import { useFocusEffect } from '@react-navigation/native';

const RecoverPassword = (props: DrawerContentComponentProps<DrawerContentOptions>) => {

    const paperTheme = useTheme();
    const [isLoading, setIsloading] = useState(false)
    const [newpassword, setNewPassword] = useState('');
    const [confirmnewpassword, setConfirmNewPassword] = useState('');
    const [cpf_cnpj, setCPF_CNPJ] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState(false);
    const [eyepassword, setEyePassword] = useState(true)
    const [isVisible, setIsVisible] = useState(false)
    const [text, setText] = useState("")
    const [colorbackground, setColorBackground] = useState("")
    const [textcolor, setTextColor] = useState("")
    const [subcolorButton, setSubcolorButton] = useState("")
    const { navigation } = props;

    useFocusEffect(
        React.useCallback(() => {

            return () => {
                cleanfields()
                null
            }
        }, [])
    );

    function onDismiss() {
        setIsVisible(!isVisible)
    }

    function eyePassword() {
        setEyePassword(!eyepassword)
    }

    const iconbutton = () => {
        return <Icon name="sign-in-alt" size={20} />
    }

    function cleanfields() {
        setCPF_CNPJ("")
        setEmail("")
        setNewPassword("")
        setConfirmNewPassword("")
        setError(false)
    }

    function validationfields() {

        if (email.length < 10 && cpf_cnpj.length < 8 && newpassword.length < 7) {
            setError(true)
            return false
        }

        if (newpassword != confirmnewpassword) {
            setError(true)
            return false
        }

        return true
    }

    async function recoverpassword() {
        try {
            setIsloading(true)
            setError(false)
            if (validationfields()) {
                const objtosend = {
                    newpassword,
                    email,
                    cpf_cnpj
                }
                console.log(objtosend)
                await RecoverPasswordUser(objtosend)
                SwitchErros(201, setError, setText, setColorBackground, setTextColor, setSubcolorButton, paperTheme)
                setIsVisible(true)
                setIsloading(false)
            } else {
                setIsloading(false)
                SwitchErros(401, setError, setText, setColorBackground, setTextColor, setSubcolorButton, paperTheme)
                setIsVisible(true)
            }
        } catch (error) {
            setIsloading(false)
            SwitchErros(error, setError, setText, setColorBackground, setTextColor, setSubcolorButton, paperTheme)
            setIsVisible(true)
        }
    }

    return (

        <SafeAreaView style={styles.safeareContainer}>
            <SnackBarYes isVisible={isVisible} onDismiss={onDismiss} onPress={onDismiss}
                text={text} style={{ height: 50, width: "80%", backgroundColor: colorbackground, alignSelf: "center" }}
                textcolor={textcolor} subcolorButton={subcolorButton}
            />
            <ScrollView style={{ width: '95%' }} contentContainerStyle={{ flexGrow: 1, alignItems: "center", justifyContent: "center" }}>
                <Lottie source={require("../../assets/lottiefiles/forgot_password.json")}
                    resizeMode="contain"
                    autoSize
                    autoPlay
                    loop
                    duration={3000}
                    style={{ width: "100%", height: 250, alignSelf: "center" }}
                />

                <Animatable.View style={{ display: "flex", width: "100%" }} animation="fadeInLeft" delay={300} useNativeDriver={true}>
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
                        error={email.length < 15 && error}
                    />

                    <PaperTextInput
                        value={cpf_cnpj}
                        onChangeText={text => setCPF_CNPJ(text)}
                        placeholder={`${translate('example')}: 9999999999`}
                        label={`${translate('cpf_npj')}*`}
                        keyboardType="numeric"
                        style={{ margin: 10, color: paperTheme.colors.text }}
                        placeholderTextColor={paperTheme.colors.text}
                        selectionColor={paperTheme.colors.text}
                        mode="outlined"
                        theme={{ colors: { placeholder: paperTheme.colors.text, text: paperTheme.colors.text } }}
                        maxLength={15}
                        error={cpf_cnpj.length < 8 && error}
                    />

                    <PaperTextInput
                        secureTextEntry={eyepassword}
                        value={newpassword}
                        onChangeText={(text) => setNewPassword(text)}
                        placeholder={`${translate('password')}*`}
                        label={`${translate('password')}`}
                        style={{ margin: 10 }}
                        placeholderTextColor={paperTheme.colors.text}
                        selectionColor={paperTheme.colors.text}
                        mode="outlined"
                        theme={{ colors: { placeholder: paperTheme.colors.text, text: paperTheme.colors.text } }}
                        maxLength={30}
                        error={((newpassword.length < 7 && error) || (newpassword !== confirmnewpassword && error))}
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
                    <PaperTextInput
                        secureTextEntry={eyepassword}
                        value={confirmnewpassword}
                        onChangeText={(text) => setConfirmNewPassword(text)}
                        placeholder={`confirmar senha`}
                        label={`confirmar senha`}
                        style={{ margin: 10 }}
                        placeholderTextColor={paperTheme.colors.text}
                        selectionColor={paperTheme.colors.text}
                        mode="outlined"
                        theme={{ colors: { placeholder: paperTheme.colors.text, text: paperTheme.colors.text } }}
                        maxLength={30}
                        error={((newpassword.length < 7 && error) || (newpassword !== confirmnewpassword && error))}
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
                    <View style={{ display: "flex", flexDirection: "row", alignItems: "center", alignContent: "center", width: "100%", justifyContent: "space-evenly" }}>
                        <Button mode="outlined"
                            onPress={() => navigation.navigate("Login")}
                            style={{ width: '30%', padding: 2, alignSelf: "center", justifyContent: "space-evenly", borderWidth: 1, borderColor: paperTheme.colors.text }}
                            color={paperTheme.colors.text}
                        >
                            {translate('button_back')}
                        </Button>
                        <Button icon={iconbutton} mode="contained" onPress={() => recoverpassword()}
                            style={{ width: '30%', padding: 2, alignSelf: "center" }}
                            color="#fdd835" loading={isLoading}
                        >
                            {translate('button_login')}
                        </Button>
                    </View>
                </Animatable.View>

            </ScrollView>
        </SafeAreaView>
    )
}

export default RecoverPassword;